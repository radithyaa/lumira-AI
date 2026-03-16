import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, Home } from "lucide-react-native";
import { Pressable, useWindowDimensions, View } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

function TabBarBackground({ width }: { width: number }) {
  const height = 78;
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        // Shadow untuk container floating bar — lebih soft & natural
        elevation: 12,
        shadowColor: "#C0601A",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
      }}
    >
      <Svg
        height={height}
        preserveAspectRatio="none"
        viewBox="0 0 360 78"
        width={width}
      >
        <Path
          d="M360 39C360 60.5391 342.539 78 321 78H39C17.4609 78 0 60.5391 0 39C0 17.4609 17.4609 0 39 0H120.982C151.027 3.09519 148.091 30 180 30C211.666 29.9998 208.507 3.06147 238.251 0H321C342.539 0 360 17.4609 360 39Z"
          fill="white"
        />
      </Svg>
    </View>
  );
}

function FloatingTabBar({ state, descriptors, navigation }: any) {
  const { width: screenWidth } = useWindowDimensions();
  const tabBarWidth = Math.min(screenWidth - 40, 600);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 28,
        left: (screenWidth - tabBarWidth) / 2,
        width: tabBarWidth,
        height: 80,
        alignItems: "center",
      }}
    >
      <TabBarBackground width={tabBarWidth} />

      <View
        style={{
          width: "100%",
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const color = isFocused ? "#FF8225" : "#7E7E7E";
          const fillColor = isFocused ? "#FF8225" : "none";

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!(isFocused || event.defaultPrevented)) {
              navigation.navigate(route.name);
            }
          };

          // --- Tombol Tengah ---
          if (route.name === "report/index") {
            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={{ top: -45 }}
              >
                {({ pressed }) => (
                  <View>


                    {/* Tombol utama */}
                    <View
                      style={{
                        width: 62,
                        height: 62,
                        borderRadius: 31,
                        backgroundColor: "#FF8225",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        // Shadow oranye utama
                        shadowColor: "#FF8225",
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.55,
                        shadowRadius: 14,
                        elevation: 10,
                      }}
                    >
                      {/* Darken saat ditekan */}
                      {pressed && (
                        <View
                          pointerEvents="none"
                          style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.1)",
                          }}
                        />
                      )}

                      {/* Top highlight gradient */}
                      <LinearGradient
                        colors={["rgba(255,255,255,0.35)", "transparent"]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        pointerEvents="none"
                        style={{
                          position: "absolute",
                          top: 0, left: 0, right: 0,
                          height: 20,
                        }}
                      />

                      {/* Bottom shadow gradient */}
                      <LinearGradient
                        colors={["transparent", "rgba(0,0,0,0.08)"]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        pointerEvents="none"
                        style={{
                          position: "absolute",
                          bottom: 0, left: 0, right: 0,
                          height: 12,
                        }}
                      />

                      <Image
                        contentFit="contain"
                        source={require("@/assets/icons/clock.webp")}
                        style={{ width: 28, height: 28 }}
                      />
                    </View>
                  </View>
                )}
              </Pressable>
            );
          }

          // --- Tombol Samping ---
          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              {({ pressed }) => (
                <View
                  style={{
                    width: 48,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 24, // bulat penuh
                    backgroundColor: isFocused
                      ? "#FFF5ED"
                      : pressed
                      ? "#FFF5ED"
                      : "transparent",
                    // Transisi halus (React Native tidak support CSS transition,
                    // tapi perubahan warna sudah cukup smooth)
                  }}
                >
                  {route.name === "home/index" ? (
                    <Svg fill="none" height="28" viewBox="0 0 30 30" width="28">
                      <Path
                        d="M8.99475 29.0833H20.8391C24.1098 29.0833 26.7612 26.5531 26.7612 23.4319V16.5218C26.7612 15.5185 27.1789 14.5563 27.9223 13.8468C29.6449 12.203 29.4209 9.47957 27.4509 8.1123L18.4002 1.83091C16.3235 0.389697 13.5103 0.389697 11.4337 1.83091L2.38296 8.1123C0.412893 9.47957 0.188968 12.203 1.91147 13.8468C2.65492 14.5563 3.07258 15.5185 3.07258 16.5218V23.4319C3.07258 26.5531 5.72403 29.0833 8.99475 29.0833Z"
                        fill={fillColor}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      <Path
                        d="M17.7502 20.5833C17.7502 22.1481 16.4817 23.4167 14.9169 23.4167C13.3521 23.4167 12.0836 22.1481 12.0836 20.5833C12.0836 19.0185 13.3521 17.75 14.9169 17.75C16.4817 17.75 17.7502 19.0185 17.7502 20.5833Z"
                        fill={isFocused ? "white" : "none"}
                        stroke={isFocused ? "white" : color}
                        strokeWidth="1.5"
                      />
                    </Svg>
                  ) : (
                    <Svg fill="none" height="31" viewBox="0 0 24 24" width="28">
                      <Circle
                        cx="11.5"
                        cy="5.5"
                        fill={fillColor}
                        r="5"
                        stroke={color}
                        strokeWidth="1.5"
                      />
                      <Path
                        d="M11.5 13.5C14.6117 13.5 17.4042 14.1588 19.4004 15.2002C21.4208 16.2543 22.5 17.6234 22.5 19C22.5 20.3766 21.4208 21.7457 19.4004 22.7998C17.4042 23.8412 14.6117 24.5 11.5 24.5C8.38831 24.5 5.59581 23.8412 3.59961 22.7998C1.57921 21.7457 0.5 20.3766 0.5 19C0.5 17.6234 1.57921 16.2543 3.59961 15.2002C5.59581 14.1588 8.38831 13.5 11.5 13.5Z"
                        fill={fillColor}
                        stroke={color}
                        strokeWidth="1.5"
                      />
                    </Svg>
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    >
      <Tabs.Screen name="home/index" />
      <Tabs.Screen name="report/index" />
      <Tabs.Screen name="calendar/index" />
    </Tabs>
  );
}
