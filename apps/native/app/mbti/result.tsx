import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { withUniwind } from "uniwind";
import Svg, { Path } from "react-native-svg";
import {
  calculatePersonality,
  getPersonalityData,
  type Answer,
  type PersonalityResult,
} from "@/lib/mbti-utils";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);
const StyledAnimatedView = withUniwind(Animated.View);
const StyledScrollView = withUniwind(ScrollView);

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface TraitBarProps {
  trait: {
    dimension: string;
    percentage: number;
    label: string;
    leftLabel: string;
    rightLabel: string;
    color: string;
  };
  index: number;
}

function TraitBar({ trait, index }: TraitBarProps) {
  const barPosition = ((trait.percentage - 50) / 50) * ((SCREEN_WIDTH - 60) / 2);

  const animatedBarStyle = useAnimatedStyle(() => {
    return {
      width: withDelay(
        index * 200,
        withTiming(SCREEN_WIDTH - 68, { duration: 800 })
      ),
    };
  });

  const animatedStarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withDelay(
            index * 200 + 300,
            withTiming(barPosition + (SCREEN_WIDTH - 68) / 2 - 20, {
              duration: 600,
            })
          ),
        },
      ],
    };
  });

  return (
    <StyledAnimatedView
      entering={FadeIn.delay(index * 150).duration(400)}
      className="w-full mb-6"
    >
      {/* Percentage Label */}
      <StyledText
        className="text-[#131313] text-center text-[16px] font-normal tracking-[-0.5px] mb-2"
        style={{ fontFamily: "Poppins-Medium" }}
      >
        <Text style={{ fontFamily: "Poppins-Medium" }}>{trait.percentage}%</Text>{" "}
        {trait.label}
      </StyledText>

      {/* Bar with Star */}
      <StyledView className="relative h-[50px] mb-2">
        <Animated.View
          style={[
            animatedBarStyle,
            {
              height: 9,
              backgroundColor: trait.color,
              borderRadius: 20,
              position: "absolute",
              top: 20,
              left: 4,
            },
          ]}
        />

        <Animated.View
          style={[
            animatedStarStyle,
            {
              position: "absolute",
              top: 0,
              width: 40,
              height: 40,
            },
          ]}
        >
          <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
            <Path
              d="M37.6545 21.3368L25.6937 25.6859L21.3446 37.6467C21.2431 37.9202 21.0602 38.1561 20.8207 38.3228C20.5811 38.4894 20.2963 38.5787 20.0045 38.5787C19.7127 38.5787 19.4279 38.4894 19.1884 38.3228C18.9488 38.1561 18.766 37.9202 18.6644 37.6467L14.3225 25.6859L2.3617 21.3368C2.08814 21.2353 1.85221 21.0524 1.6856 20.8129C1.51899 20.5733 1.42969 20.2885 1.42969 19.9967C1.42969 19.7049 1.51899 19.4201 1.6856 19.1805C1.85221 18.941 2.08814 18.7581 2.3617 18.6566L14.3225 14.3147L18.6716 2.35389C18.7731 2.08033 18.9559 1.84439 19.1955 1.67779C19.4351 1.51118 19.7199 1.42188 20.0117 1.42188C20.3035 1.42188 20.5883 1.51118 20.8278 1.67779C21.0674 1.84439 21.2502 2.08033 21.3518 2.35389L25.7008 14.3147L37.6616 18.6637C37.9326 18.7673 38.1656 18.9509 38.3297 19.1901C38.4938 19.4292 38.5813 19.7127 38.5806 20.0027C38.5798 20.2928 38.4908 20.5758 38.3254 20.814C38.16 21.0523 37.926 21.2347 37.6545 21.3368Z"
              fill={trait.color}
            />
            <Path
              d="M38.136 17.3198L26.8005 13.1995L22.6802 1.86403C22.4771 1.3169 22.1114 0.845039 21.6323 0.511822C21.1532 0.178606 20.5836 0 20 0C19.4164 0 18.8468 0.178606 18.3677 0.511822C17.8886 0.845039 17.5229 1.3169 17.3198 1.86403L13.1995 13.1995L1.86403 17.3198C1.3169 17.5229 0.845039 17.8886 0.511822 18.3677C0.178606 18.8468 0 19.4164 0 20C0 20.5836 0.178606 21.1532 0.511822 21.6323C0.845039 22.1114 1.3169 22.4771 1.86403 22.6802L13.1995 26.8023L17.3198 38.136C17.5229 38.6831 17.8886 39.155 18.3677 39.4882C18.8468 39.8214 19.4164 40 20 40C20.5836 40 21.1532 39.8214 21.6323 39.4882C22.1114 39.155 22.4771 38.6831 22.6802 38.136L26.8023 26.8005L38.136 22.6802C38.6831 22.4771 39.155 22.1114 39.4882 21.6323C39.8214 21.1532 40 20.5836 40 20C40 19.4164 39.8214 18.8468 39.4882 18.3677C39.155 17.8886 38.6831 17.5229 38.136 17.3198ZM25.196 24.3419C24.9999 24.4133 24.8219 24.5268 24.6743 24.6743C24.5268 24.8219 24.4133 24.9999 24.3419 25.196L20 37.1354L15.6581 25.196C15.5867 24.9999 15.4732 24.8219 15.3257 24.6743C15.1781 24.5268 15.0001 24.4133 14.804 24.3419L2.86463 20L14.804 15.6581C15.0001 15.5867 15.1781 15.4732 15.3257 15.3257C15.4732 15.1781 15.5867 15.0001 15.6581 14.804L20 2.86463L24.3419 14.804C24.4133 15.0001 24.5268 15.1781 24.6743 15.3257C24.8219 15.4732 24.9999 15.5867 25.196 15.6581L37.1354 20L25.196 24.3419Z"
              fill="white"
            />
          </Svg>
        </Animated.View>
      </StyledView>

      {/* Labels */}
      <StyledView className="flex-row justify-between items-center px-1">
        <StyledText
          className="text-[#7E7E7E] text-[16px] font-normal tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          {trait.leftLabel}
        </StyledText>
        <StyledText
          className="text-[#7E7E7E] text-right text-[16px] font-normal tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Regular" }}
        >
          {trait.rightLabel}
        </StyledText>
      </StyledView>
    </StyledAnimatedView>
  );
}

