import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ChevronRight, Clock, PlayCircle } from 'lucide-react-native';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const CURRENT_WEEK = [
  { day: 'Sun', date: 20, isToday: true },
  { day: 'Mon', date: 21, isToday: false },
  { day: 'Tue', date: 22, isToday: false },
  { day: 'Wed', date: 23, isToday: false },
  { day: 'Thu', date: 24, isToday: false },
  { day: 'Fri', date: 25, isToday: false },
  { day: 'Sat', date: 26, isToday: false },
];

const RECENT_TASKS = [
  { id: 1, title: 'Visual Effects', progress: '5/6 - 0/150 mins', color: '#FF8225', icon: '🎬' },
  { id: 2, title: 'Wireframing', progress: '2/6 - 0/100 mins', color: '#6C63FF', icon: '🎨' },
  { id: 3, title: 'Layouting', progress: '2/6 - 0/200 mins', color: '#C63B08', icon: '💻' },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-[#FFF3E9]">
      <View className="px-5 pt-14 pb-6">
        {/* Header */}
        <View className="flex-row justify-between items-start mb-6">
          <View>
            <Text className="text-2xl font-['Poppins-Medium'] text-[#131313]">
              Good Morning, <Text className="text-[#FF8225]">Sultan!</Text>
            </Text>
            <Text className="text-lg font-['Poppins-Regular'] text-[#7E7E7E] mt-1">
              Sunday, 20th July 2025
            </Text>
          </View>
          <View className="w-14 h-14 rounded-full bg-white shadow-sm items-center justify-center">
            <Text className="text-2xl">🦊</Text>
          </View>
        </View>

        {/* Week Calendar */}
        <View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <View className="flex-row justify-between">
            {CURRENT_WEEK.map((day, index) => (
              <View key={index} className="items-center">
                <Text className="text-base font-['Poppins-Medium'] text-[#131313] mb-1.5">
                  {day.day}
                </Text>
                <View
                  className={`w-7 px-2 py-1 rounded-xl ${
                    day.isToday ? 'bg-[#FF8225]' : ''
                  }`}
                >
                  <Text
                    className={`text-base font-['Poppins-Regular'] text-center ${
                      day.isToday ? 'text-white' : 'text-[#131313]'
                    }`}
                  >
                    {day.date}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Navigation Cards */}
        <View className="flex-row gap-4 mb-6">
          <TouchableOpacity
            onPress={() => router.push('/(main)/home/index')}
            className="flex-1 h-40 rounded-2xl bg-[#FFB771] items-center justify-center"
          >
            <Text className="text-6xl mb-2">📋</Text>
            <Text className="text-lg font-['Poppins-Medium'] text-white">Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/(main)/report/index')}
            className="flex-1 h-40 rounded-2xl bg-[#9CA6FF] items-center justify-center"
          >
            <Text className="text-6xl mb-2">📊</Text>
            <Text className="text-lg font-['Poppins-Medium'] text-white">Report</Text>
          </TouchableOpacity>
        </View>

        {/* Career Compass Card */}
        <View className="bg-[#FF7900] rounded-2xl p-4 mb-6 flex-row">
          <View className="w-40 h-40 -ml-8 -mt-10">
            <Text className="text-8xl">🦊</Text>
          </View>
          <View className="flex-1 justify-between">
            <Text className="text-base font-['Poppins-Regular'] text-white leading-5">
              Think of me as your career compass. Helping you plan, decide, and move forward with confidence.
            </Text>
            <TouchableOpacity className="flex-row items-center mt-3">
              <Text className="text-lg font-['Poppins-Medium'] text-white mr-2">
                Explore
              </Text>
              <Icon as={ChevronRight} size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Tasks */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-['Poppins-Medium'] text-[#131313]">
              Recent Tasks
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-base font-['Poppins-Medium'] text-[#FF8225] mr-1">
                View All
              </Text>
              <Icon as={ChevronRight} size={20} color="#FF8225" />
            </TouchableOpacity>
          </View>

          {RECENT_TASKS.map((task) => (
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
                <Text className="text-sm font-['Poppins-Medium'] text-black">
                  {task.title}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Icon as={Clock} size={14} color="#7E7E7E" />
                  <Text className="text-xs font-['Poppins-Regular'] text-[#7E7E7E] ml-1">
                    {task.progress}
                  </Text>
                </View>
              </View>
              <View className="w-9 h-9 rounded-full bg-[#FFD5A8] items-center justify-center">
                <Icon as={PlayCircle} size={20} color={task.color} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
