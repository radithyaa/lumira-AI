import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { withUniwind } from "uniwind";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);

export default function OnboardingThird() {
  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      {/* Background gradient circle - top */}
      <StyledView className="absolute -top-[545px] -left-[290px] w-[982px] h-[982px] rounded-full overflow-hidden">
        <Image
          source={{
            uri: "https://api.builder.io/api/v1/image/assets/TEMP/9e9a821d2b5cde3cc6394afb8811d2237f24fd2f?width=1964",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </StyledView>

      {/* Background gradient circle - bottom */}
      <StyledView className="absolute top-[874px] -left-[299px] w-[1000px] h-[1000px] rounded-full bg-[#FFE5D2]" />

      {/* Pagination Dots */}
      <StyledView className="flex-row items-center justify-center gap-[6px] absolute top-[447px] self-center">
        <StyledView className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="w-[18px] h-[7px] rounded-full bg-[#FF8225]" />
      </StyledView>

      {/* Content Section */}
      <StyledView className="px-[22px] absolute top-[454px] items-center self-center w-full">
        <StyledText
          className="text-[#131313] text-center text-[26px] font-medium tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Track Your Growth
        </StyledText>

        <StyledText
          className="text-[#131313] text-center text-[16px] font-normal tracking-[-0.5px] mt-[12px] w-[359px]"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Track your goals, explore career maps, and grow with a study planner
          that adapts to you.
        </StyledText>
      </StyledView>

      {/* Get Started Button */}
      <StyledView className="absolute bottom-[62px] px-[21px] w-full">
        <StyledTouchableOpacity
          className="h-[64px] rounded-[30px] bg-[#FF8225] items-center justify-center shadow-inner"
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <StyledText
            className="text-white text-[18px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Get Started
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
