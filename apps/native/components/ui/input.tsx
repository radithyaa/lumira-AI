import { useState } from "react";
import { Platform, TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

function Input({
  className,
  value,
  defaultValue,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const disabled = props.editable === false;

  // Cek apakah input memiliki value (baik dari props.value atau internal state)
  const hasValue =
    value !== undefined ? value.length > 0 : internalValue.length > 0;

  // Input dianggap "active" jika sedang focus atau sudah ada value
  const isActive = isFocused || hasValue;

  return (
    <TextInput
      className={cn(
        // base
        "h-16 w-full rounded-2xl border bg-white px-3 font-normal text-base tracking-tighter",
        // states
        disabled && "border-gray-400 bg-background text-gray-400",
        !disabled &&
          (isActive
            ? "border-orange text-orange"
            : "border-alternate text-alternate"),
        // platform
        Platform.select({
          native: "placeholder:text-gray-400",
          web: "outline-none",
        }),
        className
      )}
      defaultValue={defaultValue}
      editable={!disabled}
      onBlur={(e) => {
        setIsFocused(false);
        props.onBlur?.(e);
      }}
      onChangeText={(text) => {
        setInternalValue(text);
        props.onChangeText?.(text);
      }}
      onFocus={(e) => {
        setIsFocused(true);
        props.onFocus?.(e);
      }}
      placeholderTextColor={"#7E7E7E"}
      value={value}
      {...props}
    />
  );
}

export { Input };
