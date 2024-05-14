import assets from "@/assets";
import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC } from "react";
import { AppButton } from "./AppButton";
import { cva } from "class-variance-authority";

// Define the variant type
type AppCardVariant = "primary" | "secondary" | "accent";
type AppCardSize = "lg" | "sm";

// Create the base variant configuration for the card
const appCardVariants = cva("relative flex items-center rounded-md", {
  variants: {
    variant: {
      primary: " ",
      secondary: " ",
      accent: " ",
    },
    size: {
      lg: " ",
      sm: " ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

// Create variant configurations for top heading
const topHeadingVariants = cva("", {
  variants: {
    variant: {
      primary: "text-gray-500 font-medium",
      secondary: " ",
      accent: " ",
    },
    size: {
      lg: "text-sm ",
      sm: " ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

// Create variant configurations for offer amount
const offerAmountVariants = cva("", {
  variants: {
    variant: {
      primary: " ",
      secondary: " ",
      accent: " ",
    },
    size: {
      lg: " text-sm font-semibold text-secondary py-2 px-3 bg-gradient-to-r from-secondary/10 to-transparent rounded-full",
      sm: " ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});
// Create variant configurations for heading
const headingVariants = cva("", {
  variants: {
    variant: {
      primary: " text-primary",
      secondary: " ",
      accent: " ",
    },
    size: {
      lg: " text-[36px] font-extrabold",
      sm: " ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

// Create variant configurations for sub heading
const subheadingVariants = cva("", {
  variants: {
    variant: {
      primary: "text-foreground/90",
      secondary: " ",
      accent: " ",
    },
    size: {
      lg: "text-[36px] font-semibold w-[80%]",
      sm: " ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});
// Create variant configurations for sub heading
const descriptionVariants = cva("", {
  variants: {
    variant: {
      primary: " text-gray-500",
      secondary: " ",
      accent: " ",
    },
    size: {
      lg: "text-sm font-semibold w-[75%] mb-6",
      sm: " ",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

// Extend component props to include variant prop
type TAppCardProps = {
  className?: ClassValue;
  variant?: AppCardVariant;
  size?: AppCardSize;
};

// Define the AppCard component with the correct types
const AppCard: FC<TAppCardProps> = ({
  className,
  variant = "primary",
  size = "lg",
}) => {
  return (
    <div className={cn(appCardVariants({ variant, size }), className)}>
      <Image
        src={assets.images.banners.eggs}
        alt="banners"
        className="w-full rounded-md"
      />

      {/* description */}
      <div className="absolute w-[75%] p-[5%]">
        {/* top heading */}
        <div className="flex gap-4 items-center">
          <h5 className={cn(topHeadingVariants({ variant, size }))}>
            Exclusive offer
          </h5>
          <span className={cn(offerAmountVariants({ variant, size }))}>
            30% Off
          </span>
        </div>
        {/* sub heading */}
        <h3 className={cn(subheadingVariants({ variant, size }))}>
          STAY HOME & DELIVERED YOUR
        </h3>
        {/* heading */}
        <h2 className={cn(headingVariants({ variant, size }))}>DAILY NEEDS</h2>
        {/* description */}
        <p className={cn(descriptionVariants({ variant, size }))}>
          Vegetables contain many vitamins and minerals that are good for your
          health.
        </p>
        {/* button */}
        <AppButton>Shop Now</AppButton>
      </div>
    </div>
  );
};

export default AppCard;
