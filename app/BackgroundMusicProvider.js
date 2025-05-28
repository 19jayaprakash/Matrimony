import { Audio } from 'expo-av';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, TouchableWithoutFeedback, View } from 'react-native';

const BackgroundMusicContext = createContext();

export const useBackgroundMusic = () => {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusic must be used within BackgroundMusicProvider');
  }
  return context;
};

export const BackgroundMusicProvider = ({ children, musicSource }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize audio session
  useEffect(() => {
    const initializeAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.error('Error setting audio mode:', error);
      }
    };

    initializeAudio();
  }, []);

  // Load music
  useEffect(() => {
    if (musicSource) {
      loadMusic();
    }

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [musicSource]);

  // Auto-play after user interaction
  useEffect(() => {
    if (hasUserInteracted && isReady && !isPlaying) {
      playMusic();
    }
  }, [hasUserInteracted, isReady]);

  // Handle app state changes
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        // Keep playing in background
        return;
      }
      
      if (nextAppState === 'active' && hasUserInteracted && !isPlaying) {
        resumeMusic();
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [isPlaying, hasUserInteracted]);

  const loadMusic = async () => {
    try {
      setIsLoading(true);
      
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        musicSource,
        {
          shouldPlay: false,
          isLooping: true,
          volume: 0.3, // Set to moderate volume
        }
      );

      setSound(newSound);
      setIsReady(true);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        setIsPlaying(status.isPlaying);
        setIsLoading(status.isLoaded ? false : isLoading);
      });

    } catch (error) {
      console.error('Error loading background music:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playMusic = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing music:', error);
    }
  };

  const resumeMusic = async () => {
    try {
      if (sound && !isPlaying) {
        await sound.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error resuming music:', error);
    }
  };

  // Function to trigger music on first user interaction
  const triggerMusicOnInteraction = () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  };

  const value = {
    isPlaying,
    isLoading,
    hasUserInteracted,
    isReady,
    triggerMusicOnInteraction,
  };

  return (
    <BackgroundMusicContext.Provider value={value}>
      {children}
    </BackgroundMusicContext.Provider>
  );
};

// InteractionDetector.js - Component to detect first user interaction


export const InteractionDetector = ({ children }) => {
  const { triggerMusicOnInteraction, hasUserInteracted } = useBackgroundMusic();

  const handleInteraction = () => {
    if (!hasUserInteracted) {
      triggerMusicOnInteraction();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleInteraction}>
      <View style={{ flex: 1 }} pointerEvents={hasUserInteracted ? 'box-none' : 'auto'}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};