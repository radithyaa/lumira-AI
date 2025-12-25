import { router } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { withUniwind } from "uniwind";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);

export default function OnboardingSecond() {
  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      {/* Background gradient circle */}
      <StyledView className="absolute -top-[545px] -left-[290px] w-[982px] h-[982px] rounded-full overflow-hidden">
        <Image
          source={{
            uri: "https://api.builder.io/api/v1/image/assets/TEMP/9856daa91c11332748e69238e86cab1babc55348?width=1964",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </StyledView>

      {/* Pagination Dots */}
      <StyledView className="flex-row items-center justify-center gap-[6px] absolute top-[447px] self-center">
        <StyledView className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="w-[18px] h-[7px] rounded-full bg-[#FF8225]" />
        <StyledView className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9]" />
      </StyledView>

      {/* Content Section */}
      <StyledView className="px-[22px] absolute top-[474px] items-center self-center w-full">
        <StyledText
          className="text-[#131313] text-center text-[26px] font-medium tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Plan Your Future
        </StyledText>

        <StyledText
          className="text-[#131313] text-center text-[16px] font-normal tracking-[-0.5px] mt-[12px] w-[359px]"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Get personalized recommendations based on your MBTI, grades,
          interests, and dream job—powered by AI.
        </StyledText>
      </StyledView>

      {/* Buttons */}
      <StyledView className="absolute bottom-[62px] px-[21px] w-full gap-[12px]">
        {/* Next Button */}
        <StyledTouchableOpacity
          className="h-[64px] rounded-[30px] bg-[#FF8225] items-center justify-center shadow-inner"
          onPress={() => router.push("/onboarding/third")}
          activeOpacity={0.8}
        >
          <StyledText
            className="text-white text-[18px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Next
          </StyledText>
        </StyledTouchableOpacity>

        {/* Skip Button */}
        <StyledTouchableOpacity
          className="h-[64px] rounded-[30px] border border-[#FF8225] items-center justify-center shadow-inner"
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <StyledText
            className="text-[#FF8225] text-[18px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Skip
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
