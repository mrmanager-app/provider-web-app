import { cn } from "@/lib/utils";
import type { CardHeaderProps } from "../../features/auth/types";

export function CardHeader({ title, description, className }: CardHeaderProps) {
  return (
    <div className={cn("space-y-2 text-center", className)}>
      <h2 className="text-[32px] font-medium">{title}</h2>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
