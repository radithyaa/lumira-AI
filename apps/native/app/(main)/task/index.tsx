import { router } from "expo-router";
import { Clock, Play } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Rect, Circle, G, ClipPath, Defs } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = {
  id: number;
  title: string;
  progress: string;
  iconBg: string;
  playBg: string;
  playColor: string;
  icon: "video" | "web" | "code";
};

const ACTIVE_TASKS: Task[] = [
  {
    id: 1,
    title: "Visual Effects",
    progress: "0/6 - 0/150 mins",
    iconBg: "#FF8225",
    playBg: "#FFD5A8",
    playColor: "#FF8225",
    icon: "video",
  },
  {
    id: 2,
    title: "Wireframing",
    progress: "2/6 - 0/100 mins",
    iconBg: "#6C63FF",
    playBg: "#C2CAFF",
    playColor: "#6C63FF",
    icon: "web",
  },
  {
    id: 3,
    title: "Layouting",
    progress: "2/6 - 0/200 mins",
    iconBg: "#C63B08",
    playBg: "#FFD5A8",
    playColor: "#FF8225",
    icon: "code",
  },
];

function VideoIcon() {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path
        d="M22.125 26.6687C20.66 26.8745 18.7495 26.8745 16.1875 26.8745H13.8125C8.77436 26.8745 6.2553 26.8745 4.69015 25.3094C3.125 23.7442 3.125 21.2251 3.125 16.187V13.812C3.125 8.77388 3.125 6.25481 4.69015 4.68966C6.2553 3.12451 8.77436 3.12451 13.8125 3.12451H16.1875C21.2256 3.12451 23.7447 3.12451 25.3099 4.68966C26.875 6.25481 26.875 8.77388 26.875 13.812V16.187C26.875 17.6973 26.875 18.9812 26.8328 20.0809C26.7991 20.9622 26.7822 21.4028 26.4484 21.5675C26.1147 21.7322 25.7414 21.468 24.9947 20.9398L23.3125 19.7495"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.6816 15.4935C18.4607 16.2769 17.4167 16.8305 15.3286 17.9377C13.31 19.008 12.3008 19.5432 11.4874 19.3281C11.1511 19.2392 10.8447 19.0702 10.5977 18.8376C10 18.2748 10 17.1832 10 15C10 12.8168 10 11.7252 10.5977 11.1624C10.8447 10.9298 11.1511 10.7608 11.4874 10.6719C12.3008 10.4568 13.31 10.992 15.3286 12.0623C17.4167 13.1695 18.4607 13.7231 18.6816 14.5065C18.7728 14.8299 18.7728 15.1701 18.6816 15.4935Z"
        stroke="white"
        strokeWidth="1.875"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function WebIcon() {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path
        d="M3.125 15C3.125 9.40207 3.125 6.60311 4.86405 4.86405C6.60311 3.125 9.40207 3.125 15 3.125C20.5979 3.125 23.3969 3.125 25.1359 4.86405C26.875 6.60311 26.875 9.40207 26.875 15C26.875 20.5979 26.875 23.3969 25.1359 25.1359C23.3969 26.875 20.5979 26.875 15 26.875C9.40207 26.875 6.60311 26.875 4.86405 25.1359C3.125 23.3969 3.125 20.5979 3.125 15Z"
        stroke="white"
        strokeWidth="1.875"
      />
      <Path
        d="M3.125 11.25H26.875"
        stroke="white"
        strokeWidth="1.875"
        strokeLinejoin="round"
      />
      <Path
        d="M16.25 16.25H21.25"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.25 21.25H18.75"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.74976 7.5H8.76099"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.7498 7.5H13.761"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.25 11.25V26.875"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CodeIcon() {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <Path
        d="M21.25 10L23.5498 12.3126C24.5166 13.2848 25 13.7709 25 14.375C25 14.9791 24.5166 15.4652 23.5498 16.4374L21.25 18.75"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.75 10L6.45024 12.3126C5.48341 13.2848 5 13.7709 5 14.375C5 14.9791 5.48341 15.4652 6.45024 16.4374L8.75 18.75"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.125 5L11.875 25"
        stroke="white"
        strokeWidth="1.875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PlayIcon({ color }: { color: string }) {
  return (
    <Svg width="20" height="20" viewBox="0 0 36 36" fill="none">
      <Path
        d="M24.1615 18.7944C23.8458 20.0556 22.3522 20.9469 19.3643 22.7293C16.4756 24.4526 15.0313 25.3138 13.8678 24.9682C13.3855 24.8247 12.9468 24.5526 12.5942 24.1784C11.7393 23.2722 11.7393 21.515 11.7393 17.9999C11.7393 14.4847 11.7393 12.7276 12.5942 11.8213C12.9469 11.4475 13.3856 11.1758 13.8678 11.0325C15.0313 10.685 16.4756 11.5471 19.3643 13.2704C22.3514 15.0529 23.8458 15.9441 24.1624 17.2054C24.2939 17.726 24.2939 18.2737 24.1624 18.7944"
        fill={color}
      />
    </Svg>
  );
}

function TaskIcon({ icon }: { icon: Task["icon"] }) {
  if (icon === "video") return <VideoIcon />;
  if (icon === "web") return <WebIcon />;
  return <CodeIcon />;
}

function TaskCard({ task }: { task: Task }) {
  return (
    <View className="flex-row items-center rounded-[20px] bg-white px-4 py-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      <View
        className="h-[46px] w-[46px] items-center justify-center rounded-full"
        style={{ backgroundColor: task.iconBg }}
      >
        <TaskIcon icon={task.icon} />
      </View>
      <View className="ml-3 flex-1">
        <Text className="font-medium text-black text-sm tracking-tight">
          {task.title}
        </Text>
        <View className="mt-1 flex-row items-center gap-1">
          <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <G clipPath="url(#clip0)">
              <Path
                d="M8.00016 5.3335V8.66683L10.0002 10.0002M11.2024 1.3335C12.6181 1.95257 13.8201 2.96958 14.6668 4.2431M1.3335 4.2431C2.18025 2.96958 3.38218 1.95257 4.79788 1.3335M14.0002 14.6668L12.5049 12.6668M2.00016 14.6668L3.49531 12.6668M14.0002 8.66683C14.0002 11.9805 11.3139 14.6668 8.00016 14.6668C4.68645 14.6668 2.00016 11.9805 2.00016 8.66683C2.00016 5.35312 4.68645 2.66683 8.00016 2.66683C11.3139 2.66683 14.0002 5.35312 14.0002 8.66683Z"
                stroke="#7E7E7E"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </G>
            <Defs>
              <ClipPath id="clip0">
                <Rect width="16" height="16" fill="white" />
              </ClipPath>
            </Defs>
          </Svg>
          <Text className="font-normal text-[#7E7E7E] text-xs">
            {task.progress}
          </Text>
        </View>
      </View>
      <View
        className="h-9 w-9 items-center justify-center rounded-full"
        style={{ backgroundColor: task.playBg }}
      >
        <PlayIcon color={task.playColor} />
      </View>
    </View>
  );
}

export default function TaskPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  return (
    <SafeAreaView className="flex-1 bg-[#FFF3E9]">
      {/* Header */}
      <View className="flex-row items-center justify-center px-5 pt-2 pb-4">
        <TouchableOpacity
          className="absolute left-5"
          onPress={() => router.back()}
        >
          <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <Path
              d="M16.25 19.5L10.516 13.766C10.1549 13.4049 9.97437 13.2244 9.97437 13C9.97437 12.7756 10.1549 12.5951 10.516 12.234L16.25 6.5"
              stroke="#131313"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <Text className="font-medium text-black text-xl tracking-tight">
          Tasks
        </Text>
      </View>

      {/* Tabs */}
      <View className="mx-5 mb-4 flex-row rounded-[10px] bg-white p-0"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.08,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <TouchableOpacity
          className={`flex-1 items-center justify-center rounded-[10px] py-3 ${activeTab === "active" ? "bg-[#FF8225]" : "bg-transparent"}`}
          onPress={() => setActiveTab("active")}
        >
          <Text
            className={`font-medium text-base ${activeTab === "active" ? "text-white" : "text-[#131313]"}`}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 items-center justify-center rounded-[10px] py-3 ${activeTab === "completed" ? "bg-[#FF8225]" : "bg-transparent"}`}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            className={`font-medium text-base ${activeTab === "completed" ? "text-white" : "text-[#131313]"}`}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ gap: 6, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "active" ? (
          ACTIVE_TASKS.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <View className="flex-1 items-center justify-center pt-20">
            <Text className="font-normal text-[#7E7E7E] text-base">
              No completed tasks yet
            </Text>
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        className="absolute bottom-8 right-5 h-[62px] w-[62px] items-center justify-center rounded-full bg-[#FF8225]"
        style={{
          shadowColor: "#FF8225",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.4,
          shadowRadius: 10,
          elevation: 8,
        }}
        onPress={() => router.push("/(main)/task/create")}
      >
        <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <Path
            d="M21 10.5V31.5M31.5 21L10.5 21"
            stroke="white"
            strokeWidth="2.625"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
