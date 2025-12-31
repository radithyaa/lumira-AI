import { DotLottie } from "@lottiefiles/dotlottie-react-native";
import { hideAsync } from "expo-splash-screen";
import type LottieView from "lottie-react-native";
import type React from "react";
import { useEffect, useRef } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

interface LottieSplashScreenProps {
  onAnimationFinish: () => void;
}

const LottieSplashScreen: React.FC<LottieSplashScreenProps> = ({
  onAnimationFinish,
}) => {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    hideAsync();

    // Delay untuk memastikan component sudah mount
    const timer = setTimeout(() => {
      if (animationRef.current) {
        animationRef.current.play();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <DotLottie
        autoplay
        onComplete={onAnimationFinish}
        source={require("../assets/lottie/splash-screen.lottie")}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff3e9",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export { LottieSplashScreen };
