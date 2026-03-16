import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";

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

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

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
            Add New Project
          </Text>
        </View>

        {/* Image Placeholder Button */}
        <View className="items-center mb-6">
          <TouchableOpacity
            className="h-[62px] w-[62px] items-center justify-center rounded-full bg-white"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.18,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <Svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <Path
                d="M21 10.5V31.5M31.5 21L10.5 21"
                stroke="#131313"
                strokeWidth="2.625"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </TouchableOpacity>
        </View>

        <View className="px-5 gap-4">
          {/* Project Name */}
          <View className="gap-1.5">
            <Text className="font-medium text-[#131313] text-lg tracking-tight">
              Project Name
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
                placeholder="e.g Website Design, Video Editing, etc."
                placeholderTextColor="#7E7E7E"
                value={projectName}
                onChangeText={setProjectName}
              />
            </View>
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
