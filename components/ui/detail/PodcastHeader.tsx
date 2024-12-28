import { PodcastHeaderProps } from '@/constants/types';
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export const PodcastHeader: React.FC<PodcastHeaderProps> = ({ title, description }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.descriptionText}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    marginTop: 14,
    width: '100%',
    paddingHorizontal: 56,
    flexDirection: 'column',
  },
  titleText: {
    color: '#022723',
    fontSize: 24,
    fontFamily: 'Expletus Sans, sans-serif',
    fontWeight: '700',
    alignSelf: 'center',
  },
  descriptionText: {
    color: '#4B776F',
    fontSize: 24,
    fontFamily: 'Expletus Sans, sans-serif',
    fontWeight: '500',
    marginTop: 14,
  },
});