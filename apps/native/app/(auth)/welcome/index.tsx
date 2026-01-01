import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { withUniwind } from "uniwind";
import { Button } from "@/components/ui/button";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledAnimatedView = withUniwind(Animated.View);

// Carousel images data
const CAROUSEL_IMAGES = [
  {
    id: 1,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766714263/a63dcc99144a0bd8ef0bae8e47ac678fc004d7eb_tetula.png",
    height: 189,
  },
  {
    id: 2,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/v1766714815/f9add1f21953b284594234b81bebe79f2915044f_qe0wze.png",
    height: 230,
  },
  {
    id: 3,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766714932/Rectangle6-TZPyA.png",
    height: 189,
  },
  {
    id: 4,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766714649/0f702e0d15dc647aa61651827fe2aa8f1cb264aa_y7lne8.png",
    height: 209,
  },
  {
    id: 5,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766714532/b9db851d806945c14aad2ae7a606cad2db39a460_nyys6a.png",
    height: 168,
  },
  {
    id: 6,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766716566/Rectangle_8_z1vkle.png",
    height: 209,
  },
  {
    id: 7,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766714932/Rectangle11-o0av6.png",
    height: 209,
  },
  {
    id: 8,
    uri: "https://res.cloudinary.com/dbmzeqgxf/image/upload/f_auto,q_auto/v1766714933/Rectangle14-qwXt8.png",
    height: 209,
  },
];

function AnimatedCarousel() {
  const scrollX = useSharedValue(0);

  useEffect(() => {
    // Animate carousel scrolling continuously
    scrollX.value = withRepeat(
      withSequence(
        withTiming(-400, { duration: 5500, easing: Easing.linear }),
        withTiming(0, { duration: 5500, easing: Easing.linear })
      ),
      -1,
      false
    );
  }, [scrollX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: scrollX.value }],
    };
  });

  return (
    <StyledView className="h-103.5 w-full overflow-hidden">
      <StyledAnimatedView
        className="flex-row gap-4 px-[21px]"
        style={[animatedStyle]}
      >
        {/* First column */}
        <StyledView className="gap-4">
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[0].uri }}
            style={{ width: 172, borderRadius: 25, height: 189 }}
          />
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[3].uri }}
            style={{
              height: 209,
              width: 172,
              borderRadius: 25,
            }}
          />
        </StyledView>

        {/* Second column */}
        <StyledView className="gap-4">
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[1].uri }}
            style={{ height: 230, width: 172, borderRadius: 25 }}
          />
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[4].uri }}
            style={{ height: 168, width: 172, borderRadius: 25 }}
          />
        </StyledView>

        {/* Third column */}
        <StyledView className="gap-4">
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[2].uri }}
            style={{ height: 189, width: 172, borderRadius: 25 }}
          />
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[5].uri }}
            style={{ height: 209, width: 172, borderRadius: 25 }}
          />
        </StyledView>

        <StyledView className="gap-4">
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[7].uri }}
            style={{ height: 230, width: 172, borderRadius: 25 }}
          />
          <Image
            contentFit="cover"
            source={{ uri: CAROUSEL_IMAGES[6].uri }}
            style={{ height: 168, width: 172, borderRadius: 25 }}
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
      <StyledView className="absolute -top-[982px] -left-[290px] h-[982px] w-[982px] rounded-full bg-gradient-to-b from-orange-100 to-transparent opacity-30" />

      {/* Carousel Section */}
      <StyledView className="mt-[21px]">
        <AnimatedCarousel />
      </StyledView>

      {/* Pagination Dots */}
      <StyledView className="mt-[12px] flex-row items-center justify-center gap-[6px]">
        <StyledView className="h-[7px] w-[18px] rounded-full bg-orange" />
        <StyledView className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
        <StyledView className="h-[7px] w-[7px] rounded-full bg-[#D9D9D9]" />
      </StyledView>

      {/* Content Section */}
      <StyledView className="mt-[27px] items-center px-[22px]">
        <StyledText className="text-center font-medium text-[26px] text-black tracking-tighter">
          Focus Made Simple
        </StyledText>

        <StyledText className="mt-[6px] w-[359px] text-center font-normal text-[16px] text-black tracking-tighter">
          Use Pomodoro sessions to build focus, stay consistent, and finish
          tasks with clarity.
        </StyledText>
      </StyledView>

      {/* Buttons */}
      <StyledView className="absolute bottom-[62px] w-full gap-[12px] px-[21px]">
        {/* Next Button */}
        <Button onPress={() => router.push("/onboarding/second")}>
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
