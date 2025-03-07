import React from "react";
import {
  useColorScheme,
  Pressable,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import * as ScreenOrientation from 'expo-screen-orientation';

const THEME = {
  light: {
    background: "#F0F4F8",
    text: "#1B1F3B",
    title: "#0D0D0D",
    buttonBg: "#1B1F3B",
    buttonText: "#FFFFFF",
    divider: "#CCCCCC",
  },
  dark: {
    background: "#0D0D0D",
    text: "#FFFFFF",
    title: "#FFFFFF",
    buttonBg: "#1B1F3B",
    buttonText: "#FFFFFF",
    divider: "#333333",
  },
};

const App = () => {
  const colorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const isPortrait = height > width;
  const theme = THEME[colorScheme || "light"];

  const toggleOrientation = async () => {
    if (isPortrait) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    }
  };

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />

      <Text style={[styles.title, { color: theme.title, fontSize: isPortrait ? 30 : 26 }]}>📸 Pick Cam</Text>

      <View style={styles.infoContainer}>
        <Text style={[styles.infoText, { color: theme.text }]}>
          {colorScheme === "dark" ? "🌙 night" : "☀️ light"}
        </Text>
        <Text style={[styles.infoText, { color: theme.text }]}>
          {isPortrait ? "📱 Portrait" : "🖥️ Landscape"}" :
        </Text>
        
      </View>

      <View style={[styles.divider, { backgroundColor: theme.divider }]} />

      <Pressable
        onPress={() => router.push("/Camera")}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.buttonBg,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Pick</Text>
      </Pressable>


      <Pressable
        onPress={toggleOrientation}
        style={({ pressed }) => [
          styles.button,
          {
            backgroundColor: theme.buttonBg,
            transform: [{ scale: pressed ? 0.95 : 1 }],
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          {isPortrait ? "Switch to Landscape" : "Switch to Portrait"}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 8,
    fontWeight: "500",
  },
  divider: {
    width: "70%",
    height: 1,
    marginVertical: 30,
  },
  button: {
    width: "30%",
    padding: 16,
    borderRadius: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default App;