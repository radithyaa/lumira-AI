import { Pressable } from "@rn-primitives/slot";
import { useRouter } from "expo-router";
import { deleteItemAsync } from "expo-secure-store";
import { Card } from "heroui-native";
import { View } from "react-native";
import { Container } from "@/components/container";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  if (isPending) {
    return (
      <Container className="p-6">
        <Text>Loading...</Text>
      </Container>
    );
  }

  return (
    <Container className="p-6">
      <View className="mb-6 py-4">
        <Text className="mb-2 font-bold text-4xl text-foreground">
          Dashboard
        </Text>
      </View>

      <Card className="mb-6 p-4" variant="secondary">
        <Text className="mb-2 text-base text-foreground">
          Welcome back,{" "}
          <Text className="font-medium">{session?.user?.name}</Text>
        </Text>
        <Text className="mb-4 text-muted text-sm">{session?.user?.email}</Text>
        <Pressable
          className="self-start rounded-lg bg-danger px-4 py-3 active:opacity-70"
          onPress={async () => {
            await deleteItemAsync("auth-session");
            await authClient.signOut();
            router.push("/sign-in");
          }}
        >
          <Text className="font-medium text-foreground">Sign Out</Text>
        </Pressable>
      </Card>
    </Container>
  );
}
