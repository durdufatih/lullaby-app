import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function LullabyCard({ lullaby }) {
  return (
    <View style={styles.card}>
      <Image source={lullaby.image} style={styles.image} />
      <Text style={styles.text}>{lullaby.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e0f7fa', // Hafif açık bir renk
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  text: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});