import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "hasLaunched";

export async function isFirstLaunch(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value === null;
  } catch (e) {
    console.warn("isFirstLaunch failed, fallback true", e);
    return true;
  }
}

export async function markLaunched() {
  try {
    await AsyncStorage.setItem(KEY, "true");
    console.log("Launched marked");
  } catch (e) {
    console.warn("markLaunched failed", e);
  }
}
