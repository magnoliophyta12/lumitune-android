import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

export default function PlaylistTrack({
  cover,
  title,
  artist,
  albumName,
  releaseDate,
  duration,
  onClick,
}: any) {
  return (
    <Pressable onPress={onClick}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={cover}
              style={styles.image}
            />
          </View>
    
          <View style={styles.songWrap}>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
              {title}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.artist}>
              {artist}
            </Text>
          </View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.albumName}>
              {albumName}
            </Text>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.releaseDate}>
              {releaseDate}
            </Text>
          <Text style={styles.duration}>{duration}</Text>
        </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(24, 43, 73, 0.3)",
    height: 64,
    borderRadius: 8,
    marginVertical: 10,
    gap:15
  },
  imageContainer: {
    height: 64,
    width: 64,
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  image: {
    height: 64,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  songWrap: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  releaseDate:{
    color: "rgba(239, 251, 255, 1)",
  },
  albumName:{
    width: 40,
    color: "rgba(239, 251, 255, 1)",
  },
  artist: {
    color: "rgba(170, 170, 170, 1)",
    fontSize: 13,
  },
  duration: {
    color: "rgba(239, 251, 255, 1)",
    fontSize: 14,
    marginRight: 10,
  },
  seqNumber: {
    color: "white",
    fontSize: 16,
    width: 24,
    textAlign: "center",
    marginHorizontal: 10,
  },
});
