"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type TWishlistContext = {
  wishlist: string[];
  setWishlist: Dispatch<SetStateAction<string[]>>;
  isInWishlist: (productId: string) => boolean;
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

  const isInWishlist = (productId: string) => !!wishlist?.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        isInWishlist,
        setWishlist,
        wishlist,
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
