import { Platform, TextInput, type TextInputProps } from "react-native";
import { cn } from "@/lib/utils";

function Input({
  className,
  ...props
}: TextInputProps & React.RefAttributes<TextInput>) {
  const disabled = props.editable === false;

  return (
    <TextInput
      className={cn(
        // base
        "h-16 w-full rounded-md border bg-white px-3 font-normal text-base tracking-tighter",

        // enabled
        !disabled && "border-orange text-orange",

        // disabled
        disabled && "bg-background text-gray-400",

        // platform
        Platform.select({
          native: "placeholder:text-gray-400",
          web: "outline-none",
        }),

        className
      )}
      editable={!disabled}
      {...props}
    />
  );
}

export { Input };
