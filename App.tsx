import { Constants } from 'expo';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  UIManager
} from 'react-native';
import Game from './screens/Game';
import Start from './screens/Start';
import { getRandomImage } from './utils/api';
import { createPuzzle } from './utils/puzzle';


if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BACKGROUND_COLORS = ['#1B1D34', '#2A2A38'];

export const App: React.FC = () => {
  const [size, setSize] = useState(3)
  const [puzzle, setPuzzle] = useState<any>(null)
  const [image, setImage] = useState<{ uri: string } | null>(null)

  const preloadNextImage = async () => {
    const newImage = await getRandomImage()
    Image.prefetch(newImage.uri);
    setImage(newImage)
  }

  useEffect(() => {
    preloadNextImage() 
  }, [])

  const handleStartGame = () => {
    setPuzzle(createPuzzle(size));
  };

  const handleQuit = () => {
    setPuzzle(null)
    setImage(null)
    preloadNextImage();
  };

  return (
    <LinearGradient
      style={styles.background}
      colors={BACKGROUND_COLORS}
    >
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        {!puzzle && (
          <Start
            size={size}
            onStartGame={handleStartGame}
            onChangeSize={setSize}
          />
        )}
        {puzzle && (
          <Game
            puzzle={puzzle}
            image={image}
            onChange={setPuzzle}
            onQuit={handleQuit}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || parseInt("" + Platform.Version, 10) < 11
        ? Constants.statusBarHeight
        : 0,
  },
});
