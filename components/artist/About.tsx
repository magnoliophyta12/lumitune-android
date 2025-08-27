import { Track } from "@/types/Track";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import PlaylistTrack from "../library/PlaylistTrack";
import { getAlbumById, getArtistById } from "@/api/musicApi";
import { usePlayer } from "@/context/PlayerContext";

interface AboutProps {
  monthlyListeners: string;
  bio: string;
  cover: string;
}

export default function PopularTracks({
  monthlyListeners,
  bio,
  cover,
}: AboutProps) {
  return (
    <View>
      <Text style={styles.popularTitle}>Про <Text style={styles.highlight}>виконавця</Text></Text>
      <Image source={{ uri: cover }} style={styles.cover} />
      <Text style={styles.monthlyListeners}>{monthlyListeners} слухачів на місяць</Text>
      <Text style={styles.bio}>{bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  popularTitle: {
    color: "rgba(191, 237, 253, 1)",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    marginVertical: 15,
  },
  cover: {
    width: "100%",
    height: 351,
    borderRadius: 16,
    position:'relative'
  },
  monthlyListeners:{
    position:'absolute',
    bottom:15,
    left:10,
    color:'rgba(255, 255, 255, 1)',
    fontSize:16,
    fontFamily:'Inter-Bold',
    height:'10%',
    width:'100%'
  },
  bio:{
    fontFamily:'CoreSans-Regular',
    color:'rgba(255, 255, 255, 1)',
    fontSize:14,
    marginLeft:10,
    marginTop:10
  },
  highlight:{
    color: "#00BFFF",
  }
});
