import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

const POMODORO_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8];

const ORANGE_COLORS = [
  "#C63B08",
  "#EF5207",
  "#FE6C11",
  "#FF8225",
  "#FFB771",
  "#FFD5A8",
];

const PURPLE_COLORS = [
  "#452AD8",
  "#5036F5",
  "#6C63FF",
  "#7577FF",
  "#9CA6FF",
  "#C2CAFF",
];

const PROJECTS = ["Design System", "Mobile App", "Website"];

export default function CreateTaskPage() {
  const [taskName, setTaskName] = useState("");
  const [selectedPomodoro, setSelectedPomodoro] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);

  function handleAdd() {
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-[#FFF3E9]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="flex-row items-center justify-center px-5 pt-2 pb-6">
          <TouchableOpacity
            className="absolute left-5"
            onPress={() => router.back()}
          >
            <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <Path
                d="M20.5841 5.4165L5.41748 20.5832M5.41748 5.4165L20.5841 20.5832"
                stroke="#131313"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
          <Text className="font-medium text-[#131313] text-xl tracking-tight">
            Add New Task
          </Text>
        </View>

        <View className="px-5 gap-4">
          {/* Task Name */}
          <View className="gap-1.5">
            <Text className="font-medium text-[#131313] text-lg tracking-tight">
              Task Name
            </Text>
            <View
              className="rounded-[15px] bg-white px-4 py-[18px]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <TextInput
                className="font-normal text-[#131313] text-lg tracking-tight"
                placeholder="e.g Wireframing, Storyboard, etc."
                placeholderTextColor="#7E7E7E"
                value={taskName}
                onChangeText={setTaskName}
              />
            </View>
          </View>

          {/* Estimated Pomodoros */}
          <View className="gap-1.5">
            <Text className="font-medium text-[#131313] text-lg tracking-tight">
              Estimated Pomodoros
            </Text>
            <View className="flex-row flex-wrap gap-1.5">
              {POMODORO_COUNTS.map((count) => (
                <TouchableOpacity
                  key={count}
                  className="h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      selectedPomodoro === count ? "#FF8225" : "#FFF",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 1,
                  }}
                  onPress={() => setSelectedPomodoro(count)}
                >
                  <Text
                    className="font-normal text-base tracking-tight"
                    style={{
                      color: selectedPomodoro === count ? "#FFF" : "#131313",
                    }}
                  >
                    {count}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Project */}
          <View className="gap-1.5">
            <Text className="font-medium text-[#131313] text-lg tracking-tight">
              Project
            </Text>
            <TouchableOpacity
              className="flex-row items-center justify-between rounded-[15px] bg-white px-4 py-[18px]"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
              onPress={() => setProjectDropdownOpen(!projectDropdownOpen)}
            >
              <Text
                className="font-normal text-lg tracking-tight"
                style={{
                  color: selectedProject ? "#131313" : "#7E7E7E",
                }}
              >
                {selectedProject ?? "Select Project"}
              </Text>
              <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <Path
                  d="M19.5 9.75005C19.5 9.75005 14.7128 16.25 12.9999 16.25C11.2871 16.25 6.5 9.75 6.5 9.75"
                  stroke="#131313"
                  strokeWidth="1.625"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            </TouchableOpacity>

            {projectDropdownOpen && (
              <View
                className="rounded-[15px] bg-white overflow-hidden"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.15,
                  shadowRadius: 4,
                  elevation: 4,
                }}
              >
                <TouchableOpacity
                  className="px-4 py-3 border-b border-gray-100"
                  onPress={() => {
                    router.push("/(main)/task/create-project");
                    setProjectDropdownOpen(false);
                  }}
                >
                  <Text className="font-medium text-[#FF8225] text-base">
                    + Create New Project
                  </Text>
                </TouchableOpacity>
                {PROJECTS.map((project) => (
                  <TouchableOpacity
                    key={project}
                    className="px-4 py-3 border-b border-gray-100 last:border-0"
                    onPress={() => {
                      setSelectedProject(project);
                      setProjectDropdownOpen(false);
                    }}
                  >
                    <Text className="font-normal text-[#131313] text-base">
                      {project}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Color */}
          <View className="gap-1.5">
            <Text className="font-medium text-[#131313] text-lg tracking-tight">
              Color
            </Text>
            {/* Orange row */}
            <View className="flex-row justify-between">
              {ORANGE_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  className="h-[45px] w-[45px] items-center justify-center rounded-full"
                  style={{ backgroundColor: color }}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <View className="h-4 w-4 rounded-full border-2 border-white bg-transparent" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            {/* Purple row */}
            <View className="flex-row justify-between">
              {PURPLE_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  className="h-[45px] w-[45px] items-center justify-center rounded-full"
                  style={{ backgroundColor: color }}
                  onPress={() => setSelectedColor(color)}
                >
                  {selectedColor === color && (
                    <View className="h-4 w-4 rounded-full border-2 border-white bg-transparent" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Add Button */}
        <View className="px-5 mt-8">
          <TouchableOpacity
            className="w-full items-center justify-center rounded-[30px] bg-[#FF8225] py-[18px]"
            style={{
              shadowColor: "rgba(255,255,255,0.35)",
              shadowOffset: { width: 0, height: 9 },
              shadowOpacity: 1,
              shadowRadius: 11,
              elevation: 6,
            }}
            onPress={handleAdd}
          >
            <Text className="font-medium text-white text-lg tracking-tight">
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
