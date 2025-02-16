"use client";
import { Divider, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { IoEyeOutline } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

import { light_colors } from "@/constants/colors.constant";
import { useWishlist } from "@/contexts/wishlist-context";
import { cn } from "@/libs/utils";
import { Loader2 } from "lucide-react";
import { Fragment, useMemo } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
const AppProductButtons = ({ id }: { id: string }) => {
  // chose favorite icon
  const router = useRouter();
  const { isInWishlist, toggleWishlist, isToggling } = useWishlist();

  const FavoriteIcon = isToggling ? Loader2 : isInWishlist(id) ? MdFavorite : MdFavoriteBorder;

  // optimize unnecessary re rendering
  const buttons = useMemo(
    () => [
      {
        label: "View",
        icon: <IoEyeOutline size={18} />,
        onClickHandler: () => {
          router.push(`/products/${id}`);
        },
      },
      {
        label: "Compare",
        icon: <LuRefreshCw size={16} />,
        onClickHandler: () => {},
      },
      {
        label: "Wishlist",
        icon: (
          <FavoriteIcon
            className={cn(
              "cursor-pointer",
              isInWishlist(id) && !isToggling && "text-pink-600",
              isToggling && "animate-spin"
            )}
            size={16}
          />
        ),
        onClickHandler: toggleWishlist,
        isLoading: isToggling,
      },
    ],
    [id, router, isInWishlist, toggleWishlist]
  );

  return (
    <div className="absolute -bottom-4 z-10 flex gap-1 rounded-xl bg-white px-6 py-3 opacity-0 shadow-md transition-all duration-300 group-hover:bottom-1 group-hover:opacity-100">
      {buttons.map((button, i) => (
        <Fragment key={button.label}>
          {i !== 0 && <Divider type="vertical" />}
          <Tooltip title={button.label} color={light_colors.primary}>
            {/* <Button> */}
            <button disabled={button.isLoading} onClick={() => button.onClickHandler(id)}>
              {button.icon}
            </button>
            {/* </Button> */}
          </Tooltip>
        </Fragment>
      ))}
    </div>
  );
};

export default AppProductButtons;
