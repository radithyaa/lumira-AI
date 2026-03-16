import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Svg, { Circle, Path, G, Defs, Filter, FeFlood, FeBlend, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, ClipPath, Rect } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

type Mode = "pomodoro" | "short-break" | "long-break";

const MODE_CONFIG: Record<Mode, { label: string; duration: number; color: string; trackColor: string; subtitle: string }> = {
  pomodoro: {
    label: "Pomodoro",
    duration: 25 * 60,
    color: "#FF8225",
    trackColor: "#FFD5A8",
    subtitle: "Active mode: ON",
  },
  "short-break": {
    label: "Short Break",
    duration: 5 * 60,
    color: "#6C63FF",
    trackColor: "#C2CAFF",
    subtitle: "Quick break time!",
  },
  "long-break": {
    label: "Long Break",
    duration: 15 * 60,
    color: "#6C63FF",
    trackColor: "#C2CAFF",
    subtitle: "Enjoy your break!",
  },
};

const CIRCLE_RADIUS = 112.5;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return {
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
  };
}

function VideoIcon() {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path
        d="M22.125 26.6689C20.66 26.8748 18.7495 26.8748 16.1875 26.8748H13.8125C8.77436 26.8748 6.2553 26.8748 4.69015 25.3096C3.125 23.7445 3.125 21.2254 3.125 16.1873V13.8123C3.125 8.77412 3.125 6.25505 4.69015 4.6899C6.2553 3.12476 8.77436 3.12476 13.8125 3.12476H16.1875C21.2256 3.12476 23.7447 3.12476 25.3099 4.6899C26.875 6.25505 26.875 8.77412 26.875 13.8123V16.1873C26.875 17.6975 26.875 18.9814 26.8328 20.0811C26.7991 20.9624 26.7822 21.4031 26.4484 21.5677C26.1147 21.7324 25.7414 21.4683 24.9947 20.94L23.3125 19.7498"
        stroke="white" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"
      />
      <Path
        d="M18.6816 15.4935C18.4607 16.2769 17.4167 16.8305 15.3286 17.9377C13.31 19.008 12.3008 19.5432 11.4874 19.3281C11.1511 19.2392 10.8447 19.0702 10.5977 18.8376C10 18.2748 10 17.1832 10 15C10 12.8168 10 11.7252 10.5977 11.1624C10.8447 10.9298 11.1511 10.7608 11.4874 10.6719C12.3008 10.4568 13.31 10.992 15.3286 12.0623C17.4167 13.1695 18.4607 13.7231 18.6816 14.5065C18.7728 14.8299 18.7728 15.1701 18.6816 15.4935Z"
        stroke="white" strokeWidth="1.875" strokeLinejoin="round"
      />
    </Svg>
  );
}

function TimerRing({ progress, color, trackColor }: { progress: number; color: string; trackColor: string }) {
  const dashOffset = CIRCUMFERENCE * (1 - progress);
  return (
    <Svg width="240" height="240" viewBox="0 0 240 240" fill="none">
      {/* Track circle */}
      <Circle
        cx="120"
        cy="120"
        r={CIRCLE_RADIUS}
        stroke={trackColor}
        strokeWidth="15"
        fill="none"
      />
      {/* Progress arc */}
      <Circle
        cx="120"
        cy="120"
        r={CIRCLE_RADIUS}
        stroke={color}
        strokeWidth="15"
        fill="none"
        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        rotation="-90"
        origin="120, 120"
      />
    </Svg>
  );
}

