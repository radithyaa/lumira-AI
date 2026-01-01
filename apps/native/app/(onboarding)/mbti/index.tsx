import { router } from "expo-router";
import { useRef, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { withUniwind } from "uniwind";
import type { Answer } from "@/app/(start)/mbti/_lib/mbti-utils";
import mbtiData from "./_lib/mbti-data.json";

const StyledView = withUniwind(View);
const StyledText = withUniwind(Text);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);
const StyledAnimatedView = withUniwind(Animated.View);
const StyledScrollView = withUniwind(ScrollView);

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
    <TouchableOpacity activeOpacity={0.7} disabled={disabled} onPress={onPress}>
      <Svg fill="none" height={size} viewBox="0 0 40 40" width={size}>
        <Path
          d="M37.6545 21.3368L25.6937 25.6859L21.3446 37.6467C21.2431 37.9202 21.0602 38.1561 20.8207 38.3228C20.5811 38.4894 20.2963 38.5787 20.0045 38.5787C19.7127 38.5787 19.4279 38.4894 19.1884 38.3228C18.9488 38.1561 18.766 37.9202 18.6644 37.6467L14.3225 25.6859L2.3617 21.3368C2.08814 21.2353 1.85221 21.0524 1.6856 20.8129C1.51899 20.5733 1.42969 20.2885 1.42969 19.9967C1.42969 19.7049 1.51899 19.4201 1.6856 19.1805C1.85221 18.941 2.08814 18.7581 2.3617 18.6566L14.3225 14.3147L18.6716 2.35389C18.7731 2.08033 18.9559 1.84439 19.1955 1.67779C19.4351 1.51118 19.7199 1.42188 20.0117 1.42188C20.3035 1.42188 20.5883 1.51118 20.8278 1.67779C21.0674 1.84439 21.2502 2.08033 21.3518 2.35389L25.7008 14.3147L37.6616 18.6637C37.9326 18.7673 38.1656 18.9509 38.3297 19.1901C38.4938 19.4292 38.5813 19.7127 38.5806 20.0027C38.5798 20.2928 38.4908 20.5758 38.3254 20.814C38.16 21.0523 37.926 21.2347 37.6545 21.3368Z"
          fill={selected ? color : "transparent"}
          stroke={color}
          strokeWidth="1.7"
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
      className="mb-6 w-full px-5"
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(200)}
      style={blurStyle}
    >
      <StyledView className="flex-col items-center gap-4">
        <StyledText className="text-center font-medium text-[18px] text-black tracking-[-0.5px]">
          {question.text}
        </StyledText>

        {/* Star Rating */}
        <StyledView className="w-full flex-row items-center justify-between px-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <StarButton
              disabled={isLocked}
              key={rating}
              onPress={() => !isLocked && onAnswer(rating)}
              rating={rating}
              selected={currentAnswer === rating}
            />
          ))}
        </StyledView>

        {/* Labels */}
        <StyledView className="w-full flex-row items-center justify-between">
          <StyledText className="font-medium text-[#6C63FF] text-[14px] tracking-[-0.5px]">
            STRONGLY DISAGREE
          </StyledText>
          <StyledText className="font-medium text-[#FF8225] text-[14px] tracking-[-0.5px]">
            STRONGLY AGREE
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Divider */}
      <StyledView className="mt-6 h-[0.5px] bg-[#7E7E7E]" />
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
    if (currentSection === 0) {
      return index < 6;
    }
    return index >= 6;
  });
  const currentQuestion = sectionQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  const handleAnswer = (rating: number) => {
    if (!currentQuestion) {
      return;
    }

    const newAnswers = answers.filter(
      (a) => a.questionId !== currentQuestion.id
    );
    newAnswers.push({ questionId: currentQuestion.id, rating });
    setAnswers(newAnswers);

    // Auto-scroll ke soal berikutnya DALAM SECTION
    setTimeout(() => {
      if (currentQuestionIndex < sectionQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        scrollViewRef.current?.scrollTo({
          y: (currentQuestionIndex + 1) * 350,
          animated: true,
        });
      }
    }, 600);
  };

  const isQuestionLocked = (index: number) => {
    if (index === 0) {
      return false;
    }
    const previousQuestion = sectionQuestions[index - 1];
    return !answers.some((a) => a.questionId === previousQuestion?.id);
  };

  const canProceed =
    answers.length > 0 &&
    answers.some((a) => a.questionId === currentQuestion?.id);
  const isAnswerLocked = (questionId: string) => {
    return answers.some((a) => a.questionId === questionId);
  };

  return (
    <StyledView className="flex-1 bg-[#FFF3E9]">
      <StyledScrollView
        className="flex-1"
        contentContainerStyle={{ paddingTop: 82, paddingBottom: 100 }}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <StyledView className="mb-6 px-5">
          {/* Title */}
          <StyledText className="mb-3 text-nowrap text-center font-medium text-[24px] text-black tracking-[-0.5px]">
            <Text className="text-nowrap" style={{ color: "#FF8225" }}>
              {section.title}
            </Text>
            {section.titleHighlight}
          </StyledText>

          {/* Mascot Image */}
          <StyledView className="mb-3 items-center">
            <Image
              resizeMode="contain"
              source={{ uri: section.mascotImage }}
              style={{ width: 190, height: 190 }}
            />
          </StyledView>

          {/* Quote */}
          <StyledText className="mb-6 flex max-w-76 self-center text-center font-normal text-[#7E7E7E] text-[16px] italic leading-6 tracking-[-0.5px]">
            {section.quote}
          </StyledText>

          {/* Divider */}
          <StyledView className="mb-6 h-[1px] bg-[#7E7E7E]" />
        </StyledView>

        {/* Questions */}
        {sectionQuestions.map((question, index) => {
          const isSequentiallyLocked = isQuestionLocked(index);
          const isAlreadyAnswered = isAnswerLocked(question.id);

          return (
            <QuestionCard
              currentAnswer={
                answers.find((a) => a.questionId === question.id)?.rating ||
                null
              }
              isLocked={isSequentiallyLocked || isAlreadyAnswered}
              key={question.id}
              onAnswer={handleAnswer}
              question={question}
              questionIndex={index}
              totalQuestions={sectionQuestions.length}
            />
          );
        })}
      </StyledScrollView>

      {/* Bottom Button */}
      <StyledView className="absolute right-0 bottom-0 left-0 bg-[#FFF3E9] px-5 pb-16">
        <StyledTouchableOpacity
          activeOpacity={0.8}
          className={`h-16 items-center justify-center rounded-[30px] shadow-inner ${
            canProceed ? "bg-[#FF8225]" : "bg-[#7E7E7E]"
          }`}
          disabled={!canProceed}
          onPress={() => {
            if (
              currentSection === 0 &&
              currentQuestionIndex === sectionQuestions.length - 1
            ) {
              setCurrentSection(1);
              setCurrentQuestionIndex(0);
              scrollViewRef.current?.scrollTo({ y: 0, animated: true });
            } else if (
              currentSection === 1 &&
              answers.length === mbtiData.questions.length
            ) {
              router.push({
                pathname: "/mbti/result",
                params: { answers: JSON.stringify(answers) },
              });
            }
          }}
        >
          <StyledText className="font-medium text-[18px] text-white tracking-[-0.5px]">
            {currentSection === 0
              ? "Next"
              : answers.length === mbtiData.questions.length
                ? "See My Result"
                : "Next"}
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
}
