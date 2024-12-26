import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ReactNode } from "react";

const pageVariants = cva("", {
  variants: {
    size: {
      default: "",
      sm: "mx-auto max-w-4xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
export interface PageProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageVariants> {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  isInModal?: boolean;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ className, isInModal, size, action, title, children, ...props }, ref) => {
    return (
      <div className={cn(pageVariants({ size, className }))} {...props} ref={ref}>
        <div className={cn(isInModal ? "hidden" : "flex justify-between")}>
          <h3 className="flex items-center gap-2 text-xl font-bold">{title}</h3>
          {action}
        </div>
        <div className="py-4">{children}</div>
      </div>
    );
  }
);

export default Page;
