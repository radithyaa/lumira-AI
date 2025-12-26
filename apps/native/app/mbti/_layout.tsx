import { Stack } from "expo-router";

export default function MBTILayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="result" />
    </Stack>
  );
}
