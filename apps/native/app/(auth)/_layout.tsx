import { Redirect, Stack } from "expo-router";
import { authClient } from "@/lib/auth-client";

export default function AuthLayout() {
  const { data: session, isPending } = authClient.useSession();

  if (session?.user && !isPending) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in/index" />
      <Stack.Screen name="sign-up/index" />
    </Stack>
  );
}
