import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [isBeautyMode, setIsBeautyMode] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [sound, setSound] = useState<any>(null);
  const [cameraRef, setCameraRef] = useState<any>(null);
  const [mediaPermission, setMediaPermission] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(status === 'granted');
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/son.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  async function pickPhoto() {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      if (mediaPermission) {
        await MediaLibrary.saveToLibraryAsync(photo.uri);
        playSound();
      } else {
        console.log('Media library permission not granted');
      }
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleBlackAndWhite() {
    setIsBlackAndWhite((current) => !current);
  }

  function toggleBeautyMode() {
    setIsBeautyMode((current) => !current);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={[
          styles.camera,
          isBlackAndWhite && styles.blackAndWhiteFilter,
          isBeautyMode && styles.beautyFilter,
        ]}
        facing={facing}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickPhoto}>
            <Text style={styles.text}>Pick</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleBlackAndWhite}>
            <Text style={styles.text}>{isBlackAndWhite ? 'Normal' : 'B&W'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleBeautyMode}>
            <Text style={styles.text}>{isBeautyMode ? 'Normal' : 'Beauty'}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 16,
    color: '#fff',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden'
  },
  blackAndWhiteFilter: {
    filter: 'grayscale(100%) contrast(200%) brightness(90%)',
  },
  beautyFilter: {
    filter: 'blur(5px) contrast(110%) brightness(110%)',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});