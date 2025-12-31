import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  SlideInDown,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { withUniwind } from "uniwind";
import {
  type Answer,
  calculatePersonality,
  getPersonalityData,
  type PersonalityResult,
} from "@/app/(start)/mbti/_lib/mbti-utils";

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
  const barPosition =
    ((trait.percentage - 50) / 50) * ((SCREEN_WIDTH - 60) / 2);

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
      className="mb-6 w-full"
      entering={FadeIn.delay(index * 150).duration(400)}
    >
      {/* Percentage Label */}
      <StyledText className="mb-2 text-center font-normal text-[#131313] text-[16px] tracking-[-0.5px]">
        <Text>{trait.percentage}%</Text> {trait.label}
      </StyledText>

      {/* Bar with Star */}
      <StyledView className="relative mb-2 h-[50px]">
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
          <Svg fill="none" height={40} viewBox="0 0 40 40" width={40}>
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
      <StyledView className="flex-row items-center justify-between px-1">
        <StyledText className="font-normal text-[#7E7E7E] text-[16px] tracking-[-0.5px]">
          {trait.leftLabel}
        </StyledText>
        <StyledText className="text-right font-normal text-[#7E7E7E] text-[16px] tracking-[-0.5px]">
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
      <StyledView className="flex-1 items-center justify-center bg-[#FFF3E9]">
        <StyledText className="font-medium text-[#131313] text-[18px]">
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
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Circle */}
        <StyledView
          className="absolute -top-[585px] -left-[290px] h-[982px] w-[982px] rounded-full"
          style={{ backgroundColor: personalityData.backgroundColor }}
        />

        {/* Header Content */}
        <StyledAnimatedView
          className="items-center px-5 pt-[86px]"
          entering={FadeIn.duration(600)}
        >
          {/* Personality Type */}
          <StyledText className="mb-1 text-center font-medium text-[28px] text-white tracking-[-0.5px]">
            {personalityData.title}
          </StyledText>

          <StyledText className="mb-8 text-center font-medium text-[#36253F] text-[24px] tracking-[-0.5px]">
            {personalityData.code}
          </StyledText>

          {/* Mascot Image */}
          <Image
            resizeMode="contain"
            source={{ uri: personalityData.mascotImage }}
            style={{ width: 260, height: 260 }}
          />

          {/* Divider */}
          <StyledView className="mt-8 mb-6 h-[1px] w-full bg-[#7E7E7E]" />

          {/* Description */}
          <StyledView className="mb-6 w-full">
            <StyledText className="mb-2 font-medium text-[#131313] text-[18px] tracking-[-0.5px]">
              {personalityData.subtitle}
            </StyledText>
            <StyledText className="font-normal text-[#131313] text-[16px] leading-6 tracking-[-0.5px]">
              {personalityData.description}
            </StyledText>
          </StyledView>

          {/* Personality Traits Header */}
          <StyledText className="mb-6 self-start font-medium text-[#131313] text-[18px] tracking-[-0.5px]">
            Personality Traits
          </StyledText>

          {/* Trait Bars */}
          {result.traits.map((trait, index) => (
            <TraitBar index={index} key={trait.dimension} trait={trait} />
          ))}
        </StyledAnimatedView>
      </StyledScrollView>

      {/* Bottom Button */}
      <StyledAnimatedView
        className="absolute right-0 bottom-0 left-0 bg-[#FFF3E9] px-5 pb-16"
        entering={SlideInDown.delay(800).duration(400)}
      >
        <StyledTouchableOpacity
          activeOpacity={0.8}
          className="h-16 items-center justify-center rounded-[30px] bg-[#FF8225] shadow-inner"
          onPress={() => router.replace("/")}
        >
          <StyledText className="font-medium text-[18px] text-white tracking-[-0.5px]">
            Continue
          </StyledText>
        </StyledTouchableOpacity>
      </StyledAnimatedView>

      {/* Bottom Circle Decoration */}
      <StyledView
        className="absolute top-[1289px] -left-[299px] h-[1000px] w-[1000px] rounded-full"
        style={{ backgroundColor: "#FFE5D2" }}
      />
    </StyledView>
  );
}
