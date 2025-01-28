import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [sound, setSound] = useState<any>(null); // Variable pour gérer le son

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
      require('../../assets/son.mp3') // Remplacez par votre chemin de fichier MP3
    );
    setSound(sound);
    await sound.playAsync(); // Joue le son
  }

  // Fonction pour changer l'orientation de la caméra et jouer le son
  function toggleCameraFacing() {
    playSound(); // Appeler la fonction playSound
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  function toggleBlackAndWhite() {
    setIsBlackAndWhite((current) => !current);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={[
          styles.camera,
          isBlackAndWhite && { filter: 'grayscale(100%)' }, 
        ]}
        facing={facing}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleBlackAndWhite}>
            <Text style={styles.text}>{isBlackAndWhite ? 'Normal Mode' : 'B&W Mode'}</Text>
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
    backgroundColor: '#f0f0f0', 
  },
  message: {
    textAlign: 'center',
    paddingBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  camera: {
    flex: 1,
    width: '80%', 
    height: '100%',
    borderRadius: 15,
    overflow: 'hidden'
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#6200ea',
    paddingVertical: 10,
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
