import { useRouter } from "expo-router";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Icon } from "@/components/ui/icon";

const screenWidth = Dimensions.get("window").width;

type DurationType = "weekly" | "monthly" | "yearly";

// Dummy data untuk chart berdasarkan durasi
const CHART_DATA = {
  weekly: {
    labels: ["15", "16", "17", "18", "19", "20", "21"],
    datasets: [
      {
        data: [5, 7, 4, 5, 6.5, 8, 0.5],
      },
    ],
    focusTime: "40 hr",
    avgFocusTime: "5.2 hr",
    sessions: 67,
  },
  monthly: {
    labels: ["W1", "W2", "W3", "W4"],
    datasets: [
      {
        data: [25, 30, 28, 32],
      },
    ],
    focusTime: "115 hr",
    avgFocusTime: "28.8 hr",
    sessions: 245,
  },
  yearly: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [120, 135, 125, 140, 138, 145],
      },
    ],
    focusTime: "803 hr",
    avgFocusTime: "133.8 hr",
    sessions: 1456,
  },
};

// Dummy heatmap data
const HEATMAP_HOURS = ["6 AM", "9 AM", "12 AM", "3 PM", "5 PM", "7 PM"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HEATMAP_COLORS = ["#FFECD4", "#FFD5A8", "#FFB771", "#FF8225"];

const generateHeatmapData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(Math.floor(Math.random() * 4));
    }
    data.push(row);
  }
  return data;
};

export default function ReportPage() {
  const router = useRouter();
  const [duration, setDuration] = useState<DurationType>("weekly");
  const [showDurationMenu, setShowDurationMenu] = useState(false);
  const [heatmapDuration, setHeatmapDuration] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [showHeatmapMenu, setShowHeatmapMenu] = useState(false);
  const [heatmapData] = useState(generateHeatmapData());

  const currentData = CHART_DATA[duration];

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 130, 37, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(126, 126, 126, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#E5E5E5",
      strokeWidth: 1,
    },
    fillShadowGradient: "#FFD5A8",
    fillShadowGradientOpacity: 1,
  };

  return (
    <ScrollView className="flex-1 bg-[#FFF3E9]">
      <View className="px-5 pt-14 pb-6">
        {/* Header */}
        <View className="relative mb-6 flex-row items-center justify-center">
          <TouchableOpacity
            className="absolute left-0"
            onPress={() => router.back()}
          >
            <Icon as={ChevronLeft} color="#141B34" size={26} />
          </TouchableOpacity>
          <Text className="font-medium text-black text-xl">Report</Text>
        </View>

        {/* Focus Time Chart */}
        <View className="mb-6 rounded-2xl bg-white p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-medium text-black text-lg">Focus Time</Text>
            <TouchableOpacity
              className="flex-row items-center rounded-full bg-white px-3 py-1.5 shadow-sm"
              onPress={() => setShowDurationMenu(!showDurationMenu)}
            >
              <Text className="mr-1 font-normal text-black text-sm">
                {duration === "weekly"
                  ? "Weekly"
                  : duration === "monthly"
                    ? "Monthly"
                    : "Yearly"}
              </Text>
              <Icon as={ChevronDown} color="#131313" size={16} />
            </TouchableOpacity>
          </View>

          {showDurationMenu && (
            <View className="absolute top-16 right-4 z-10 rounded-xl bg-white p-2 shadow-lg">
              {(["weekly", "monthly", "yearly"] as DurationType[]).map(
                (type) => (
                  <TouchableOpacity
                    className="px-4 py-2"
                    key={type}
                    onPress={() => {
                      setDuration(type);
                      setShowDurationMenu(false);
                    }}
                  >
                    <Text className="font-normal text-black text-sm capitalize">
                      {type}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}

          {/* Stats */}
          <View className="mb-4 flex-row justify-between">
            <View className="items-center">
              <Text className="mb-1 font-normal text-[#7E7E7E] text-sm">
                Focus Time
              </Text>
              <Text className="font-medium text-black text-xl">
                {currentData.focusTime}
              </Text>
            </View>
            <View className="h-12 w-px bg-[#7E7E7E] opacity-40" />
            <View className="items-center">
              <Text className="mb-1 font-normal text-[#7E7E7E] text-sm">
                Avg Focus Time
              </Text>
              <Text className="font-medium text-black text-xl">
                {currentData.avgFocusTime}
              </Text>
            </View>
            <View className="h-12 w-px bg-[#7E7E7E] opacity-40" />
            <View className="items-center">
              <Text className="mb-1 font-normal text-[#7E7E7E] text-sm">
                Sessions
              </Text>
              <Text className="font-medium text-black text-xl">
                {currentData.sessions}
              </Text>
            </View>
          </View>

          {/* Chart */}
          <BarChart
            chartConfig={chartConfig}
            data={currentData}
            fromZero
            height={220}
            showValuesOnTopOfBars={false}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            width={screenWidth - 72}
            yAxisSuffix="h"
          />
        </View>

        {/* Heatmap */}
        <View className="rounded-2xl bg-white p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-medium text-black text-lg">Heatmap</Text>
            <TouchableOpacity
              className="flex-row items-center rounded-full bg-white px-3 py-1.5 shadow-sm"
              onPress={() => setShowHeatmapMenu(!showHeatmapMenu)}
            >
              <Text className="mr-1 font-normal text-black text-sm">
                {heatmapDuration === "monthly" ? "Monthly" : "Yearly"}
              </Text>
              <Icon as={ChevronDown} color="#131313" size={16} />
            </TouchableOpacity>
          </View>

          {showHeatmapMenu && (
            <View className="absolute top-16 right-4 z-10 rounded-xl bg-white p-2 shadow-lg">
              {(["monthly", "yearly"] as const).map((type) => (
                <TouchableOpacity
                  className="px-4 py-2"
                  key={type}
                  onPress={() => {
                    setHeatmapDuration(type);
                    setShowHeatmapMenu(false);
                  }}
                >
                  <Text className="font-normal text-black text-sm capitalize">
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Productive hours legend */}
          <View className="mb-4">
            <Text className="mb-2 font-normal text-[#7E7E7E] text-sm">
              Productive hours
            </Text>
            <View className="flex-row gap-1">
              {HEATMAP_COLORS.map((color, index) => (
                <View
                  className="h-6 w-6 rounded"
                  key={index}
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
          </View>

          {/* Heatmap chart */}
          <View className="mb-2">
            <Text className="mb-3 font-normal text-[#7E7E7E] text-sm">
              Heatmap chart
            </Text>

            {/* Hour labels */}
            <View className="mb-2 ml-10 flex-row">
              {HEATMAP_HOURS.map((hour, index) => (
                <Text
                  className="flex-1 text-center font-medium text-[#7E7E7E] text-xs"
                  key={index}
                >
                  {hour}
                </Text>
              ))}
            </View>

            {/* Heatmap grid */}
            {DAYS.map((day, dayIndex) => (
              <View className="mb-1 flex-row items-center" key={dayIndex}>
                <Text className="w-10 font-medium text-[#7E7E7E] text-sm">
                  {day}
                </Text>
                <View className="flex-1 flex-row gap-1">
                  {heatmapData[dayIndex].map((intensity, hourIndex) => (
                    <View
                      className="h-6 w-6 rounded"
                      key={hourIndex}
                      style={{ backgroundColor: HEATMAP_COLORS[intensity] }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
