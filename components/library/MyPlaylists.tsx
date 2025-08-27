import { Playlist } from "@/types/Playlist";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import PlaylistItem from "./Playlist";
import { useRouter } from "expo-router";

const moods = [
  { label: "Хеппі", image: require("../../assets/images/moods/moodHappy.png") },
  {
    label: "Меланхолія",
    image: require("../../assets/images/moods/moodSad.png"),
  },
  {
    label: "Романтика",
    image: require("../../assets/images/moods/moodRomantic.png"),
  },
  { label: "Драйв", image: require("../../assets/images/moods/moodDrive.png") },
  { label: "Туса", image: require("../../assets/images/moods/moodParty.png") },
  { label: "Чілл", image: require("../../assets/images/moods/moodChill.png") },
  { label: "Фан", image: require("../../assets/images/moods/moodFun.png") },
];
const genres = [
  {
    label: "Новинки",
    image: require("../../assets/images/genres/genreNew.png"),
  },
  { label: "Поп", image: require("../../assets/images/genres/genrePop.png") },
  {
    label: "К-поп",
    image: require("../../assets/images/genres/genreKpop.png"),
  },
  { label: "Рок", image: require("../../assets/images/genres/genreRock.png") },
  {
    label: "Метал",
    image: require("../../assets/images/genres/genreMetal.png"),
  },
  { label: "Реп", image: require("../../assets/images/genres/genreRap.png") },
  {
    label: "Класика",
    image: require("../../assets/images/genres/genreClassic.png"),
  },
];

type MyPlaylistsProps = {
  playlists: Playlist[] | null;
};

export default function MyPlaylists({ playlists }: MyPlaylistsProps) {
  const router = useRouter();
  return (
    <>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Плейлисти</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {playlists?.map((playlist, index) => (
          <Pressable
            key={playlist.id || index} 
            onPress={() => {
              router.replace("/favorite");
            }}
          >
            <PlaylistItem
              cover={
                playlist.coverUrl?.url ||
                require("../../assets/images/playlists/defaultPlaylist.png")
              }
              title={playlist.name}
              trackQuantity={playlist.tracks?.length || "0"}
            />
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
export const styles = StyleSheet.create({
  titleWrap: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 24,
    alignItems: "center",
  },
  title: {
    color: "rgba(190, 244, 255, 1)",
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    marginRight: 8,
  },
  highlight: {
    color: "#00BFFF",
  },
  scroll: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  moodItem: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  moodCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1A1F2E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  moodImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  moodLabel: {
    color: "rgba(148, 210, 255, 1)",
    fontSize: 16,
    fontFamily: "CoreSans-Regular",
    marginTop: 5,
    fontWeight: "400",
  },
  dropdown: {
    position: "absolute",
    top: 16,
    left: 0,
    backgroundColor: "#2b3a50",
    borderRadius: 6,
    paddingVertical: 7,
    zIndex: 1000,
    width: 100,
  },
  dropdownItem: {
    paddingVertical: 6,
    fontSize: 16,
  },
  dropdownText: {
    marginLeft: 10,
    color: "rgba(190, 244, 255, 1)",
    fontFamily: "Inter-Bold",
  },
  activeItem: {
    backgroundColor: "rgba(60, 82, 97, 1)",
  },
  dropdownWrap: {
    position: "relative",
  },
});
