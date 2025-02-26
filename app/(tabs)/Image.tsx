import { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function prepare() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAppReady(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      await SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  if (!appReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../../assets/pollua.png')} 
        style={[styles.image, { opacity: fadeAnim }]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
});
