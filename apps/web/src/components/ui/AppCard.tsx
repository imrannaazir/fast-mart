import { cn } from "@/libs/utils";
import { ClassValue } from "clsx";
import { FC } from "react";
import { AppButton } from "./AppButton";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { THeroCoverProps } from "@/types";

// Define the variant type
type AppCardVariant = "primary" | "secondary" | "accent";
type AppCardSize = "lg" | "sm";

// Create the base variant configuration for the card
const appCardVariants = cva("relative flex items-center rounded-md min-w-full  ", {
  variants: {
    variant: {
      primary: " ",
      secondary: "lg:h-[200px] lg:w-[320px]  xl:h-[240px]  xl:min-w-[407px]  ",
      accent: " ",
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
      primary: "text-gray-500 font-medium mr-2",
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
      primary: "  bg-gradient-to-r from-secondary/10 to-transparent rounded-full text-sm font-semibold  py-2 px-3 ",
      secondary: "  lg:text-[28px] font-semibold",
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
// Create variant configurations for heading
const headingVariants = cva("", {
  variants: {
    variant: {
      primary: " text-primary md:text-[36px] font-extrabold",
      secondary: "text-primary md:text-[24px] font-bold ",
      accent: "font-semibold ",
    },
    size: {
      lg: " ",
      sm: " lg:text-[20px] font-extrabold",
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
      lg: "md:text-[36px] font-semibold md:w-[80%]",
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
      primary: " hidden lg:block text-sm font-medium w-[75%] mb-6",
      secondary: "text-sm lg:w-[70%] ",
      accent: " text-sm",
    },
    size: {
      lg: "",
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
const AppCard: FC<TAppCardProps> = ({ className, variant = "primary", size = "lg", cover }) => {
  return (
    <div className={cn(appCardVariants({ variant, size }), className)}>
      <img src={cover.photo as string} alt="banners" className="h-full w-full rounded-md object-cover" />

      <div className={cn("absolute p-[5%] lg:w-[75%]", variant === "accent" && "pl-0 lg:w-full")}>
        {/* description */}
        <div className={cn(cardDescriptionVariants({ variant, size }))}>
          {/* top heading */}
          <div className="flex items-center">
            {cover.topHeader && <h5 className={cn(topHeadingVariants({ variant, size }))}>{cover.topHeader}</h5>}
            {/* offer amount */}
            <span className={cn(offerAmountVariants({ variant, size }))}>{cover.offerAmount}</span>
          </div>
          {/* sub heading */}
          <h3 className={cn(subheadingVariants({ variant, size }))}>{cover.subHeading}</h3>
          {/* heading */}
          <h2 className={cn(headingVariants({ variant, size }))}>{cover.heading}</h2>
          {/* description */}
          {cover.description && <p className={cn(descriptionVariants({ variant, size }))}>{cover.description}</p>}
        </div>
        {/* button */}
        <Link href={cover.path}>
          <AppButton
            className={cn(
              variant === "secondary" ? "text-foreground" : "text-white",
              variant === "accent" ? "xl:mt-8-ml-2 mt-8 text-sm lg:mt-2" : ""
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