export default function PomodoroPage() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [isRunning, setIsRunning] = useState(false);
  const [remaining, setRemaining] = useState(MODE_CONFIG.pomodoro.duration);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const config = MODE_CONFIG[mode];
  const totalDuration = config.duration;
  const progress = remaining / totalDuration;
  const { minutes, seconds } = formatTime(remaining);

  function switchMode(newMode: Mode) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setMode(newMode);
    setRemaining(MODE_CONFIG[newMode].duration);
  }

  function handlePlayPause() {
    setIsRunning((prev) => !prev);
  }

  function handleReset() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setRemaining(config.duration);
  }

  function handleNext() {
    if (mode === "pomodoro") {
      switchMode("short-break");
    } else {
      switchMode("pomodoro");
    }
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Reset timer when mode changes
  useEffect(() => {
    setRemaining(config.duration);
  }, [mode]);

  const tabBg = (m: Mode) => mode === m ? config.color : "transparent";
  const tabTextColor = (m: Mode) => mode === m ? "#FFF" : "#131313";

  return (
    <SafeAreaView className="flex-1 bg-[#FFF3E9]">
      {/* Header */}
      <View className="flex-row items-center justify-center px-5 pt-2 pb-4">
        <TouchableOpacity className="absolute left-5" onPress={() => router.back()}>
          <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <Path
              d="M20.5839 5.4165L5.41724 20.5832M5.41724 5.4165L20.5839 20.5832"
              stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text className="font-medium text-black text-xl tracking-tight">Pomodoro</Text>
      </View>

      {/* Task Card */}
      <View
        className="mx-5 mb-4 flex-row items-center rounded-[20px] bg-white px-4 py-0"
        style={{
          height: 64,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="h-[46px] w-[46px] items-center justify-center rounded-full bg-[#FF8225]">
          <VideoIcon />
        </View>
        <View className="ml-3 flex-1">
          <Text className="font-medium text-black text-sm">Visual Effects</Text>
          <View className="mt-0.5 flex-row items-center gap-1">
            <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <Path
                d="M7.99992 5.33325V8.66659L9.99992 9.99992M11.2022 1.33325C12.6179 1.95233 13.8198 2.96933 14.6666 4.24286M1.33325 4.24286C2.18 2.96933 3.38194 1.95233 4.79764 1.33325M13.9999 14.6666L12.5047 12.6666M1.99992 14.6666L3.49506 12.6666M13.9999 8.66659C13.9999 11.9803 11.3136 14.6666 7.99992 14.6666C4.68621 14.6666 1.99992 11.9803 1.99992 8.66659C1.99992 5.35288 4.68621 2.66659 7.99992 2.66659C11.3136 2.66659 13.9999 5.35288 13.9999 8.66659Z"
                stroke="#7E7E7E" strokeLinecap="round" strokeLinejoin="round"
              />
            </Svg>
            <Text className="font-normal text-[#7E7E7E] text-xs">5/6 - 0/150 mins</Text>
          </View>
        </View>
        <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <Path
            d="M6.5 9.75L12.234 15.484C12.5951 15.8451 12.7756 16.0256 13 16.0256C13.2244 16.0256 13.4049 15.8451 13.766 15.484L19.5 9.75"
            stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
        </Svg>
      </View>

      {/* Focus Card */}
      <View
        className="mx-5 rounded-[20px] bg-white px-4 pt-4 pb-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.18,
          shadowRadius: 4,
          elevation: 4,
        }}
      >
        {/* Mode Tabs */}
        <View className="mb-6 flex-row">
          {(["pomodoro", "short-break", "long-break"] as Mode[]).map((m) => (
            <TouchableOpacity
              key={m}
              className="flex-1 items-center justify-center rounded-[10px] py-2"
              style={{ backgroundColor: tabBg(m) }}
              onPress={() => switchMode(m)}
            >
              <Text
                className="font-medium text-base tracking-tight"
                style={{ color: tabTextColor(m) }}
              >
                {MODE_CONFIG[m].label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Timer Ring */}
        <View className="items-center mb-6">
          <View className="items-center justify-center" style={{ width: 240, height: 240 }}>
            <TimerRing progress={progress} color={config.color} trackColor={config.trackColor} />
            {/* Inner content */}
            <View className="absolute items-center justify-center" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              {/* Hourglass icon */}
              <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginBottom: 8 }}>
                <Path
                  d="M19 2V5C19 8.86599 15.866 12 12 12M5 2V5C5 8.86599 8.13401 12 12 12M12 12C15.866 12 19 15.134 19 19V22M12 12C8.13401 12 5 15.134 5 19V22"
                  stroke="#131313" strokeWidth="1.5"
                />
                <Path d="M4 2H20M20 22H4" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" />
              </Svg>
              {/* Time display */}
              <Text
                className="font-semibold text-[#131313] tracking-tight"
                style={{ fontSize: 52, lineHeight: 60 }}
              >
                {minutes}:{seconds}
              </Text>
              {/* Subtitle */}
              <Text className="font-normal text-[#7E7E7E] text-sm mt-1">
                {config.subtitle}
              </Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        {isRunning ? (
          <View className="flex-row items-center justify-center gap-4">
            {/* Reset */}
            <TouchableOpacity
              className="h-[46px] w-[46px] items-center justify-center rounded-full"
              style={{ backgroundColor: "#FFECD4" }}
              onPress={handleReset}
            >
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M20.2264 2.02173V5.18791C20.2264 5.48496 19.855 5.61943 19.6648 5.39123C17.8139 3.3232 15.124 2.02173 12.1302 2.02173C6.54746 2.02173 2.02173 6.54746 2.02173 12.1302C2.02173 17.713 6.54746 22.2388 12.1302 22.2388C17.713 22.2388 22.2388 17.713 22.2388 12.1302"
                  stroke={config.color} strokeWidth="1.51628" strokeLinecap="round" strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {/* Pause */}
            <TouchableOpacity
              className="h-[58px] w-[58px] items-center justify-center rounded-full border-2"
              style={{ backgroundColor: "#FFF", borderColor: config.color }}
              onPress={handlePlayPause}
            >
              <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
                <Path
                  d="M4.81665 8.42911C4.81665 6.72618 4.81665 5.87472 5.34568 5.34568C5.87472 4.81665 6.72618 4.81665 8.42911 4.81665C10.132 4.81665 10.9835 4.81665 11.5125 5.34568C12.0416 5.87472 12.0416 6.72618 12.0416 8.42911V20.4707C12.0416 22.1736 12.0416 23.0251 11.5125 23.5541C10.9835 24.0831 10.132 24.0831 8.42911 24.0831C6.72618 24.0831 5.87472 24.0831 5.34568 23.5541C4.81665 23.0251 4.81665 22.1736 4.81665 20.4707V8.42911Z"
                  fill={config.color}
                />
                <Path
                  d="M16.8582 8.42911C16.8582 6.72618 16.8582 5.87472 17.3872 5.34568C17.9162 4.81665 18.7677 4.81665 20.4706 4.81665C22.1735 4.81665 23.025 4.81665 23.554 5.34568C24.0831 5.87472 24.0831 6.72618 24.0831 8.42911V20.4707C24.0831 22.1736 24.0831 23.0251 23.554 23.5541C23.025 24.0831 22.1735 24.0831 20.4706 24.0831C18.7677 24.0831 17.9162 24.0831 17.3872 23.5541C16.8582 23.0251 16.8582 22.1736 16.8582 20.4707V8.42911Z"
                  fill={config.color}
                />
              </Svg>
            </TouchableOpacity>

            {/* Next */}
            <TouchableOpacity
              className="h-[46px] w-[46px] items-center justify-center rounded-full"
              style={{ backgroundColor: "#FFECD4" }}
              onPress={handleNext}
            >
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M16.2629 12.8854C16.0033 14.1221 14.6218 15.0102 11.8588 16.7865C8.85375 18.7184 7.35121 19.6843 6.13416 19.3122C5.72196 19.1861 5.34231 18.9645 5.02352 18.6638C4.08228 17.776 4.08228 15.933 4.08228 12.2468C4.08228 8.56066 4.08228 6.71758 5.02352 5.82979C5.34231 5.52911 5.72196 5.30748 6.13416 5.18144C7.35121 4.80929 8.85375 5.77524 11.8588 7.70715C14.6218 9.48343 16.0033 10.3716 16.2629 11.6082C16.3513 12.0289 16.3513 12.4647 16.2629 12.8854Z"
                  stroke={config.color} strokeWidth="1.53086" strokeLinejoin="round"
                />
                <Path d="M20.4114 5.10278V19.3908" stroke={config.color} strokeWidth="1.53086" strokeLinecap="round" />
              </Svg>
            </TouchableOpacity>
          </View>
        ) : (
          /* Play button */
          <View className="items-center">
            <TouchableOpacity
              className="h-[58px] w-[58px] items-center justify-center rounded-full"
              style={{ backgroundColor: config.color }}
              onPress={handlePlayPause}
            >
              <Svg width="29" height="29" viewBox="0 0 29 29" fill="none">
                <Path
                  d="M22.7473 15.4686C22.3217 17.0858 20.3102 18.2286 16.2871 20.5142C12.3981 22.7236 10.4535 23.8284 8.88646 23.3843C8.23858 23.2007 7.64829 22.852 7.17223 22.3717C6.02075 21.21 6.02075 18.9566 6.02075 14.4499C6.02075 9.94322 6.02075 7.68987 7.17223 6.52812C7.64829 6.04781 8.23858 5.69913 8.88646 5.51554C10.4535 5.07148 12.3981 6.17621 16.2871 8.38567C20.3102 10.6712 22.3217 11.814 22.7473 13.4312C22.9229 14.0988 22.9229 14.8011 22.7473 15.4686Z"
                  fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Toolbar */}
      <View
        className="mx-5 mt-4 flex-row items-center justify-around rounded-[20px] bg-white px-4"
        style={{
          height: 81,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.08,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        {/* Strict Mode */}
        <TouchableOpacity className="items-center gap-2 py-3" style={{ width: 68 }}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Circle cx="13.9999" cy="13.9999" r="11.6667" stroke="#131313" strokeWidth="1.75" />
            <Path d="M13.9905 17.5H14.001" stroke="#131313" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M14 14L14 9.33333" stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text className="font-normal text-[#131313] text-xs text-center">Strict Mode</Text>
        </TouchableOpacity>

        {/* Timer Mode */}
        <TouchableOpacity className="items-center gap-2 py-3" style={{ width: 71 }}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Path d="M20.9999 6.41667L22.1666 5.25M5.83325 5.25L6.99992 6.41667" stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <Circle cx="14" cy="15.1665" r="10.5" stroke="#131313" strokeWidth="1.75" strokeLinecap="round" />
            <Path d="M14 11.0833V15.7499L16.3333 18.0833" stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M14 4.08325V2.33325" stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <Path d="M11.6667 2.33325H16.3334" stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
          <Text className="font-normal text-[#131313] text-xs text-center">Timer Mode</Text>
        </TouchableOpacity>

        {/* Full Screen */}
        <TouchableOpacity className="items-center gap-2 py-3" style={{ width: 65 }}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Path d="M18.0741 25.6552C17.5957 25.6552 17.1991 25.2586 17.1991 24.7802C17.1991 24.3019 17.5957 23.9052 18.0741 23.9052C19.6141 23.9052 20.3841 23.9052 20.9324 23.7419C21.5293 23.5592 22.0723 23.2329 22.5137 22.7915C22.955 22.3501 23.2814 21.8071 23.4641 21.2102C23.6274 20.6736 23.6274 19.9036 23.6274 18.3636C23.6274 17.8852 24.0241 17.4886 24.5024 17.4886C24.9807 17.4886 25.3774 17.8852 25.3774 18.3636C25.3774 20.0669 25.3774 20.9302 25.1441 21.7119C24.8797 22.5852 24.4038 23.3796 23.7586 24.0248C23.1135 24.67 22.319 25.1459 21.4457 25.4102C20.6524 25.6436 19.7891 25.6436 18.0857 25.6436L18.0741 25.6552ZM9.90739 25.6552C8.20406 25.6552 7.34072 25.6552 6.55906 25.4219C5.68579 25.1575 4.8913 24.6816 4.24614 24.0365C3.60097 23.3913 3.12508 22.5968 2.86072 21.7236C2.62739 20.9302 2.62739 20.0669 2.62739 18.3636C2.62739 17.8852 3.02406 17.4886 3.50239 17.4886C3.98072 17.4886 4.37739 17.8852 4.37739 18.3636C4.37739 19.9036 4.37739 20.6736 4.54072 21.2219C4.72338 21.8188 5.04973 22.3618 5.49112 22.8032C5.93252 23.2446 6.47548 23.5709 7.07239 23.7536C7.60906 23.9169 8.37906 23.9169 9.91906 23.9169C10.3974 23.9169 10.7941 24.3136 10.7941 24.7919C10.7941 25.2702 10.3974 25.6669 9.91906 25.6669L9.90739 25.6552ZM24.4907 11.0719C24.0124 11.0719 23.6157 10.6752 23.6157 10.1969C23.6157 8.65689 23.6157 7.88689 23.4524 7.33855C23.2697 6.74165 22.9434 6.19868 22.502 5.75729C22.0606 5.31589 21.5176 4.98955 20.9207 4.80689C20.3841 4.64355 19.6141 4.64355 18.0741 4.64355C17.5957 4.64355 17.1991 4.24689 17.1991 3.76855C17.1991 3.29022 17.5957 2.89355 18.0741 2.89355C19.7774 2.89355 20.6407 2.89355 21.4224 3.12689C22.2957 3.39125 23.0901 3.86713 23.7353 4.5123C24.3805 5.15747 24.8564 5.95195 25.1207 6.82522C25.3541 7.61856 25.3541 8.48189 25.3541 10.1852C25.3541 10.6636 24.9574 11.0602 24.4791 11.0602L24.4907 11.0719ZM3.49072 11.0719C3.01239 11.0719 2.61572 10.6752 2.61572 10.1969C2.61572 8.49355 2.61572 7.63022 2.84906 6.84855C3.11341 5.97529 3.5893 5.1808 4.23447 4.53563C4.87964 3.89047 5.67412 3.41458 6.54739 3.15022C7.34072 2.91689 8.20406 2.91689 9.90739 2.91689C10.3857 2.91689 10.7824 3.31355 10.7824 3.79189C10.7824 4.27022 10.3857 4.66689 9.90739 4.66689C8.36739 4.66689 7.59739 4.66689 7.04906 4.83022C6.45215 5.01288 5.90919 5.33923 5.46779 5.78062C5.02639 6.22202 4.70005 6.76498 4.51739 7.36189C4.35406 7.89855 4.35406 8.66855 4.35406 10.2086C4.35406 10.6869 3.95739 11.0836 3.47906 11.0836L3.49072 11.0719Z" fill="#131313" />
          </Svg>
          <Text className="font-normal text-[#131313] text-xs text-center">Full Screen</Text>
        </TouchableOpacity>

        {/* White Noise */}
        <TouchableOpacity className="items-center gap-2 py-3" style={{ width: 71 }}>
          <Svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <Circle cx="7.58333" cy="21.5833" r="4.08333" stroke="#131313" strokeWidth="1.75" />
            <Circle cx="21" cy="18.6665" r="3.5" stroke="#131313" strokeWidth="1.75" />
            <Path
              d="M11.6667 21.5833L11.6667 8.16659C11.6667 7.08923 11.6667 6.55055 11.9741 6.21585C12.2815 5.88115 12.8538 5.83232 13.9984 5.73466C18.6924 5.33418 22.0606 3.80331 23.7479 2.81133C24.0927 2.60859 24.2652 2.50722 24.3826 2.57442C24.5001 2.64162 24.5001 2.83667 24.5001 3.22676V18.6666"
              stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            />
            <Path
              d="M11.6667 11.6665C18.5112 11.6665 23.0742 8.94428 24.5001 8.1665"
              stroke="#131313" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
            />
          </Svg>
          <Text className="font-normal text-[#131313] text-xs text-center">White Noise</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
