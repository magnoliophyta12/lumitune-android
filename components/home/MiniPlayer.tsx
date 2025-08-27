import React, { useEffect, useState } from "react";
import { View, Text, Image, Pressable, ImageBackground } from "react-native";
import { styles } from "@/styles/home/miniPlayer";
import { usePlayer } from "@/context/PlayerContext";
import { Artist } from "@/types/Artist";
import {
  addTrackToPlaylist,
  getAlbumById,
  getArtistById,
  getPlaylistFavorites,
  getTrackById,
  removeTrackFromPlaylist,
  updateArtistListeners,
  updateTrackListeners,
} from "@/api/musicApi";
import { useRouter } from "expo-router";

const MiniPlayer = () => {
  const router = useRouter();
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    soundRef,
  } = usePlayer();
  const audio = soundRef.current;

  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const [albumCover, setAlbumCover] = useState<string>();
  const [currentTime, setCurrentTime] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!currentTrack) return;

    const fetchTrackData = async () => {
      try {
        const favorites = await getPlaylistFavorites();
        if (favorites) {
          const isFavorite = favorites.tracks.some(
            (track) => track.id === currentTrack.id
          );
          setIsLiked(isFavorite);
        }

        const fullTrack = await getTrackById(currentTrack.id);
        const [album, artist] = await Promise.all([
          getAlbumById(fullTrack.albumId),
          getArtistById(fullTrack.artistId),
        ]);
        setCurrentArtist(artist);
        setAlbumCover(album.cover.url);

        await Promise.all([
          updateArtistListeners(artist.id),
          updateTrackListeners(fullTrack.id),
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTrackData();
  }, [currentTrack]);

  const [duration, setDuration] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateTime = async () => {
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isLoaded && status.durationMillis !== undefined) {
          setCurrentTime(status.positionMillis / 1000);
          setDuration(status.durationMillis / 1000);
        }
      }
    };

    if (soundRef.current) {
      interval = setInterval(updateTime, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [soundRef.current]);

  const handleLikeToggle = async (trackId: string) => {
    const favorites = await getPlaylistFavorites();
    if (!favorites) return;
    if (!isLiked) {
      await addTrackToPlaylist(trackId, favorites.id);
    } else {
      await removeTrackFromPlaylist(trackId, favorites.id);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <ImageBackground
      source={require("../../assets/images/miniPlayer/miniPlayerBg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.trackWrap}>
          <View style={styles.imageWrap}>
            <Image source={{ uri: albumCover }} style={styles.image} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{currentTrack?.name}</Text>
            <Pressable
              onPress={() => {
                if (currentArtist?.id) {
                  router.push({
                    pathname: "/artist/[id]",
                    params: { id: currentArtist.id, 
                              name: currentArtist.user.username, 
                              cover: currentArtist.user.avatar?.url,
                              monthlyListeners: currentArtist.monthlyListeners,
                              bio:currentArtist.bio}
                             
                  });
                }
              }}
            >
              <Text style={styles.artist}>{currentArtist?.user.username}</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.addButton}
            onPress={() =>
              currentTrack?.id && handleLikeToggle(currentTrack.id)
            }
          >
            <Image
              source={
                !isLiked
                  ? require("../../assets/images/miniPlayer/miniPlayerAddIcon.png")
                  : require("../../assets/images/miniPlayer/likedIcon.png")
              }
              style={styles.addButton}
            />
          </Pressable>
          <Pressable
            style={styles.addButton}
            onPress={() => {
              togglePlayPause();
            }}
          >
            <Image
              source={
                isPlaying
                  ? require("../../assets/images/miniPlayer/miniPlayerStopIcon.png")
                  : require("../../assets/images/miniPlayer/miniPlayerPlayIcon.png")
              }
              style={styles.addButton}
            />
          </Pressable>
        </View>
        <View style={styles.progressBarWrap}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(currentTime / duration) * 100}%` },
              ]}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default MiniPlayer;
