import { hideAsync } from "expo-splash-screen";
import LottieView from "lottie-react-native";
import type React from "react";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface LottieSplashScreenProps {
  onAnimationFinish: () => void;
}

const LOTTIE_ANIMATION_SOURCE = require("../assets/lottie/splash-screen.json");

const LottieSplashScreen: React.FC<LottieSplashScreenProps> = ({
  onAnimationFinish,
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    // Hide the native splash screen as soon as Lottie starts playing
    hideAsync();

    // Play the Lottie animation
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={false}
        loop={false}
        onAnimationFinish={onAnimationFinish} // Play once
        ref={animationRef} // Controlled manually
        resizeMode="contain" // Call callback when animation finishes
        source={LOTTIE_ANIMATION_SOURCE}
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff3e9", // Match your app.json splash background
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: Dimensions.get("window").width * 0.8, // Adjust size as needed
    height: Dimensions.get("window").height * 0.8,
  },
});

export { LottieSplashScreen };
