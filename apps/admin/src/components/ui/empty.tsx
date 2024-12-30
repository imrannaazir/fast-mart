import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}

export function Empty({ icon: Icon, title, description, children, className, align = "center", ...props }: EmptyProps) {
  return (
    <div
      className={cn(
        "bg-background animate-in fade-in-50 flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center",
        align === "left" && "items-start text-left",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex max-w-[420px] flex-col items-center gap-4">
        {Icon && (
          <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
            <Icon className="text-muted-foreground h-10 w-10" />
          </div>
        )}
        <div className={cn("space-y-2", align === "left" && "items-start text-left")}>
          <h3 className="text-2xl font-medium tracking-tight">{title}</h3>
          {description && <p className="text-muted-foreground text-base">{description}</p>}
        </div>
        {children && <div className="flex flex-col gap-2">{children}</div>}
      </div>
    </div>
  );
}
