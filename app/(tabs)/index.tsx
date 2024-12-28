import { Link } from "expo-router";
import * as React from "react";
import { View, StyleSheet, Image, Text, ImageBackground, ScrollView, TouchableOpacity } from "react-native";

const lullabies = [
  { id: '1', name: 'Dandini Dandini', image: require('../../assets/images/lullaby1.jpg'),imagepath:'lullaby1.jpg', path: require('../../assets/sounds/lullaby.mp3'),pathName:"lullaby" },
  { id: '2', name: 'Fis Fis', image: require('../../assets/images/lullaby2.jpg'),imagepath:'lullaby2.jpg', path: require('../../assets/sounds/fisfis.mp3'),pathName:"fisfis" },
  { id: '3', name: 'Brahms', image: require('../../assets/images/lullaby3.jpg'),imagepath:'lullaby3.jpg', path: require('../../assets/sounds/brahms.mp3'),pathName:"brahms" },
  { id: '4', name: 'Twinkle', image: require('../../assets/images/lullaby4.jpg'),imagepath:'lullaby4.jpg', path: require('../../assets/sounds/twinkle.mp3'),pathName:"twinkle" },
  { id: '5', name: 'Sleeping', image: require('../../assets/images/lullaby5.jpg'),imagepath:'lullaby5.jpg', path: require('../../assets/sounds/sleeping.mp3'),pathName:"sleeping" },
  { id: '6', name: 'Cradle', image: require('../../assets/images/lullaby6.jpg'),imagepath:'lullaby6.jpg', path: require('../../assets/sounds/cradle.mp3'),pathName:"cradle" },
];

export default function HomeScreen() {
  return (
    <View style={styles.playerContainer}>
      <ImageBackground
        resizeMode="cover"
        source={{ uri: "https://cdn.builder.io/api/v1/image/assets/1e4efda9c0cb49aa8ee1032499da7a38/9e5a4b0b086b01b4e3fb76b602fcade564e1da9293942e7d7a6af8fbfe137a38?apiKey=1e4efda9c0cb49aa8ee1032499da7a38&" }}
        style={styles.headerBackground}
      >
      </ImageBackground>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Children's Podcast</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.podcastList}>
          {lullabies.map((lullaby) => (
            <Link key={lullaby.id} href={{ pathname: "/detail", params: { ...lullaby } }}>
              <View style={styles.podcastItem}>
                <Image source={lullaby.image} style={styles.podcastImage} />
                <Text style={styles.podcastTitle}>{lullaby.name}</Text>
                <TouchableOpacity style={styles.playButton}>
                  <Image
                    source={{ uri: "https://cdn-icons-png.flaticon.com/512/727/727245.png" }} // Play icon URL
                    style={styles.playIcon}
                  />
                </TouchableOpacity>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  playerContainer: {
    borderColor: "rgba(0, 0, 0, 1)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    overflow: "hidden",
    alignItems: "center",
    flex: 1,
  },
  scrollView: {
    width: "100%",
  },
  podcastList: {
    flexDirection: "column",
    gap: 20,
    width: "100%",
    padding: 10,
  },
  podcastItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Öğeleri iki uçta hizalamak için
    gap: 15,
    backgroundColor: "#f0f0f0",
    padding: 10,
    width: "100%",
    borderRadius: 8,
  },
  podcastImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  podcastTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1, // Başlık metninin kalan alanı kaplamasını sağlar
  },
  headerBackground: {
    alignSelf: "stretch",
    position: "relative",
    display: "flex",
    minHeight: 300, // Küçültülmüş yükseklik
    width: "100%",
    paddingBottom: 20, // Küçültülmüş padding
    gap: 20,
    fontFamily: "Inter, sans-serif",
    fontSize: 14,
    color: "rgba(0, 0, 0, 1)",
    fontWeight: "600",
    flexWrap: "wrap",
    justifyContent: "space-between",
    aspectRatio: 1.3, // Küçültülmüş aspect ratio
  },
  timeDisplay: {
    position: "relative",
    marginTop: 11,
  },
  headerBar: {
    borderRadius: 30,
    position: "relative",
    display: "flex",
    width: 156,
    flexShrink: 0,
    height: 19,
  },
  headerIcon: {
    position: "relative",
    display: "flex",
    marginTop: 13,
    width: 67,
    flexShrink: 0,
    aspectRatio: 6.1,
  },
  titleContainer: {
    marginTop: 12,
  },
  mainTitle: {
    color: "rgba(37, 46, 128, 1)",
    fontSize: 24,
    fontFamily: "Expletus Sans, sans-serif",
    fontWeight: "700",
  },
  navigationBar: {
    alignSelf: "stretch",
    display: "flex",
    marginTop: 20,
    width: "100%",
    paddingLeft: 55,
    paddingRight: 55,
    paddingBottom: 7,
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20, // Yuvarlak buton
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f3f3", // Play butonuna arka plan ekledim
  },
  playIcon: {
    width: 24,
    height: 24,
  }
});