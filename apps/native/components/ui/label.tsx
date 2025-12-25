import { Root, Text, type TextProps, type TextRef } from "@rn-primitives/label";
import { Platform } from "react-native";
import { cn } from "@/lib/utils";

function Label({
  className,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  disabled,
  ...props
}: TextProps & React.RefAttributes<TextRef>) {
  return (
    <Root
      className={cn(
        "flex select-none flex-row items-center gap-2",
        Platform.select({
          web: "cursor-default leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        }),
        disabled && "opacity-50"
      )}
      disabled={disabled}
      onLongPress={onLongPress}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      <Text
        className={cn(
          "font-medium text-black text-sm tracking-tighter",
          Platform.select({ web: "leading-none" }),
          className
        )}
        {...props}
      />
    </Root>
  );
}

export { Label };
