import { Lullaby, PodcastItemProps } from "@/constants/types";
import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

export const PodcastItem: React.FC<Lullaby> = ({ name, duration, image,path }) => {
  return (
    <View style={styles.podcastItemContainer}>
      <Image
        resizeMode="contain"
        source={image}
        style={styles.podcastThumbnail}
      />
      <View style={styles.podcastDetails}>
        <View style={styles.titleContainer}>
          <Text style={styles.podcastTitle}>{name}</Text>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.podcastDuration}>{duration}</Text>
        </View>
      </View>
      <View style={styles.playButton} >
      <TouchableOpacity style={styles.playIconContainer}>
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/727/727245.png" }} // Play icon URL
          style={styles.playIcon}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  podcastItemContainer: {
    borderRadius: 25,
    borderColor: "rgba(0, 0, 0, 0.47)",
    borderStyle: "solid",
    borderWidth: 1,
    display: "flex",
    width: "100%",
    maxWidth: 100,
    alignItems: "stretch",
    gap: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  podcastThumbnail: {
    position: "relative",
    display: "flex",
    width: 60,
    flexShrink: 0,
  },
  podcastDetails: {
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    flexDirection: "column",
    alignItems: "stretch",
  },
  titleContainer: {},
  podcastTitle: {
    color: "rgba(22, 66, 224, 1)",
    fontFamily: "Expletus Sans, sans-serif",
    fontSize: 20,
    fontWeight: "600",
  },
  durationContainer: {},
  podcastDuration: {
    color: "rgba(66, 77, 116, 1)",
    alignSelf: "center",
    fontFamily: "Expletus Sans, sans-serif",
    fontSize: 20,
    fontWeight: "600",
  },
  playButton: {
    borderRadius: 50,
    display: "flex",
    marginTop: "auto",
    marginBottom: "auto",
    width: 58,
    flexShrink: 0,
    height: 55,
  },
  playIconContainer: {
    marginLeft: 'auto',
    padding: 10,
  },
  playIcon: {
    width: 24,
    height: 24,
  },
});