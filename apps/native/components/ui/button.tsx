import { cva, type VariantProps } from "class-variance-authority";
import { LinearGradient } from "expo-linear-gradient";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";
import { Pressable, Text, View } from "react-native";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative h-16 flex-row items-center justify-center overflow-hidden rounded-[30px]",
  {
    variants: {
      variant: {
        default: "bg-orange",
        destructive: "bg-red-600",
        outline: "border border-border bg-transparent",
        secondary: "bg-muted",
        ghost: "bg-transparent",
        link: "bg-transparent",
      },
      size: {
        default: "h-16 px-6",
        sm: "h-10 rounded-[20px] px-4",
        lg: "h-14 rounded-[32px] px-8",
        icon: "h-16 w-16 rounded-full",
      },
      state: {
        default: "",
        disabled: "bg-alternate",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-white",
      destructive: "text-white",
      outline: "text-foreground",
      secondary: "text-foreground",
      ghost: "text-foreground",
      link: "text-primary underline",
    },
    size: {
      default: "text-[18px]",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-base",
    },
    state: {
      default: "",
      disabled: "text-white",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof Pressable>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  labelClasses?: string;
}

const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      label,
      labelClasses,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Pressable
        className={cn(
          buttonVariants({
            variant,
            size,
            state: disabled ? "disabled" : "default",
          }),
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {({ pressed }) => (
          <>
            {/* DARKEN WHEN PRESSED */}
            {pressed && !disabled && (
              <View
                className="absolute inset-0 bg-black/20"
                pointerEvents="none"
              />
            )}

            {/* INNER SHADOW — ONLY WHEN DISABLED */}
            {
              <>
                {/* TOP highlight */}
                <LinearGradient
                  className="absolute top-0 right-0 left-0 h-5"
                  colors={["rgba(255,255,255,0.35)", "transparent"]}
                  end={{ x: 0.5, y: 1 }}
                  pointerEvents="none"
                  start={{ x: 0.5, y: 0 }}
                />

                {/* BOTTOM shadow */}
                <LinearGradient
                  className="absolute right-0 bottom-0 left-0 h-3"
                  colors={["transparent", "rgba(0,0,0,0.05)"]}
                  end={{ x: 0.5, y: 1 }}
                  pointerEvents="none"
                  start={{ x: 0.5, y: 0 }}
                />
              </>
            }

            {label ? (
              <Text
                className={cn(
                  buttonTextVariants({ variant, size }),
                  disabled && "text-white/80",
                  labelClasses
                )}
              >
                {label}
              </Text>
            ) : (
              children
            )}
          </>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants, buttonTextVariants };
