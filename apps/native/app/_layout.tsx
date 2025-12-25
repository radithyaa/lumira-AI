import { AppThemeProvider } from "@/contexts/app-theme-context";
import "@/global.css";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import { preventAutoHideAsync } from "expo-splash-screen"; // hideAsync will be handled by LottieSplashScreen
import { HeroUINativeProvider } from "heroui-native";
import { useCallback, useEffect, useState } from "react"; // Added useCallback, useState
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { LottieSplashScreen } from "@/components/lottie-splash-screen"; // Import LottieSplashScreen
import { isFirstLaunch, markLaunched } from "@/lib/first-launch";

preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(drawer)", // Initial route for authenticated users
};

function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(drawer)" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState(false); // New state for app readiness
  const [firstLaunch, setFirstLaunch] = useState(true);

  useEffect(() => {
    (async () => {
      const first = await isFirstLaunch();
      setFirstLaunch(first);
      if (first) {
        await markLaunched();
      }
      setAppIsReady(true);
    })();
  }, []);

  if (!appIsReady) {
    return null;
  }

  if (firstLaunch) {
    router.replace("/onboarding");
  } else {
    router.replace("/");
  }

  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLottieAnimationFinish = useCallback(() => {
    if (loaded || error) {
      setAppIsReady(true);
    }
  }, [loaded, error]);

  if (!appIsReady) {
    return <LottieSplashScreen onAnimationFinish={onLottieAnimationFinish} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AppThemeProvider>
          <HeroUINativeProvider>
            <StackLayout />
          </HeroUINativeProvider>
        </AppThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
