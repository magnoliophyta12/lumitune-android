import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Track } from "../../types/Track";
import { getArtistById } from "@/api/musicApi";
import { usePlayer } from "@/context/PlayerContext";
import TopMusicTrack from "../home/Track";


interface TopMusicProps {
  music: Track[];
}

export default function TopMusic({ music }: TopMusicProps) {
  const [artists, setArtists] = useState<Record<string, string>>({});
  const artistIds = Array.from(new Set(music.map((song) => song.artistId)));

  const { setTrack } = usePlayer();

  useEffect(() => {
    if (music.length > 0) {
      fetchArtistsNames();
    }
  }, [music]);

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

  const handleTrackClick = async (track: Track) => {
    try {
      await setTrack(track); 
      console.log('Playing:', track.name);
    } catch (e) {
      console.error('Error setting track:', e);
    }
  };

  return (
    <View>
      <Text style={styles.sectionTitle}>
        Вам до вподоби
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {music.map((track: any, index: number) => (
          <TopMusicTrack
            key={index}
            cover={track.coverUrl}
            artist={artists[track.artistId] || "Невідомий артист"}
            title={track.name || "Невідомий трек"}
            onClick={() => handleTrackClick(track)}
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
    marginBottom: 5,
    fontFamily:'Inter-Bold'
  },
  highlight: {
    color: "#00BFFF",
  },
  scroll: {
    marginTop: 12,
    marginHorizontal: -16,
  },
});
