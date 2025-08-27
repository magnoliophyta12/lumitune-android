import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";

export default function Track({
  title,
  artist,
  duration,
  isPlaying,
  seqNumber,
}: any) {
  return (
    <View style={styles.container}>
      {isPlaying ? (
        <Image
          source={require("../../assets/images/common/playingNow.png")}
          style={styles.icon}
        />
      ) : (
        <Text style={styles.seqNumber}>{seqNumber}</Text>
      )}

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/playlists/defaultPlaylist.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.songWrap}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.artist}>
          by {artist}
        </Text>
      </View>

      <Text style={styles.duration}>{duration}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(24, 43, 73, 0.3)",
    paddingHorizontal: 8,
    height: 64,
    borderRadius:8
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  imageContainer: {
    height: 64,
    width: 64,
    marginHorizontal: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    height: 64,
    aspectRatio: 1,
    resizeMode: 'contain',
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
  artist: {
    color: "rgba(170, 170, 170, 1)",
    fontSize: 13,
  },
  duration: {
    color: "rgba(239, 251, 255, 1)",
    fontSize: 14,
    marginRight:10,
    marginLeft:20
  },
  seqNumber: {
    color: "white",
    fontSize: 16,
    width: 24,
    textAlign: "center",
    marginHorizontal:10
  },
});
