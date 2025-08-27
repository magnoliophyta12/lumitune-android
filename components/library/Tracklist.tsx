import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  Image,
} from "react-native";

import PlaylistTrack from "./PlaylistTrack";
import {
  getAlbumById,
  getArtistById,
  getPlaylistFavorites,
} from "@/api/musicApi";
import { Playlist } from "@/types/Playlist";
import { Track } from "@/types/Track";
import { usePlayer } from "@/context/PlayerContext";
import MiniPlayer from "../home/MiniPlayer";
import { useSharedValue } from "react-native-reanimated";
import { SCREEN_HEIGHT } from "../home/Home";
import FullPlayer from "../home/FullPlayer";

type TracklistProps = {
  avatarUrl: string;
  username: string | null;
  trackCount: string;
};

export default function Tracklist({
  avatarUrl,
  username,
  trackCount,
}: TracklistProps) {
  const [favoriteTracks, setFavoriteTracks] = useState<Playlist | null>(null);
  const [albums, setAlbums] = useState<Record<string, string>>({});
  const [artists, setArtists] = useState<Record<string, string>>({});
  const [albumCovers, setAlbumCovers] = useState<Record<string, string>>({});
  const [releaseDate, setReleaseDate] = useState<Record<string, string>>({});

  const { setTrack } = usePlayer();
  const handleTrackClick = async (track: Track) => {
    try {
      await setTrack(track);
      console.log("Playing:", track.name);
    } catch (e) {
      console.error("Error setting track:", e);
    }
  };

  const albumIds = Array.from(
    new Set(
      favoriteTracks?.tracks.map((song: { albumId: any }) => song.albumId)
    )
  );
  const artistIds = Array.from(
    new Set(
      favoriteTracks?.tracks.map((song: { artistId: any }) => song.artistId)
    )
  );
  useEffect(() => {
    if (favoriteTracks?.tracks) {
      fetchAlbumCovers();
      fetchAlbumNames();
      fetchArtistsNames();
      fetchReleaseDates();
    }
  }, [favoriteTracks]);
  const fetchAlbumNames = async () => {
    const albumMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        albumMap[id] = album.name;
      } catch (error) {
        console.error("Error", id, error);
        albumMap[id] = "Невідомий альбом";
      }
    });

    await Promise.all(requests);
    setAlbums(albumMap);
  };
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
  const fetchAlbumCovers = async () => {
    const albumMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        albumMap[id] = album.cover.url;
      } catch (error) {
        console.error("Errorу", id, error);
        albumMap[id] = "Невідомий альбом";
      }
    });

    await Promise.all(requests);
    setAlbumCovers(albumMap);
  };
  const fetchReleaseDates = async () => {
    const releaseMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        releaseMap[id] = album.relDate;
      } catch (error) {
        console.error("Error", id, error);
        releaseMap[id] = "Невідома дата";
      }
    });

    await Promise.all(requests);
    setReleaseDate(releaseMap);
  };

  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    soundRef,
    volume,
    setVolume,
  } = usePlayer();
  useEffect(() => {
    const fetchFavoriteTracks = async () => {
      const data = await getPlaylistFavorites();
      if (data) {
        setFavoriteTracks(data);
      }
    };
    fetchFavoriteTracks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.creatorInfo}>
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.creatorInfoText}>{username || "username"}</Text>
        <Text style={styles.creatorInfoText}>•</Text>
        <Text style={styles.creatorInfoText}>
          {favoriteTracks?.tracks.length}
        </Text>
        <Text style={styles.creatorInfoText}>трек(а\ів)</Text>
      </View>
      <View style={styles.tracksWrap}>
        {favoriteTracks?.tracks.map((track) => (
          <PlaylistTrack
            key={track.id}
            cover={{ uri: albumCovers[track.albumId] }}
            title={track.name}
            artist={artists[track.artistId] || "Невідомий артист"}
            albumName={albums[track.albumId] || "Невідомий альбом"}
            releaseDate={releaseDate[track.albumId] || "Невідома дата"}
            duration={`${Math.floor(track.duration / 60)}:${(
              track.duration % 60
            )
              .toString()
              .padStart(2, "0")}`}
            onClick={() => handleTrackClick(track)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 23,
    borderWidth: 5,
    borderColor: "rgba(69, 96, 144, 0.19)",
  },
  creatorInfoText: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "CoreSans-Regular",
  },
  tracksWrap: {
    marginTop: 15,
  },
});
