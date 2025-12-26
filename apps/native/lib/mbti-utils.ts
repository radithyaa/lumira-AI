import mbtiData from "./mbti-data.json";

export interface Answer {
  questionId: number;
  rating: number; // 1-5
}

export interface DimensionScores {
  EI: number; // Negative = Introvert, Positive = Extrovert
  SN: number; // Negative = Intuitive/Visioner, Positive = Sensing/Observant
  TF: number; // Negative = Thinking/Rational, Positive = Feeling/Emotional
  JP: number; // Negative = Judging, Positive = Perceiving/Prospecting
}

export interface PersonalityResult {
  type: string; // e.g., "INTJ"
  scores: DimensionScores;
  percentages: {
    EI: number; // 0-100, where 50+ is introverted
    SN: number; // 0-100, where 50+ is intuitive
    TF: number; // 0-100, where 50+ is thinking
    JP: number; // 0-100, where 50+ is judging
    AT: number; // Placeholder for assertive/turbulent
  };
  traits: {
    dimension: string;
    percentage: number;
    label: string;
    leftLabel: string;
    rightLabel: string;
    color: string;
  }[];
}

export function calculatePersonality(answers: Answer[]): PersonalityResult {
  // Initialize scores
  const scores: DimensionScores = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  };

  // Calculate scores from answers
  answers.forEach((answer) => {
    const question = mbtiData.questions.find((q) => q.id === answer.questionId);
    if (question) {
      const dimension = question.dimension as keyof DimensionScores;
      const score =
        question.scoring[answer.rating.toString() as "1" | "2" | "3" | "4" | "5"];
      scores[dimension] += score;
    }
  });

  // Determine personality type
  const type =
    (scores.EI <= 0 ? "I" : "E") +
    (scores.SN <= 0 ? "N" : "S") +
    (scores.TF <= 0 ? "T" : "F") +
    (scores.JP <= 0 ? "J" : "P");

  // Calculate percentages (0-100 scale)
  // For each dimension, convert score to percentage
  // Negative score = left trait dominant, Positive = right trait dominant
  const maxScore = 10; // Maximum possible score in each direction
  const percentages = {
    EI: Math.round(((Math.abs(scores.EI) / maxScore) * 50) + 50), // 50-100
    SN: Math.round(((Math.abs(scores.SN) / maxScore) * 50) + 50),
    TF: Math.round(((Math.abs(scores.TF) / maxScore) * 50) + 50),
    JP: Math.round(((Math.abs(scores.JP) / maxScore) * 50) + 50),
    AT: 54, // Placeholder
  };

  // Build traits array for display
  const traits = [
    {
      dimension: "EI",
      percentage: percentages.EI,
      label: scores.EI <= 0 ? "Introvert" : "Extrovert",
      leftLabel: mbtiData.traitLabels.EI.positive,
      rightLabel: mbtiData.traitLabels.EI.negative,
      color: mbtiData.traitLabels.EI.color,
    },
    {
      dimension: "SN",
      percentage: percentages.SN,
      label: scores.SN <= 0 ? "Visioner" : "Observant",
      leftLabel: mbtiData.traitLabels.SN.negative,
      rightLabel: mbtiData.traitLabels.SN.positive,
      color: mbtiData.traitLabels.SN.color,
    },
    {
      dimension: "TF",
      percentage: percentages.TF,
      label: scores.TF <= 0 ? "Rational" : "Emotional",
      leftLabel: mbtiData.traitLabels.TF.negative,
      rightLabel: mbtiData.traitLabels.TF.positive,
      color: mbtiData.traitLabels.TF.color,
    },
    {
      dimension: "JP",
      percentage: percentages.JP,
      label: scores.JP <= 0 ? "Judging" : "Prospecting",
      leftLabel: mbtiData.traitLabels.JP.negative,
      rightLabel: mbtiData.traitLabels.JP.positive,
      color: mbtiData.traitLabels.JP.color,
    },
    {
      dimension: "AT",
      percentage: percentages.AT,
      label: "Assertive",
      leftLabel: mbtiData.traitLabels.AT.negative,
      rightLabel: mbtiData.traitLabels.AT.positive,
      color: mbtiData.traitLabels.AT.color,
    },
  ];

  return {
    type,
    scores,
    percentages,
    traits,
  };
}

export function getPersonalityData(type: string) {
  return (
    mbtiData.personalityTypes[type as keyof typeof mbtiData.personalityTypes] ||
    mbtiData.personalityTypes.INTJ
  );
}

export function getProgress(currentQuestion: number, totalQuestions: number) {
  return Math.round((currentQuestion / totalQuestions) * 100);
}
