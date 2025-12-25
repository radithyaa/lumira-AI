import { Check } from "lucide-react-native";
import { type ComponentRef, forwardRef } from "react";
import { Pressable, type PressableProps } from "react-native";
import { cn } from "@/lib/utils";

interface CheckboxProps extends PressableProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<ComponentRef<typeof Pressable>, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <Pressable
        aria-checked={checked}
        className={cn(
          "peer h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-orange bg-transparent disabled:cursor-not-allowed disabled:opacity-50",
          checked && "bg-cream",
          className
        )}
        onPress={() => onCheckedChange?.(!checked)}
        ref={ref}
        role="checkbox"
        {...props}
      >
        {checked && <Check color="orange" size={14} strokeWidth={3} />}
      </Pressable>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
