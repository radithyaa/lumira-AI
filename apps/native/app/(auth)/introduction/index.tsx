import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";

export default function IntroductionPage() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-cream"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 px-6 py-12">
        {/* Header */}
        <View className="mt-4 mb-8 items-center">
          <Text className="text-center font-medium text-2xl">
            <Text className="text-orange">Start</Text>
            <Text className="text-foreground"> with the basic</Text>
          </Text>
          <Text className="mt-2 px-8 text-center text-grey-text text-lg">
            Let's personalize everything just for you.
          </Text>
        </View>

        {/* Form */}
        <View className="mt-4 gap-6">
          {/* Name */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Your Name</Label>
            <Input
              className="h-14 rounded-2xl border-orange bg-white px-4 font-regular text-base text-orange"
              placeholder="Muhammad Sultan"
              placeholderTextColor="#ff8225"
            />
          </View>

          {/* Age */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Your Age</Label>
            <Input
              className="h-14 rounded-2xl border-orange bg-white px-4 font-regular text-base text-orange"
              keyboardType="numeric"
              placeholder="17"
              placeholderTextColor="#ff8225"
            />
          </View>

          {/* Interest */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Interest</Label>
            <Input
              className="h-14 rounded-2xl border-orange bg-white px-4 font-regular text-base text-orange"
              placeholder="Coding and UI/UX Design"
              placeholderTextColor="#ff8225"
            />
          </View>

          {/* Dream Job */}
          <View className="gap-2">
            <Label className="ml-1 font-medium text-lg">Dream Job</Label>
            <Input
              className="h-14 rounded-2xl border-orange bg-white px-4 font-regular text-base text-orange"
              placeholder="CEO of IT Company"
              placeholderTextColor="#ff8225"
            />
          </View>
        </View>

        {/* Continue Button */}
        <View className="mt-auto pt-10 pb-6">
          <Button
            className="h-16 w-full rounded-full bg-orange shadow-lg"
            onPress={() => router.replace("/home")}
          >
            <Text className="font-medium text-lg text-white">Continue</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
