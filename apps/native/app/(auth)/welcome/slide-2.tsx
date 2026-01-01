import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { withUniwind } from "uniwind";
import { Button } from "@/components/ui/button";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);

export default function OnboardingSecond() {
  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      {/* Background gradient circle */}
      <StyledView className="absolute -top-[545px] -left-[290px] h-[982px] w-[982px] overflow-hidden rounded-full">
        <Image
          contentFit="cover"
          source={{
            uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766713677/onboarding2_cmk80z.png",
          }}
          style={{ height: "100%", width: "100%" }}
        />
      </StyledView>

      {/* Pagination Dots */}
      <StyledView className="absolute top-[447px] flex-row items-center justify-center gap-[6px] self-center">
        <StyledView className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="h-[7px] w-[18px] rounded-full bg-orange" />
        <StyledView className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
      </StyledView>

      {/* Content Section */}
      <StyledView className="absolute top-[474px] w-full items-center self-center px-[22px]">
        <StyledText className="text-center font-medium text-[26px] text-black tracking-tighter">
          Plan Your Future
        </StyledText>

        <StyledText className="mt-[12px] w-[359px] text-center font-normal text-[16px] text-black tracking-tighter">
          Get personalized recommendations based on your MBTI, grades,
          interests, and dream job—powered by AI.
        </StyledText>
      </StyledView>

      {/* Buttons */}

      {/* Buttons */}
      <StyledView className="absolute bottom-[62px] w-full gap-[12px] px-[21px]">
        {/* Next Button */}
        <Button onPress={() => router.push("/onboarding/third")}>
          <Text className="font-medium text-lg text-white tracking-tighter">
            Next
          </Text>
        </Button>

        <Button
          onPress={() => router.replace("/onboarding/third")}
          variant="outline"
        >
          <Text className="font-medium text-lg text-orange tracking-tighter">
            Skip
          </Text>
        </Button>
      </StyledView>
    </StyledView>
  );
}
