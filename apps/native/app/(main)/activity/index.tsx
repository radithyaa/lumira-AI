import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Dummy tasks data
const TASKS_DATA = [
  { id: 1, title: 'Visual Effects', progress: '5/6 - 0/150 mins', time: '0 min', timeDetail: '(0m)', color: '#FF8225', icon: '🎬' },
  { id: 2, title: 'Wireframing', progress: '2/6 - 0/100 mins', time: '0 min', timeDetail: '(0m)', color: '#6C63FF', icon: '🎨' },
  { id: 3, title: 'Creating a Design Wireframe', progress: '4/6 - 230/500 mins', time: '230 min', timeDetail: '(4h)', color: '#FF8225', icon: '🎨' },
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2025, 6, 20));

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
        <View key={`prev-${i}`} className="w-10 h-10 items-center justify-center opacity-40">
          <View className="w-10 h-10 rounded-full border border-[#7E7E7E] items-center justify-center">
            <Text className="text-base font-['Poppins-Regular'] text-[#7E7E7E]">
              {day}
            </Text>
          </View>
        </View>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      days.push(
        <TouchableOpacity
          key={`current-${day}`}
          onPress={() => handleDatePress(day, true)}
          className="w-10 h-10 items-center justify-center"
        >
          <View
            className={`w-10 h-10 rounded-full border border-[#FF8225] items-center justify-center ${
              isSelected ? 'bg-[#FF8225]' : ''
            }`}
          >
            <Text
              className={`text-base font-['Poppins-Regular'] ${
                isSelected ? 'text-white' : 'text-[#7E7E7E]'
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
        <View key={`next-${i}`} className="w-10 h-10 items-center justify-center opacity-40">
          <View className="w-10 h-10 rounded-full border border-[#7E7E7E] items-center justify-center">
            <Text className="text-base font-['Poppins-Regular'] text-[#7E7E7E]">
              {i}
            </Text>
          </View>
        </View>
      );
    }

    return days;
  };

  // Calculate progress stats (dummy data based on selected date)
  const progressPercentage = '0.0%';
  const workedMins = '250 mins';
  const sessions = 4;

  return (
    <ScrollView className="flex-1 bg-[#FFF3E9]">
      <View className="pb-6">
        {/* Header */}
        <View className="flex-row items-center justify-center pt-14 px-5 mb-6 relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-5"
          >
            <Icon as={ChevronLeft} size={26} color="#141B34" />
          </TouchableOpacity>
          <Text className="text-xl font-['Poppins-Medium'] text-[#131313]">Calendar</Text>
        </View>

        {/* Calendar */}
        <View className="bg-white">
          <View className="px-5 py-4">
            {/* Month Navigation */}
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={handlePrevMonth}>
                <Icon as={ChevronLeft} size={26} color="#141B34" />
              </TouchableOpacity>
              <Text className="text-lg font-['Poppins-Medium'] text-[#131313]">
                {MONTHS[currentMonth]} {currentYear}
              </Text>
              <TouchableOpacity onPress={handleNextMonth}>
                <Icon as={ChevronRight} size={26} color="#141B34" />
              </TouchableOpacity>
            </View>

            {/* Day headers */}
            <View className="flex-row justify-between mb-3">
              {DAYS_OF_WEEK.map((day) => (
                <Text
                  key={day}
                  className="text-base font-['Poppins-Medium'] text-[#131313] w-10 text-center"
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
        <View className="mx-5 mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-between">
            <View className="flex-1 items-center">
              <Text className="text-base font-['Poppins-Regular'] text-[#7E7E7E] mb-1">
                Progress
              </Text>
              <Text className="text-xl font-['Poppins-Medium'] text-[#131313]">
                {progressPercentage}
              </Text>
            </View>
            <View className="w-px bg-[#7E7E7E] opacity-40" />
            <View className="flex-1 items-center">
              <Text className="text-base font-['Poppins-Regular'] text-[#7E7E7E] mb-1">
                Worked
              </Text>
              <Text className="text-lg font-['Poppins-Medium'] text-[#131313]">
                {workedMins}
              </Text>
            </View>
            <View className="w-px bg-[#7E7E7E] opacity-40" />
            <View className="flex-1 items-center">
              <Text className="text-base font-['Poppins-Regular'] text-[#7E7E7E] mb-1">
                Sessions
              </Text>
              <Text className="text-lg font-['Poppins-Medium'] text-[#131313]">
                {sessions}
              </Text>
            </View>
          </View>
        </View>

        {/* Tasks List */}
        <View className="px-5 mt-6">
          {TASKS_DATA.map((task) => (
            <View
              key={task.id}
              className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm"
            >
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: task.color }}
              >
                <Text className="text-2xl">{task.icon}</Text>
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-sm font-['Poppins-Medium'] text-black mb-1">
                  {task.title}
                </Text>
                <View className="flex-row items-center">
                  <Icon as={Clock} size={14} color="#7E7E7E" />
                  <Text className="text-xs font-['Poppins-Regular'] text-[#7E7E7E] ml-1">
                    {task.progress}
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-sm font-['Poppins-Medium'] text-[#131313] text-right mb-0.5">
                  {task.time}
                </Text>
                <Text className="text-xs font-['Poppins-Regular'] text-[#7E7E7E] text-right">
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
