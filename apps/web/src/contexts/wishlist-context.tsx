"use client";

import { toggleProductInWishlist } from "@/actions/wishlist";
import { getErrorMessage } from "@repo/utils/functions";
import { message } from "antd";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useRef,
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
  initialWishlist?: string[];
}) => {
  const [wishlist, setWishlist] = useState<string[]>(initialWishlist);
  const [isToggling, startTransition] = useTransition();
  const pendingUpdatesRef = useRef<Set<string>>(new Set());

  const isInWishlist = useCallback(
    (productId: string) => wishlist.includes(productId) || pendingUpdatesRef.current.has(productId),
    [wishlist]
  );

  // toggle product in wish list
  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (isToggling) return;

      startTransition(async () => {
        // Optimistic update
        pendingUpdatesRef.current.add(productId);
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
        );

        try {
          const result = await toggleProductInWishlist({ productId });

          if (result.success) {
            const updatedWishListedProductIds = result?.data?.map((item) => item.productId);
            setWishlist(updatedWishListedProductIds!);
          } else {
            throw new Error(result.message);
          }
        } catch (error) {
          // Revert optimistic update on error
          message.error(getErrorMessage(error));
          setWishlist((prev) =>
            prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
          );
        } finally {
          pendingUpdatesRef.current.delete(productId);
        }
      });
    },
    [isToggling]
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
