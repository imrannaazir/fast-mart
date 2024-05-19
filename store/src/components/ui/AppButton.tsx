import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { FaArrowRight } from "react-icons/fa";

const appButtonVariants = cva(
  " tracking-widest   relative  overflow-hidden  inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-secondary text-background hover:bg-secondary/90 button button--aylen",
        secondary:
          "bg-primary text-background hover:bg-primary/90 button button--aylen",
        ghost: "bg-transparent text-background pl-0",
      },
      size: {
        default: "h-10 pl-4 pr-2 py-2",
        sm: "h-9 rounded-md text-sm pl-0 pr-0 mt-1 text-foreground/70",
        lg: "h-12 rounded-md pl-8 pr-6 font-bold text-[16px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {
  asChild?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "group flex gap-2",
          appButtonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {children}
        <FaArrowRight className=" ml-0 mr-1 group-hover:ml-1 group-hover:mr-0 duration-200" />
      </Comp>
    );
  }
);
AppButton.displayName = "AppButton";

export { AppButton, appButtonVariants };
