// lib/first-launch.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hasLaunched";

export async function isFirstLaunch() {
  const value = await AsyncStorage.getItem(KEY);
  return value === null;
}

export async function markLaunched() {
  await AsyncStorage.setItem(KEY, "true");
}
