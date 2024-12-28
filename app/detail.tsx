import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Expo'dan Ionicons
import Slider from '@react-native-community/slider';
import { Audio } from 'expo-av';

const sound = new Audio.Sound();

const imagePaths = {
  'lullaby1.jpg': require('../assets/images/lullaby1.jpg'),
  'lullaby2.jpg': require('../assets/images/lullaby2.jpg'),
  'lullaby3.jpg': require('../assets/images/lullaby3.jpg'),
  'lullaby4.jpg': require('../assets/images/lullaby4.jpg'),
  'lullaby5.jpg': require('../assets/images/lullaby5.jpg'),
  'lullaby6.jpg': require('../assets/images/lullaby6.jpg'),
};

const DetailScreen = () => {
  const params = useLocalSearchParams();
  const { imagepath, name } = params;
  const [isPlaying, setIsPlaying] = useState(false); // Oynatma durumu
  const [currentTime, setCurrentTime] = useState(0); // Başlangıçta 0
  const [totalTime, setTotalTime] = useState(0); // Total time of the lullaby

  const imageSource = imagePaths[imagepath as keyof typeof imagePaths];

  const togglePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      // Reset current time to 0 when starting the lullaby
      setCurrentTime(0);
      
      // Load and play the lullaby
      const lullabyPath = require(`../assets/sounds/fisfis.mp3`); // 'name' parametresinden gelen ninni adı
      await sound.loadAsync(lullabyPath);
      await sound.playAsync();

      // Get the duration of the audio
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setTotalTime(status.durationMillis / 1000); // Convert milliseconds to seconds
      }
      
      // Update the slider as the song plays
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isPlaying) {
          setCurrentTime(status.positionMillis / 1000); // Convert milliseconds to seconds
        } else {
          clearInterval(interval); // Clear interval when the song is not playing
        }
      }, 100); // Update every 100 milliseconds
    }
    setIsPlaying(!isPlaying);
  };

  const handleSliderChange = async (value) => {
    setCurrentTime(value);
    await sound.setPositionAsync(value * 1000); // Convert seconds to milliseconds
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
          maximumValue={totalTime} // Set the maximum value to the total time of the lullaby
          value={currentTime}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#B22222"
          onValueChange={handleSliderChange} // Update the audio position when the slider is moved
        />
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{formatTime(currentTime)}</Text>
          <Text style={styles.time}>{formatTime(totalTime)}</Text>
        </View>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={48}
            color="#FFF"
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.controlButton, styles.nextButton]}>
            <Text style={styles.buttonText}>Next story</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.restartButton]}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0FFFF',
  },
  coverImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subHeaderText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  time: {
    fontSize: 14,
    color: '#696969',
  },
  playPauseButton: {
    backgroundColor: '#FF6347',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  controlButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#FF7F7F',
    marginRight: 10,
  },
  restartButton: {
    backgroundColor: '#3CB371',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;