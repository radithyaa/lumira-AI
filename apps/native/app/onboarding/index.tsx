import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { withUniwind } from "uniwind";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);
const StyledAnimatedView = withUniwind(Animated.View);

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// Carousel images data
const CAROUSEL_IMAGES = [
  {
    id: 1,
    uri: "https://api.builder.io/api/v1/image/assets/TEMP/a63dcc99144a0bd8ef0bae8e47ac678fc004d7eb?width=344",
    height: 189,
  },
  {
    id: 2,
    uri: "https://api.builder.io/api/v1/image/assets/TEMP/f9add1f21953b284594234b81bebe79f2915044f?width=344",
    height: 230,
  },
  {
    id: 3,
    uri: "https://api.builder.io/api/v1/image/assets/TEMP/d6a90b2c0fe69f768d3a9d307d7d60a33590bcd1?width=344",
    height: 189,
  },
  {
    id: 4,
    uri: "https://api.builder.io/api/v1/image/assets/TEMP/0f702e0d15dc647aa61651827fe2aa8f1cb264aa?width=344",
    height: 209,
  },
  {
    id: 5,
    uri: "https://api.builder.io/api/v1/image/assets/TEMP/b9db851d806945c14aad2ae7a606cad2db39a460?width=344",
    height: 168,
  },
  {
    id: 6,
    uri: "https://api.builder.io/api/v1/image/assets/TEMP/3e3fee9808f2cfdb5d8dfe94ce8e4528e5731f60?width=344",
    height: 209,
  },
];

function AnimatedCarousel() {
  const scrollX = useSharedValue(0);

  useEffect(() => {
    // Animate carousel scrolling continuously
    scrollX.value = withRepeat(
      withSequence(
        withTiming(-200, { duration: 3000, easing: Easing.linear }),
        withTiming(0, { duration: 3000, easing: Easing.linear })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrollX.value }],
    };
  });

  return (
    <StyledView className="h-[414px] w-full overflow-hidden">
      <StyledAnimatedView
        style={[animatedStyle]}
        className="flex-row gap-4 px-[21px]"
      >
        {/* First column */}
        <StyledView className="gap-4">
          <Image
            source={{ uri: CAROUSEL_IMAGES[0].uri }}
            className="w-[172px] h-[189px] rounded-[25px]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: CAROUSEL_IMAGES[3].uri }}
            className="w-[172px] h-[209px] rounded-[25px]"
            resizeMode="cover"
          />
        </StyledView>

        {/* Second column */}
        <StyledView className="gap-4">
          <Image
            source={{ uri: CAROUSEL_IMAGES[1].uri }}
            className="w-[172px] h-[230px] rounded-[25px]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: CAROUSEL_IMAGES[4].uri }}
            className="w-[172px] h-[168px] rounded-[25px]"
            resizeMode="cover"
          />
        </StyledView>

        {/* Third column */}
        <StyledView className="gap-4">
          <Image
            source={{ uri: CAROUSEL_IMAGES[2].uri }}
            className="w-[172px] h-[189px] rounded-[25px]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: CAROUSEL_IMAGES[5].uri }}
            className="w-[172px] h-[209px] rounded-[25px]"
            resizeMode="cover"
          />
        </StyledView>

        {/* Repeat for continuous loop */}
        <StyledView className="gap-4">
          <Image
            source={{ uri: CAROUSEL_IMAGES[0].uri }}
            className="w-[172px] h-[189px] rounded-[25px]"
            resizeMode="cover"
          />
          <Image
            source={{ uri: CAROUSEL_IMAGES[3].uri }}
            className="w-[172px] h-[209px] rounded-[25px]"
            resizeMode="cover"
          />
        </StyledView>
      </StyledAnimatedView>
    </StyledView>
  );
}

export default function OnboardingFirst() {
  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      {/* Background gradient circle */}
      <StyledView className="absolute -top-[982px] -left-[290px] w-[982px] h-[982px] rounded-full bg-gradient-to-b from-orange-100 to-transparent opacity-30" />

      {/* Carousel Section */}
      <StyledView className="mt-[21px]">
        <AnimatedCarousel />
      </StyledView>

      {/* Pagination Dots */}
      <StyledView className="flex-row items-center justify-center gap-[6px] mt-[12px]">
        <StyledView className="w-[18px] h-[7px] rounded-full bg-[#FF8225]" />
        <StyledView className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="w-[7px] h-[7px] rounded-full bg-[#D9D9D9]" />
      </StyledView>

      {/* Content Section */}
      <StyledView className="px-[22px] mt-[27px] items-center">
        <StyledText
          className="text-[#131313] text-center text-[26px] font-medium tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Focus Made Simple
        </StyledText>

        <StyledText
          className="text-[#131313] text-center text-[16px] font-normal tracking-[-0.5px] mt-[6px] w-[359px]"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          Use Pomodoro sessions to build focus, stay consistent, and finish
          tasks with clarity.
        </StyledText>
      </StyledView>

      {/* Buttons */}
      <StyledView className="absolute bottom-[62px] px-[21px] w-full gap-[12px]">
        {/* Next Button */}
        <StyledTouchableOpacity
          className="h-[64px] rounded-[30px] bg-[#FF8225] items-center justify-center shadow-inner"
          onPress={() => router.push("/onboarding/second")}
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
