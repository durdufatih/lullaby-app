import { NavigationIconProps } from "@/constants/types";
import * as React from "react";
import { StyleSheet, Image } from "react-native";

export const NavigationIcon: React.FC<NavigationIconProps> = ({
  imageUrl,
  width,
  aspectRatio,
  marginTop = 0,
}) => {
  return (
    <Image
      resizeMode="contain"
      source={{ uri: imageUrl }}
      style={[
        styles.navigationIcon,
        { width, aspectRatio, marginTop },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  navigationIcon: {
    position: "relative",
    display: "flex",
    flexShrink: 0,
  },
});