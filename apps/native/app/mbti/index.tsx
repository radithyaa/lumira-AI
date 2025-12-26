import { router } from "expo-router";
import { useRef, useState } from "react";
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
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { withUniwind } from "uniwind";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import mbtiData from "@/lib/mbti-data.json";
import type { Answer } from "@/lib/mbti-utils";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);
const StyledAnimatedView = withUniwind(Animated.View);
const StyledScrollView = withUniwind(ScrollView);

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface StarButtonProps {
  rating: number;
  selected: boolean;
  onPress: () => void;
  disabled: boolean;
}

function StarButton({ rating, selected, onPress, disabled }: StarButtonProps) {
  const colors = {
    1: "#6C63FF",
    2: "#6C63FF",
    3: "#7E7E7E",
    4: "#FF8225",
    5: "#FF8225",
  };

  const sizes = {
    1: 47,
    2: 41,
    3: 32,
    4: 41,
    5: 47,
  };

  const color = colors[rating as keyof typeof colors];
  const size = sizes[rating as keyof typeof sizes];

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <Path
          d="M37.6545 21.3368L25.6937 25.6859L21.3446 37.6467C21.2431 37.9202 21.0602 38.1561 20.8207 38.3228C20.5811 38.4894 20.2963 38.5787 20.0045 38.5787C19.7127 38.5787 19.4279 38.4894 19.1884 38.3228C18.9488 38.1561 18.766 37.9202 18.6644 37.6467L14.3225 25.6859L2.3617 21.3368C2.08814 21.2353 1.85221 21.0524 1.6856 20.8129C1.51899 20.5733 1.42969 20.2885 1.42969 19.9967C1.42969 19.7049 1.51899 19.4201 1.6856 19.1805C1.85221 18.941 2.08814 18.7581 2.3617 18.6566L14.3225 14.3147L18.6716 2.35389C18.7731 2.08033 18.9559 1.84439 19.1955 1.67779C19.4351 1.51118 19.7199 1.42188 20.0117 1.42188C20.3035 1.42188 20.5883 1.51118 20.8278 1.67779C21.0674 1.84439 21.2502 2.08033 21.3518 2.35389L25.7008 14.3147L37.6616 18.6637C37.9326 18.7673 38.1656 18.9509 38.3297 19.1901C38.4938 19.4292 38.5813 19.7127 38.5806 20.0027C38.5798 20.2928 38.4908 20.5758 38.3254 20.814C38.16 21.0523 37.926 21.2347 37.6545 21.3368Z"
          fill={selected ? color : "transparent"}
          stroke={color}
          strokeWidth="1.7"
        />
        <Path
          d="M38.136 17.3198L26.8005 13.1995L22.6802 1.86403C22.4771 1.3169 22.1114 0.845039 21.6323 0.511822C21.1532 0.178606 20.5836 0 20 0C19.4164 0 18.8468 0.178606 18.3677 0.511822C17.8886 0.845039 17.5229 1.3169 17.3198 1.86403L13.1995 13.1995L1.86403 17.3198C1.3169 17.5229 0.845039 17.8886 0.511822 18.3677C0.178606 18.8468 0 19.4164 0 20C0 20.5836 0.178606 21.1532 0.511822 21.6323C0.845039 22.1114 1.3169 22.4771 1.86403 22.6802L13.1995 26.8023L17.3198 38.136C17.5229 38.6831 17.8886 39.155 18.3677 39.4882C18.8468 39.8214 19.4164 40 20 40C20.5836 40 21.1532 39.8214 21.6323 39.4882C22.1114 39.155 22.4771 38.6831 22.6802 38.136L26.8023 26.8005L38.136 22.6802C38.6831 22.4771 39.155 22.1114 39.4882 21.6323C39.8214 21.1532 40 20.5836 40 20C40 19.4164 39.8214 18.8468 39.4882 18.3677C39.155 17.8886 38.6831 17.5229 38.136 17.3198ZM25.196 24.3419C24.9999 24.4133 24.8219 24.5268 24.6743 24.6743C24.5268 24.8219 24.4133 24.9999 24.3419 25.196L20 37.1354L15.6581 25.196C15.5867 24.9999 15.4732 24.8219 15.3257 24.6743C15.1781 24.5268 15.0001 24.4133 14.804 24.3419L2.86463 20L14.804 15.6581C15.0001 15.5867 15.1781 15.4732 15.3257 15.3257C15.4732 15.1781 15.5867 15.0001 15.6581 14.804L20 2.86463L24.3419 14.804C24.4133 15.0001 24.5268 15.1781 24.6743 15.3257C24.8219 15.4732 24.9999 15.5867 25.196 15.6581L37.1354 20L25.196 24.3419Z"
          fill="white"
        />
      </Svg>
    </TouchableOpacity>
  );
}

