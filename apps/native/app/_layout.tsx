import "@/global.css";
import NetInfo from "@react-native-community/netinfo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { HeroUINativeProvider } from "heroui-native";
import { useCallback, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { LottieSplashScreen } from "@/components/lottie-splash-screen";
import { AppThemeProvider } from "@/contexts/app-theme-context";
import { sync } from "@/lib/db/sync";
import { isFirstLaunch } from "@/lib/first-launch";

preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "onboarding/index",
};

function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal", title: "Modal" }}
      />
    </Stack>
  );
}

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [appReady, setAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const first = await isFirstLaunch();
        console.log("first launch:", first);
      } catch (e) {
        console.error("first launch error", e);
      } finally {
        setAppReady(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Automatic Synchronization Logic
  useEffect(() => {
    if (!process.env.EXPO_PUBLIC_SERVER_URL && Platform.OS !== "web") {
      console.warn("EXPO_PUBLIC_SERVER_URL is not set. Sync will not work.");
    }

    const handleSync = () => {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          console.log(
            "Attempting to sync due to app state change or network recovery..."
          );
          sync();
        } else {
          console.log("Skipping sync, app is offline.");
        }
      });
    };

    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          handleSync();
        }
      }
    );

    handleSync();

    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const onLottieFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (!(fontsLoaded || fontError)) {
    return null;
  }

  if (showSplash || !appReady) {
    return <LottieSplashScreen onAnimationFinish={onLottieFinish} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <AppThemeProvider>
          <HeroUINativeProvider
            config={{
              toast: {
                defaultProps: {
                  variant: "accent",
                  placement: "top",
                },
                insets: {
                  top: 50,
                  bottom: 20,
                  left: 16,
                  right: 16,
                },
              },
            }}
          >
            <StackLayout />
            {/* The Toaster is now implicitly part of the Provider */}
          </HeroUINativeProvider>
        </AppThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
