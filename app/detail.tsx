import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, AppState } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo'dan Ionicons
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';
import { Picker } from '@react-native-picker/picker'; // Combobox için Picker
import { useFocusEffect } from '@react-navigation/native';

const imagePaths = {
  'lullaby1.jpg': require('../assets/images/lullaby1.jpg'),
  'lullaby2.jpg': require('../assets/images/lullaby2.jpg'),
  'lullaby3.jpg': require('../assets/images/lullaby3.jpg'),
  'lullaby4.jpg': require('../assets/images/lullaby4.jpg'),
  'lullaby5.jpg': require('../assets/images/lullaby5.jpg'),
  'lullaby6.jpg': require('../assets/images/lullaby6.jpg'),
};

// Map lullaby names to their respective audio files
const lullabyPaths = {
  'fisfis': require('../assets/sounds/fisfis.mp3'),
  'lullaby': require('../assets/sounds/lullaby.mp3'),
  'brahms': require('../assets/sounds/brahms.mp3'),
  'twinkle': require('../assets/sounds/twinkle.mp3'),
  'sleeping': require('../assets/sounds/sleeping.mp3'),
  'cradle': require('../assets/sounds/cradle.mp3'),
};

const DetailScreen = () => {
  const params = useLocalSearchParams();
  const { imagepath, name, pathName } = params;

  const [isPlaying, setIsPlaying] = useState(false); // Oynatma durumu
  const [currentTime, setCurrentTime] = useState(0); // Başlangıçta 0
  const [totalTime, setTotalTime] = useState(0); // Total time of the lullaby
  const [sound, setSound] = useState(null);
  const intervalRef = useRef(null); // Interval referansı
  const timeoutRef = useRef(null); // Timer referansı
  const [modalVisible, setModalVisible] = useState(false); // Modal görünürlüğü
  const [selectedDuration, setSelectedDuration] = useState(1); // Seçilen süre (dakika)
  const [isTimerMode, setIsTimerMode] = useState(false); // Zamanlayıcı modu
  const startTimeRef = useRef(0); // Çalma başlangıç zamanı
  const appState = useRef(AppState.currentState); // AppState referansı

  const imageSource = imagePaths[imagepath as keyof typeof imagePaths];

  useEffect(() => {
    loadSound();

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      subscription.remove();
    };
  }, [totalTime]);

  const loadSound = async () => {
    const lullabyPath = lullabyPaths[pathName];
    if (lullabyPath) {
      const { sound: newSound } = await Audio.Sound.createAsync(lullabyPath, { shouldPlay: false });
      setSound(newSound);

      // Get the duration of the audio
      const status = await newSound.getStatusAsync();
      if (status.isLoaded) {
        setTotalTime(status.durationMillis / 1000); // Convert milliseconds to seconds
      }
    } else {
      console.warn(`No lullaby found for name: ${name}`);
    }
  };

  const handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      if (isPlaying && sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    }
    appState.current = nextAppState;
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound && isPlaying) {
          sound.pauseAsync();
          setIsPlaying(false);
        }
      };
    }, [isPlaying, sound])
  );

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      await sound.playAsync();
      startTimeRef.current = Date.now() - currentTime * 1000;
      intervalRef.current = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          setCurrentTime((Date.now() - startTimeRef.current) / 1000); // Calculate elapsed time
          if (status.positionMillis >= status.durationMillis) {
            await sound.setPositionAsync(0);
            await sound.playAsync();
          }
        }
      }, 500); // Update every 500 milliseconds
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = async (value) => {
    startTimeRef.current = Date.now() - value * 1000; // Adjust start time based on slider value
    setCurrentTime(value);
    await sound.setPositionAsync(value * 1000 % totalTime); // Adjust sound position based on slider value
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleNextStoryPress = () => {
    setModalVisible(true);
  };

  const handleDurationChange = (itemValue) => {
    setSelectedDuration(itemValue);
  };

  const handleStartPlayback = async () => {
    setModalVisible(false);
    if (sound) {
      await sound.setPositionAsync(0);
      setCurrentTime(0);
      startTimeRef.current = Date.now();
      setIsPlaying(true);
      setIsTimerMode(true);

      await sound.playAsync();

      intervalRef.current = setInterval(async () => {
        const status = await sound.getStatusAsync();
        setCurrentTime((Date.now() - startTimeRef.current) / 1000); // Calculate elapsed time

        // Eğer ses dosyasının sonuna gelindiyse, yeniden başlat
        if (status.positionMillis >= status.durationMillis) {
          await sound.setPositionAsync(0);
          await sound.playAsync();
        }
      }, 500); // Her 500 milisaniyede bir güncelle

      // Belirtilen süre sonunda çalmayı durdur
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(async () => {
        await sound.stopAsync();
        setIsPlaying(false);
        setCurrentTime(0);
        setIsTimerMode(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, selectedDuration * 60 * 1000);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageSource} // image objesi veya imagepath string URL
        style={styles.coverImage}
      >
      </ImageBackground>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{name}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={isTimerMode ? selectedDuration * 60 : totalTime} // Set the maximum value to the total time of the lullaby or the selected duration
          value={currentTime}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#B22222"
          onSlidingComplete={handleSliderChange} // Update the audio position when the slider is moved
        />
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Text style={styles.time}>{formatTime(isTimerMode ? selectedDuration * 60 : totalTime)}</Text>
        </View>
        <TouchableOpacity style={[styles.playPauseButton, isPlaying ? styles.playingButton : {}]} onPress={togglePlayPause}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={48}
            color="#FFF"
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.controlButton, styles.nextButton]} onPress={handleNextStoryPress}>
            <Text style={styles.buttonText}>Time</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Duration</Text>
            <Picker
              selectedValue={selectedDuration}
              onValueChange={handleDurationChange}
              style={styles.picker}
            >
              <Picker.Item label="1 minute" value={1} />
              <Picker.Item label="10 minutes" value={10} />
              <Picker.Item label="20 minutes" value={20} />
              <Picker.Item label="30 minutes" value={30} />
            </Picker>
            <TouchableOpacity style={styles.modalButton} onPress={handleStartPlayback}>
              <Text style={styles.modalButtonText}>Start Playback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  time: {
    fontSize: 16,
    color: '#333',
  },
  playPauseButton: {
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: 'red', // Play butonunun arka plan rengi kırmızı
    borderRadius: 50,
    padding: 10,
  },
  playingButton: {
    backgroundColor: 'darkred',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: '#1EB1FC',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#1EB1FC',
    padding: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;