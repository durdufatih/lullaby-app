import LullabyCard from '@/components/LullabyCard';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const colicSounds = [
  { id: '1', name: 'Kolik Ses 1', image: require('../../assets/images/lullaby1.jpg') },
  { id: '2', name: 'Kolik Ses 2', image: require('../../assets/images/lullaby2.jpg') },
  { id: '3', name: 'Kolik Ses 3', image: require('../../assets/images/lullaby3.jpg') },
  { id: '4', name: 'Kolik Ses 4', image: require('../../assets/images/lullaby4.jpg') },
  { id: '5', name: 'Kolik Ses 5', image: require('../../assets/images/lullaby5.jpg') },
  { id: '6', name: 'Kolik Ses 6', image: require('../../assets/images/lullaby6.jpg') },
];

export default function ColicSoundsScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={colicSounds} style={{marginTop: 50}}
        renderItem={({ item }) => <LullabyCard lullaby={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
});