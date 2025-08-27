import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Artist({ cover, artist, monthlyListeners }: any) {
  return (
    <View style={styles.container}>
      <Image source={cover} style={styles.cover} />
      <Text style={styles.artist} ellipsizeMode="tail" numberOfLines={1}>{artist}</Text>
      <Text style={styles.monthlyListeners} ellipsizeMode="tail" numberOfLines={1}>{monthlyListeners}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    padding: 7,
    borderRadius: 8,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    gap:5
  },
  cover: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  artist: {
    color: "rgba(240, 240, 240, 1)",
    fontSize: 16,
  },
  monthlyListeners: {
    color: "rgba(240, 240, 240, 1)",
    fontSize: 12,
  },
});
