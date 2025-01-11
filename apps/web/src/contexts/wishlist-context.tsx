"use client";

import { toggleProductInWishlist } from "@/actions/wishlist";
import { getErrorMessage } from "@repo/utils/functions";
import { TProduct, TWishlistItem } from "@repo/utils/types";
import { message } from "antd";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
  useTransition,
} from "react";

type TWishlistContext = {
  wishlist: string[];
  isToggling: boolean;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => Promise<void>;
  setWishlist: Dispatch<SetStateAction<string[]>>;
};

const WishlistContext = createContext<TWishlistContext | undefined>(undefined);

// wishlist provider
export const WishlistProvider = ({
  children,
  initialWishlist = [],
}: {
  children: ReactNode;
  initialWishlist?: TWishlistItem[];
}) => {
  const [wishlist, setWishlist] = useState<string[]>(
    initialWishlist?.map((item) => (item.productId as TProduct)?._id!)
  );

  const [isToggling, startTransition] = useTransition();

  const isInWishlist = useCallback((productId: string) => wishlist?.includes(productId), [wishlist]);

  // toggle product in wish list
  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (isToggling) return;

      // Optimistic update
      setWishlist((prev) =>
        prev?.includes(productId) ? prev?.filter((id) => id !== productId) : [...prev, productId]
      );
      startTransition(async () => {
        try {
          const result = await toggleProductInWishlist({ productId });

          if (result.success) {
            const updatedWishListedProductIds = result?.data?.map((item) => item.productId as string);
            setWishlist(updatedWishListedProductIds!);
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          // Revert optimistic update on error
          message.error(getErrorMessage(error));
          setWishlist((prev) =>
            prev?.includes(productId) ? prev?.filter((id) => id !== productId) : [...prev, productId]
          );
        }
      });
    },
    [isToggling, wishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        isToggling,
        isInWishlist,
        setWishlist,
        wishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// wishlist hook
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
