import React from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import Artist from "./Artist";

const favArtists = [
  {
    image: require("../../assets/images/playlists/defaultPlaylist.png"),
    artist: "Blasterjaxx & Tom Swoon",
    monthlyListeners:100000
  },
  {
    image: require("../../assets/images/playlists/defaultPlaylist.png"),
    artist: "Blasterjaxx & Tom Swoon",
    monthlyListeners:100000
  },
  {
    image: require("../../assets/images/playlists/defaultPlaylist.png"),
    artist: "Blasterjaxx & Tom Swoon",
    monthlyListeners:100000
  },
];

export default function FavoriteArtists() {
  return (
    <View>
      <Text style={styles.sectionTitle}>
        Твої улюблені <Text style={styles.highlight}>виконавці</Text>
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {favArtists.map((artist, index) => (
          <Artist
            key={index}
            cover={artist.image}
            artist={artist.artist}
            monthlyListeners={artist.monthlyListeners}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
  },
  highlight: {
    color: "#00BFFF",
  },
  scroll: {
    marginTop: 12,
    marginHorizontal: -16,
  },
});
