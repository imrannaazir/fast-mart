import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import Image from "next/image";
import { FC } from "react";
import { AppButton } from "./AppButton";
import { cva } from "class-variance-authority";
import { THeroCoverProps } from "@/app/(WithCommonLayout)/components/Hero";
import Link from "next/link";

// Define the variant type
type AppCardVariant = "primary" | "secondary" | "accent";
type AppCardSize = "lg" | "sm";

// Create the base variant configuration for the card
const appCardVariants = cva(
  "relative flex items-center rounded-md min-w-full  ",
  {
    variants: {
      variant: {
        primary: " h-[500px]  bg-red-300",
        secondary: " h-[240px] min-w-[407px] bg-green-300 ",
        accent: " bg-blue-400",
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
  }
);

// Create variant configurations for top heading
const cardDescriptionVariants = cva("", {
  variants: {
    variant: {
      primary: " ",
      secondary: " ",
      accent: " backdrop-blur-sm bg-white/50 rounded-r-full py-2 pl-4",
    },
    size: {
      lg: "  ",
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
const offerAmountVariants = cva("text-secondary", {
  variants: {
    variant: {
      primary:
        "  bg-gradient-to-r from-secondary/10 to-transparent rounded-full",
      secondary: "  text-[28px] font-semibold",
      accent: " ",
    },
    size: {
      lg: " text-sm font-semibold  py-2 px-3 ml-4",
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
      secondary: "text-primary text-[24px] font-bold ",
      accent: "font-semibold ",
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
const descriptionVariants = cva("text-gray-400", {
  variants: {
    variant: {
      primary: " ",
      secondary: "text-sm w-[70%] ",
      accent: " text-sm",
    },
    size: {
      lg: "text-sm font-medium w-[75%] mb-6",
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
  cover: THeroCoverProps;
};

// Define the AppCard component with the correct types
const AppCard: FC<TAppCardProps> = ({
  className,
  variant = "primary",
  size = "lg",
  cover,
}) => {
  return (
    <div className={cn(appCardVariants({ variant, size }), className)}>
      <Image
        src={cover.photo as string}
        alt="banners"
        className=" rounded-md w-full h-full object-cover"
      />

      <div
        className={cn(
          "absolute w-[75%] p-[5%]",
          variant === "accent" && "pl-0"
        )}
      >
        {/* description */}
        <div className={cn(cardDescriptionVariants({ variant, size }))}>
          {/* top heading */}
          <div className="flex  items-center">
            <h5 className={cn(topHeadingVariants({ variant, size }))}>
              {cover.topHeader}
            </h5>
            {/* offer amount */}
            <span className={cn(offerAmountVariants({ variant, size }))}>
              {cover.offerAmount}
            </span>
          </div>
          {/* sub heading */}
          <h3 className={cn(subheadingVariants({ variant, size }))}>
            {cover.subHeading}
          </h3>
          {/* heading */}
          <h2 className={cn(headingVariants({ variant, size }))}>
            {cover.heading}
          </h2>
          {/* description */}
          <p className={cn(descriptionVariants({ variant, size }))}>
            {cover.description}
          </p>
        </div>
        {/* button */}
        <Link href={cover.path}>
          <AppButton
            className={cn(
              variant === "secondary" ? "text-foreground" : "text-white",
              variant === "accent" ? "mt-7 ml-6 text-sm" : ""
            )}
            size={size}
            variant={variant === "primary" ? "primary" : "ghost"}
          >
            Shop Now
          </AppButton>
        </Link>
      </div>
    </div>
  );
};

export default AppCard;
