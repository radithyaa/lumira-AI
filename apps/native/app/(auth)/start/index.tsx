import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function StartPage() {
  const router = useRouter();

  // Asset URLs from design
  const imgWizardBoarding =
    "https://www.figma.com/api/mcp/asset/5f209f82-77d4-490c-88f4-01fbcdad1509";
  const imgGroup14 =
    "https://www.figma.com/api/mcp/asset/d13f8a1c-8156-47f9-807e-6ae9c9dff031";

  return (
    <View className="relative flex-1 bg-cream">
      {/* Background Image / Wizard Boarding Image */}
      <Image
        className="absolute top-0 h-full"
        resizeMode="cover"
        source={{ uri: imgWizardBoarding }}
      />

      {/* Content Container */}
      <View className="flex-1 justify-end px-6 pb-12">
        {/* Floating Circle Icon */}
        <View className="mb-6 items-center">
          <View className="h-20 w-20 items-center justify-center rounded-2xl bg-orange shadow-sm">
            <Image
              className="h-10 w-10"
              resizeMode="contain"
              source={{ uri: imgGroup14 }}
            />
          </View>
        </View>

        {/* Text Content */}
        <View className="mb-10 items-center">
          <Text className="mb-2 text-center font-medium text-3xl text-foreground">
            Time to discover your type
          </Text>
          <Text className="px-4 text-center text-base text-foreground">
            This quick test helps us guide you smarter.
          </Text>
        </View>

        {/* Action Button */}
        <Button
          className="h-16 w-full rounded-full bg-orange shadow-lg"
          onPress={() => router.push("/sign-in")}
        >
          <Text className="font-medium text-lg text-white">Start the Test</Text>
        </Button>
      </View>
    </View>
  );
}
