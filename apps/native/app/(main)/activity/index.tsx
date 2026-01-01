import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@/components/ui/icon";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Dummy tasks data
const TASKS_DATA = [
  {
    id: 1,
    title: "Visual Effects",
    progress: "5/6 - 0/150 mins",
    time: "0 min",
    timeDetail: "(0m)",
    color: "#FF8225",
    icon: "🎬",
  },
  {
    id: 2,
    title: "Wireframing",
    progress: "2/6 - 0/100 mins",
    time: "0 min",
    timeDetail: "(0m)",
    color: "#6C63FF",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Creating a Design Wireframe",
    progress: "4/6 - 230/500 mins",
    time: "230 min",
    timeDetail: "(4h)",
    color: "#FF8225",
    icon: "🎨",
  },
];

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number): number {
  return new Date(year, month, 1).getDay();
}

export default function ActivityPage() {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(2025, 6, 20)
  );

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInPrevMonth = getDaysInMonth(
    currentMonth === 0 ? 11 : currentMonth - 1,
    currentMonth === 0 ? currentYear - 1 : currentYear
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDatePress = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDate(new Date(currentYear, currentMonth, day));
    }
  };

  const isDateSelected = (day: number): boolean => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentMonth &&
      selectedDate.getFullYear() === currentYear
    );
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <View
          className="h-10 w-10 items-center justify-center opacity-40"
          key={`prev-${i}`}
        >
          <View className="h-10 w-10 items-center justify-center rounded-full border border-[#7E7E7E]">
            <Text className="font-normal text-[#7E7E7E] text-base">{day}</Text>
          </View>
        </View>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      days.push(
        <TouchableOpacity
          className="h-10 w-10 items-center justify-center"
          key={`current-${day}`}
          onPress={() => handleDatePress(day, true)}
        >
          <View
            className={`h-10 w-10 items-center justify-center rounded-full border border-[#FF8225] ${
              isSelected ? "bg-[#FF8225]" : ""
            }`}
          >
            <Text
              className={`font-normal text-base ${
                isSelected ? "text-white" : "text-[#7E7E7E]"
              }`}
            >
              {day}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <View
          className="h-10 w-10 items-center justify-center opacity-40"
          key={`next-${i}`}
        >
          <View className="h-10 w-10 items-center justify-center rounded-full border border-[#7E7E7E]">
            <Text className="font-normal text-[#7E7E7E] text-base">{i}</Text>
          </View>
        </View>
      );
    }

    return days;
  };

  // Calculate progress stats (dummy data based on selected date)
  const progressPercentage = "0.0%";
  const workedMins = "250 mins";
  const sessions = 4;

  return (
    <ScrollView className="flex-1 bg-[#FFF3E9]">
      <View className="pb-6">
        {/* Header */}
        <View className="relative mb-6 flex-row items-center justify-center px-5 pt-14">
          <TouchableOpacity
            className="absolute left-5"
            onPress={() => router.back()}
          >
            <Icon as={ChevronLeft} color="#141B34" size={26} />
          </TouchableOpacity>
          <Text className="font-medium text-black text-xl">Calendar</Text>
        </View>

        {/* Calendar */}
        <View className="bg-white">
          <View className="px-5 py-4">
            {/* Month Navigation */}
            <View className="mb-6 flex-row items-center justify-between">
              <TouchableOpacity onPress={handlePrevMonth}>
                <Icon as={ChevronLeft} color="#141B34" size={26} />
              </TouchableOpacity>
              <Text className="font-medium text-black text-lg">
                {MONTHS[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <Icon as={ChevronRight} color="#141B34" size={26} />
              </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View className="mb-3 flex-row justify-between">
              {DAYS_OF_WEEK.map((day) => (
                <Text
                  className="w-10 text-center font-medium text-base text-black"
                  key={day}
                >
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar grid */}
            <View className="flex-row flex-wrap gap-y-3">
              {renderCalendarDays()}
            </View>
          </View>
        </View>

        {/* Progress Stats */}
        <View className="mx-5 mt-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="mb-1 font-normal text-[#7E7E7E] text-base">
                Progress
              </Text>
              <Text className="font-medium text-black text-xl">
                {progressPercentage}
              </Text>
            </View>
            <View className="w-px bg-[#7E7E7E] opacity-40" />
            <View className="flex-1 items-center">
              <Text className="mb-1 font-normal text-[#7E7E7E] text-base">
                Worked
              </Text>
              <Text className="font-medium text-black text-lg">
                {workedMins}
              </Text>
            </View>
            <View className="w-px bg-[#7E7E7E] opacity-40" />
            <View className="flex-1 items-center">
              <Text className="mb-1 font-normal text-[#7E7E7E] text-base">
                Sessions
              </Text>
              <Text className="font-medium text-black text-lg">{sessions}</Text>
            </View>
          </View>
        </View>

        {/* Tasks List */}
        <View className="mt-6 px-5">
          {TASKS_DATA.map((task) => (
            <View
              className="mb-3 flex-row items-center rounded-2xl bg-white p-4 shadow-sm"
              key={task.id}
            >
              <View
                className="h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: task.color }}
              >
                <Text className="text-2xl">{task.icon}</Text>
              </View>
              <View className="ml-4 flex-1">
                <Text className="mb-1 font-medium text-black text-sm">
                  {task.title}
                </Text>
                <View className="flex-row items-center">
                  <Icon as={Clock} color="#7E7E7E" size={14} />
                  <Text className="ml-1 font-normal text-[#7E7E7E] text-xs">
                    {task.progress}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="mb-0.5 text-right font-medium text-black text-sm">
                  {task.time}
                </Text>
                <Text className="text-right font-normal text-[#7E7E7E] text-xs">
                  {task.timeDetail}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
