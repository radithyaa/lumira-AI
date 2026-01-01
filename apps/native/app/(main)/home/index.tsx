import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ChevronRight, Clock, PlayCircle } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "@/components/ui/icon";
import { authClient } from "@/lib/auth-client";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CURRENT_WEEK = [
  { day: "Sun", date: 20, isToday: true },
  { day: "Mon", date: 21, isToday: false },
  { day: "Tue", date: 22, isToday: false },
  { day: "Wed", date: 23, isToday: false },
  { day: "Thu", date: 24, isToday: false },
  { day: "Fri", date: 25, isToday: false },
  { day: "Sat", date: 26, isToday: false },
];

const RECENT_TASKS = [
  {
    id: 1,
    title: "Visual Effects",
    progress: "5/6 - 0/150 mins",
    color: "#FFB771",
    icon: "🎬",
  },
  {
    id: 2,
    title: "Wireframing",
    progress: "2/6 - 0/100 mins",
    color: "#9CA6FF",
    icon: "🎨",
  },
  {
    id: 3,
    title: "Layouting",
    progress: "2/6 - 0/200 mins",
    color: "#C63B08",
    icon: "💻",
  },
];

export default function HomePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <ScrollView className="flex-1 bg-[#FFF3E9]">
      <View className="px-5 pt-14 pb-6">
        {/* Header */}
        <View className="mb-6 flex-row items-start justify-between">
          <View>
            <Text className="font-medium text-2xl text-black tracking-tighter">
              Good Morning,{" "}
              <Text className="text-primary capitalize">
                {session?.user?.name}
              </Text>
            </Text>
            <Text className="mt-1 font-normal text-alternate text-lg tracking-tighter">
              Sunday, 20th July 2025
            </Text>
          </View>
          <View className="h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Text className="text-2xl">🦊</Text>
          </View>
        </View>

        {/* Week Calendar */}
        <View className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
          <View className="flex-row justify-between">
            {CURRENT_WEEK.map((day, index) => (
              <View className="items-center" key={index}>
                <Text className="mb-1.5 font-medium text-base text-black tracking-tighter">
                  {day.day}
                </Text>
                <View
                  className={`rounded-xl px-2 py-1 ${
                    day.isToday ? "bg-[#FF8225]" : ""
                  }`}
                >
                  <Text
                    className={`text-nowrap text-center text-base tracking-tighter ${
                      day.isToday ? "text-white" : "text-black"
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
        <View className="mb-6 flex-row gap-4">
          <TouchableOpacity
            className="flex h-40 flex-1 items-center justify-center rounded-2xl bg-[#FFB771]"
            onPress={() => router.push("/(main)/activity")}
          >
            <Image
              source={require("@/assets/mascot/holdinglips-lira.webp")}
              style={{
                width: 90,
                height: 90,
                marginTop: -55,
                marginLeft: -10,
              }}
            />
            <Text className="font-medium text-lg text-white">Tasks</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="h-40 flex-1 items-center justify-center rounded-2xl bg-[#9CA6FF]"
            onPress={() => router.push("/(main)/report/index")}
          >
            <Text className="mb-2 text-6xl">📊</Text>
            <Text className="font-medium text-lg text-white">Report</Text>
          </TouchableOpacity>
        </View>

        {/* Career Compass Card */}
        <View className="mb-6 h-46 w-90 flex-col rounded-2xl bg-[#FF7900] py-4">
          <View className="flex-row">
            <Image
              source={require("@/assets/mascot/smile-lira.webp")}
              style={{
                width: 172,
                height: 172,
                marginTop: -55,
                marginLeft: -10,
              }}
            />
            <Text className="mt-2 -ml-2 w-49 font-normal text-base text-white leading-5 tracking-tighter">
              Think of me as your career compass. Helping you plan, decide, and
              move forward with confidence.
            </Text>
          </View>
          <View className="flex-1 justify-between">
            <TouchableOpacity className="flex-row justify-between px-6">
              <Text className="mr-2 font-medium text-lg text-white">
                Explore
              </Text>
              <Icon as={ChevronRight} color="#FFFFFF" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Tasks */}
        <View>
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-medium text-black text-lg tracking-tighter">
              Recent Tasks
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="mr-1 font-medium text-base text-primary">
                View All
              </Text>
              <Icon as={ChevronRight} color="#FF8225" size={20} />
            </TouchableOpacity>
          </View>

          {RECENT_TASKS.map((task) => (
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
                <Text className="font-medium text-black text-sm">
                  {task.title}
                </Text>
                <View className="mt-1 flex-row items-center">
                  <Icon as={Clock} color="#7E7E7E" size={14} />
                  <Text className="ml-1 font-normal text-[#7E7E7E] text-xs">
                    {task.progress}
                  </Text>
                </View>
              </View>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#FFD5A8]">
                <Icon as={PlayCircle} color={task.color} size={20} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
