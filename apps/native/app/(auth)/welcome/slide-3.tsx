import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { withUniwind } from "uniwind";
import { Button } from "@/components/ui/button";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);

export default function OnboardingThird() {
  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      {/* Background gradient circle - top */}
      <StyledView className="absolute -top-[545px] -left-[290px] h-[982px] w-[982px] overflow-hidden rounded-full">
        <Image
          contentFit="cover"
          source={{
            uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766715566/9e9a821d2b5cde3cc6394afb8811d2237f24fd2f_ukakus.png",
          }}
          style={{ height: "100%", width: "100%" }}
        />
      </StyledView>

      {/* Background gradient circle - bottom */}
      <StyledView className="absolute top-[874px] -left-[299px] h-[1000px] w-[1000px] rounded-full bg-[#FFE5D2]" />

      {/* Pagination Dots */}
      <StyledView className="absolute top-[447px] flex-row items-center justify-center gap-[6px] self-center">
        <StyledView className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="h-[7px] w-[18px] rounded-full bg-orange" />
      </StyledView>

      {/* Content Section */}
      <StyledView className="absolute top-[454px] w-full items-center self-center px-[22px]">
        <StyledText className="text-center font-medium text-[26px] text-black tracking-tighter">
          Track Your Growth
        </StyledText>

        <StyledText className="mt-[12px] w-[359px] text-center font-normal text-[16px] text-black tracking-tighter">
          Track your goals, explore career maps, and grow with a study planner
          that adapts to you.
        </StyledText>
      </StyledView>

      {/* Get Started Button */}
      <StyledView className="absolute bottom-[62px] w-full px-[21px]">
        <Button onPress={() => router.replace("/")}>
          <StyledText className="font-medium text-lg text-white tracking-tighter">
            Get Started
          </StyledText>
        </Button>
      </StyledView>
    </StyledView>
  );
}
