import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import TextTicker from "react-native-text-ticker";
import { Marquee } from "@animatereactnative/marquee";

export default function PlaylistItem({ cover, title, artist, trackQuantity }: any) {
  return (
    <View style={styles.container}>
      <Image source={cover} style={styles.albumCover} />
      <View style={styles.textWrap}>
        <Marquee spacing={20} speed={0.3}>
          <Text style={styles.trackTitle}>{title}</Text>
        </Marquee>
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.trackArtist} ellipsizeMode="tail" numberOfLines={1}>
          {artist}
        </Text>
        <Text style={styles.trackQuantity} ellipsizeMode="tail" numberOfLines={1}>
          {trackQuantity} tracks
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    backgroundColor: "rgba(24, 43, 73, 0.5)",
    padding: 7,
    borderRadius: 8,
    overflow: "hidden",
  },
  albumCover: {
    height: 120,
    width: 120,
    borderRadius: 12,
  },
  trackTitle: {
    color: "rgba(240, 240, 240, 1)",
    fontSize: 14,
    fontFamily: "Inter-Bold",
    marginTop: 6,
  },
  trackArtist: {
    color: "rgba(240, 240, 240, 1)",
    fontSize: 12,
  },
  textWrap: {
    width: 120,
    overflow: "hidden",
  },
  trackQuantity:{
    color: "rgba(240, 240, 240, 1)",
    fontSize: 10,
  }
});