function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  currentAnswer,
  isLocked,
}: {
  question: (typeof mbtiData.questions)[0];
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (rating: number) => void;
  currentAnswer: number | null;
  isLocked: boolean;
}) {
  const blurStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isLocked ? 0.4 : 1, { duration: 300 }),
    };
  });

  return (
    <StyledAnimatedView
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(200)}
      style={blurStyle}
      className="w-full px-5 mb-6"
    >
      <StyledView className="flex-col items-center gap-4">
        <StyledText
          className="text-[#131313] text-center text-[18px] font-medium tracking-[-0.5px]"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          {question.text}
        </StyledText>

        {/* Star Rating */}
        <StyledView className="flex-row items-center justify-between w-full px-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <StarButton
              key={rating}
              rating={rating}
              selected={currentAnswer === rating}
              onPress={() => !isLocked && onAnswer(rating)}
              disabled={isLocked}
            />
          ))}
        </StyledView>

        {/* Labels */}
        <StyledView className="flex-row items-center justify-between w-full">
          <StyledText
            className="text-[#6C63FF] text-[14px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            STRONGLY DISAGREE
          </StyledText>
          <StyledText
            className="text-[#FF8225] text-[14px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            STRONGLY AGREE
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Divider */}
      <StyledView className="h-[0.5px] bg-[#7E7E7E] mt-6" />
    </StyledAnimatedView>
  );
}

export default function MBTITest() {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const section = mbtiData.sections[currentSection];
  const sectionQuestions = mbtiData.questions.filter((_, index) => {
    if (currentSection === 0) return index < 6;
    return index >= 6;
  });
  const currentQuestion = sectionQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  const handleAnswer = (rating: number) => {
    if (!currentQuestion) return;

    // Update or add answer
    const newAnswers = answers.filter(
      (a) => a.questionId !== currentQuestion.id
    );
    newAnswers.push({ questionId: currentQuestion.id, rating });
    setAnswers(newAnswers);

    // Auto advance to next question after 500ms
    setTimeout(() => {
      if (currentQuestionIndex < sectionQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        // Scroll to next question
        scrollViewRef.current?.scrollTo({
          y: (currentQuestionIndex + 1) * 200,
          animated: true,
        });
      } else if (currentSection === 0) {
        // Move to section 2
        setCurrentSection(1);
        setCurrentQuestionIndex(0);
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      } else {
        // All questions answered, navigate to result
        router.push({
          pathname: "/mbti/result",
          params: { answers: JSON.stringify(newAnswers) },
        });
      }
    }, 500);
  };

  const isQuestionLocked = (index: number) => {
    if (index === 0) return false;
    const previousQuestion = sectionQuestions[index - 1];
    return !answers.some((a) => a.questionId === previousQuestion?.id);
  };

  const canProceed =
    answers.length > 0 &&
    answers.some((a) => a.questionId === currentQuestion?.id);

  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      <StyledScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 82, paddingBottom: 100 }}
      >
        {/* Header Section */}
        <StyledView className="px-5 mb-6">
          {/* Title */}
          <StyledText
            className="text-[#131313] text-center text-[24px] font-medium tracking-[-0.5px] mb-3"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            <Text style={{ color: "#FF8225" }}>{section.title}</Text>
            {section.titleHighlight}
          </StyledText>

          {/* Mascot Image */}
          <StyledView className="items-center mb-3">
            <Image
              source={{ uri: section.mascotImage }}
              style={{ width: 190, height: 190 }}
              resizeMode="contain"
            />
          </StyledView>

          {/* Quote */}
          <StyledText
            className="text-[#7E7E7E] text-center text-[16px] font-normal tracking-[-0.5px] italic mb-6"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            {section.quote}
          </StyledText>

          {/* Divider */}
          <StyledView className="h-[1px] bg-[#7E7E7E] mb-6" />
        </StyledView>

        {/* Questions */}
        {sectionQuestions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={index}
            totalQuestions={sectionQuestions.length}
            onAnswer={handleAnswer}
            currentAnswer={
              answers.find((a) => a.questionId === question.id)?.rating || null
            }
            isLocked={isQuestionLocked(index)}
          />
        ))}
      </StyledScrollView>

      {/* Bottom Button */}
      <StyledView className="absolute bottom-0 left-0 right-0 px-5 pb-16 bg-[#FFF3E9]">
        <StyledTouchableOpacity
          className={`h-16 rounded-[30px] items-center justify-center shadow-inner ${
            canProceed ? "bg-[#FF8225]" : "bg-[#7E7E7E]"
          }`}
          onPress={() => {
            if (currentSection === 0 && currentQuestionIndex === sectionQuestions.length - 1) {
              setCurrentSection(1);
              setCurrentQuestionIndex(0);
              scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            } else if (currentSection === 1 && answers.length === mbtiData.questions.length) {
              router.push({
                pathname: "/mbti/result",
                params: { answers: JSON.stringify(answers) },
              });
            }
          }}
          disabled={!canProceed}
          activeOpacity={0.8}
        >
          <StyledText
            className="text-white text-[18px] font-medium tracking-[-0.5px]"
            style={{ fontFamily: "Poppins-Medium" }}
          >
            {currentSection === 0 ? "Next" : answers.length === mbtiData.questions.length ? "See My Result" : "Next"}
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
