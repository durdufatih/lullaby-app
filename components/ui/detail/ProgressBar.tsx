// ProgressBar.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ currentTime, totalTime }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{currentTime}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: '50%' }]} />
      </View>
      <Text style={styles.timeText}>{totalTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    borderRadius: 5,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
});

export default ProgressBar;