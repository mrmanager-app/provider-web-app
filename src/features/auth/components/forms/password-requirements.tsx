import { cn } from "@/lib/utils";
import { validatePasswordRequirements } from "../../schemas";
import { PASSWORD_REQUIREMENT_LABELS } from "../../constants";
import { IconCircleCheck, IconCircleX } from "@tabler/icons-react";

// Move outside component to avoid re-allocation on every render
const REQUIREMENT_ITEMS = [
  { key: "hasMinLength" as const, label: PASSWORD_REQUIREMENT_LABELS.hasMinLength },
  { key: "hasSpecialChar" as const, label: PASSWORD_REQUIREMENT_LABELS.hasSpecialChar },
  { key: "hasNumber" as const, label: PASSWORD_REQUIREMENT_LABELS.hasNumber },
  { key: "hasUppercase" as const, label: PASSWORD_REQUIREMENT_LABELS.hasUppercase },
  { key: "hasLowercase" as const, label: PASSWORD_REQUIREMENT_LABELS.hasLowercase },
] as const;

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  const requirements = validatePasswordRequirements(password);

  return (
    <div className="border-border space-y-3 rounded-lg border p-4">
      <p className="text-foreground text-sm font-medium">
        Your password must have the following:
      </p>
      <div className="grid grid-cols-2 gap-2">
        {REQUIREMENT_ITEMS.map(({ key, label }) => {
          const isMet = requirements[key];
          return (
            <div key={key} className="flex items-center gap-2 text-sm">
              {isMet ? (
                <IconCircleCheck className="size-4 text-green-500" />
              ) : (
                <IconCircleX className="text-destructive size-4" />
              )}
              <span className={cn(isMet ? "text-foreground" : "text-muted-foreground")}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

