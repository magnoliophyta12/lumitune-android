import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";

import { useRouter } from "expo-router";
import { styles } from "@/styles/favorite/banner";
import PlaylistTrack from "./PlaylistTrack";

type BannerProps = {
  playlistName: string; 
};


export default function Banner({playlistName}:BannerProps) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/common/heartsBg.png")}
        style={[styles.background]}
        resizeMode="cover"
        imageStyle={styles.imageRadius}
      >
        <View style={styles.mainBlock}>
            <Text style={styles.title}>Плейлист</Text>
            <Text style={styles.name}>{playlistName}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

