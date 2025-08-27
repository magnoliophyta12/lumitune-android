import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView} from "react-native";
import NewReleaseAlbum from "./Album";
import { Album } from "@/types/Album";
import { getAlbumById, getArtistById } from "@/api/musicApi";

const topAlbums = [
  {
    image: require("../../assets/images/playlists/defaultPlaylist.png"),
    title: "Blasterjaxx & Tom Swoon",
    artist: "Blasterjaxx & Tom Swoon",
    trackQuantity:10
  },
  {
    image: require("../../assets/images/playlists/defaultPlaylist.png"),
    title: "Blasterjaxx & Tom Swoon",
    artist: "Blasterjaxx & Tom Swoon",
    trackQuantity:10
  },
  {
    image: require("../../assets/images/playlists/defaultPlaylist.png"),
    title: "Blasterjaxx & Tom Swoon",
    artist: "Blasterjaxx & Tom Swoon",
    trackQuantity:10
  },
];

interface NewReleasesProps {
  albums: Album[];
}

export default function NewReleases({albums}:NewReleasesProps) {
  const [artists, setArtists] = useState<Record<string, string>>({});
  const [ tracksQnt, setTracksQnt ] = useState<Record<string, number>>({});
  const artistIds = Array.from(new Set(albums.map((song) => song.artistId)));
  const albumIds = Array.from(new Set(albums.map(album => album.id)));
  
  useEffect(() => {
    if (albums.length > 0) {
      fetchArtistsNames();
      fetchTracksQnt();
    }
  }, [albums]);

  const fetchArtistsNames = async () => {
    const artistMap: Record<string, string> = {};

    const requests = artistIds.map(async (id) => {
      try {
        const artist = await getArtistById(id);
        artistMap[id] = artist.user.username;
      } catch (error) {
        console.error("Error", id, error);
        artistMap[id] = "Невідомий артист";
      }
    });

    await Promise.all(requests);
    setArtists(artistMap);
  };
  const fetchTracksQnt = async () => {
    const tracksMap: Record<string, number> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        tracksMap[id] = album.tracks?.length || 0;
      } catch (error) {
        console.error("Помилка при отриманні кількості треків альбому:", id, error);
        tracksMap[id] = 0;
      }
    });
    await Promise.all(requests);
    setTracksQnt(tracksMap);
  };
  return (
    <View>
      <Text style={styles.sectionTitle}>
        Нові <Text style={styles.highlight}>музичні</Text> релізи
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {albums.map((album:any, index:number) => (
          <NewReleaseAlbum
            key={index}
            cover={album.cover.url}
            artist={artists[album.artistId] || "Невідомий артист"}
            title={album.name || "Невідомий альбом"}
            trackQuantity={tracksQnt[album.id]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "rgba(190, 244, 255, 1)",
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