export default function MBTIResult() {
  const params = useLocalSearchParams();
  const [result, setResult] = useState<PersonalityResult | null>(null);

  useEffect(() => {
    if (params.answers) {
      try {
        const answers: Answer[] = JSON.parse(params.answers as string);
        const calculatedResult = calculatePersonality(answers);
        setResult(calculatedResult);
      } catch (error) {
        console.error("Error parsing answers:", error);
        // Use default INTJ result
        setResult({
          type: "INTJ",
          scores: { EI: -5, SN: -7, TF: -6, JP: -8 },
          percentages: { EI: 51, SN: 79, TF: 75, JP: 86, AT: 54 },
          traits: [],
        } as PersonalityResult);
      }
    }
  }, [params.answers]);

  if (!result) {
    return (
      <StyledView className="flex-1 bg-[#FFF3E9] items-center justify-center">
        <StyledText
          className="text-[#131313] text-[18px] font-medium"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          Loading...
        </StyledText>
      </StyledView>
    );
  }

  const personalityData = getPersonalityData(result.type);

  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      <StyledScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Background Circle */}
        <StyledView
          className="absolute -top-[585px] -left-[290px] w-[982px] h-[982px] rounded-full"
          style={{ backgroundColor: personalityData.backgroundColor }}
        />

        {/* Header Content */}
        <StyledAnimatedView
          entering={FadeIn.duration(600)}
          className="items-center pt-[86px] px-5"
        >
          {/* Personality Type */}
          <StyledText
            className="text-white text-center text-[28px] font-medium tracking-[-0.5px] mb-1"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            {personalityData.title}
          </StyledText>

          <StyledText
            className="text-[#36253F] text-center text-[24px] font-medium tracking-[-0.5px] mb-8"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            {personalityData.code}
          </StyledText>

          {/* Mascot Image */}
          <Image
            source={{ uri: personalityData.mascotImage }}
            style={{ width: 260, height: 260 }}
            resizeMode="contain"
          />

          {/* Divider */}
          <StyledView className="w-full h-[1px] bg-[#7E7E7E] mt-8 mb-6" />

          {/* Description */}
          <StyledView className="w-full mb-6">
            <StyledText
              className="text-[#131313] text-[18px] font-medium tracking-[-0.5px] mb-2"
              style={{ fontFamily: "Poppins-Medium" }}
            >
              {personalityData.subtitle}
            </StyledText>
            <StyledText
              className="text-[#131313] text-[16px] font-normal tracking-[-0.5px] leading-6"
              style={{ fontFamily: "Poppins-Regular" }}
            >
              {personalityData.description}
            </StyledText>
          </StyledView>

          {/* Personality Traits Header */}
          <StyledText
            className="text-[#131313] text-[18px] font-medium tracking-[-0.5px] mb-6 self-start"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Personality Traits
          </StyledText>

          {/* Trait Bars */}
          {result.traits.map((trait, index) => (
            <TraitBar key={trait.dimension} trait={trait} index={index} />
          ))}
        </StyledAnimatedView>
      </StyledScrollView>

      {/* Bottom Button */}
      <StyledAnimatedView
        entering={SlideInDown.delay(800).duration(400)}
        className="absolute bottom-0 left-0 right-0 px-5 pb-16 bg-[#FFF3E9]"
      >
        <StyledTouchableOpacity
          className="h-16 rounded-[30px] bg-[#FF8225] items-center justify-center shadow-inner"
          onPress={() => router.replace("/")}
          activeOpacity={0.8}
        >
          <StyledText
            className="text-white text-[18px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            Continue
          </StyledText>
        </StyledTouchableOpacity>
      </StyledAnimatedView>

      {/* Bottom Circle Decoration */}
      <StyledView
        className="absolute top-[1289px] -left-[299px] w-[1000px] h-[1000px] rounded-full"
        style={{ backgroundColor: "#FFE5D2" }}
      />

      {/* That's it Text */}
      <StyledAnimatedView
        entering={FadeIn.delay(400).duration(600)}
        className="absolute top-[91px] self-center"
      >
        <StyledText
          className="text-[#FF8225] text-center text-[24px] font-medium tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          That's it!
        </StyledText>
      </StyledAnimatedView>
    </StyledView>
  );
}
