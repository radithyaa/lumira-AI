import { Controller, useFormContext } from "react-hook-form";
import { type TextInputProps, View } from "react-native";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";

type ControlledInputProps = {
  name: string;
  label?: string;
} & TextInputProps;

export function ControlledInput({
  name,
  label,
  ...props
}: ControlledInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View className="">
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString() ?? ""}
            {...props}
          />
          {error && (
            <Text className="ml-1 text-base text-red-500">
              {error.message?.toString()}
            </Text>
          )}
        </View>
      )}
    />
  );
}
