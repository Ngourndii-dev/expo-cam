import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native'; // Ajoutez Text ici
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    async function prepare() {
      try {
        // Simule un chargement asynchrone (par exemple, chargement de données ou de ressources)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Une fois que tout est prêt, on met à jour l'état
        setAppReady(true);

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          setSplashComplete(true);
          SplashScreen.hideAsync();
        });
      } catch (e) {
        console.warn(e);
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  if (!splashComplete) {
    return (
      <View style={styles.container}>
        <Animated.Image 
          source={require('../../assets/pollua.png')} 
          style={[styles.image, { opacity: fadeAnim }]} 
        />
        <Text style={styles.loadingText}>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../../assets/pollua.png')} 
        style={[styles.image, { opacity: fadeAnim }]} 
      />
      <Text style={styles.welcomeText}>Bienvenue !</Text>
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
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
  welcomeText: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});