import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AudioControl = ({ isPlaying, onPlayPausePress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPlayPausePress} style={styles.button}>
        <Ionicons
          name={isPlaying ? "pause" : "play"}
          size={32}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    padding: 20,
  },
});

export default AudioControl;