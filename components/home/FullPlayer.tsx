import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from "react-native-gesture-handler";
import { usePlayer } from "@/context/PlayerContext";
import Track from "../fullPlayer/Track";
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
import { Artist } from "@/types/Artist";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function FullPlayer({ translateY }: any) {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    soundRef,
    volume,
    setVolume,
  } = usePlayer();
  const audio = soundRef.current;

  const [currentArtist, setCurrentArtist] = useState<Artist>();
  const [albumCover, setAlbumCover] = useState<string>();
  const [albumName, setAlbumName] = useState<string>();
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
        setAlbumName(album.name);

        await Promise.all([
          updateArtistListeners(artist.id),
          updateTrackListeners(fullTrack.id),
        ]);
      } catch (error) {
        console.error("Помилка при завантаженні даних треку:", error);
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

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isScrollAtTop = useSharedValue(true);

  const scrollRef = useRef(null);

  const onClose = () => {
    console.log("Closed");
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (isScrollAtTop.value && event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 150) {
        translateY.value = withTiming(SCREEN_HEIGHT, {
          duration: 300,
          easing: Easing.in(Easing.ease),
        });
        runOnJS(onClose)();
      } else {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
      }
    })
    .simultaneousWithExternalGesture(scrollRef);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        <ImageBackground
          source={require("../../assets/images/fullPlayer/bg.png")}
          style={styles.background}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <ScrollView
            simultaneousHandlers={scrollRef}
            ref={scrollRef}
            scrollEventThrottle={16}
            onScroll={(e) => {
              isScrollAtTop.value = e.nativeEvent.contentOffset.y <= 0;
            }}
            contentContainerStyle={styles.scrollContent}
            style={{ flex: 1 }}
          >
            <View style={styles.container}>
              <View style={styles.topElements}>
                <Pressable
                  onPress={() => {
                    translateY.value = withTiming(SCREEN_HEIGHT, {
                      duration: 300,
                      easing: Easing.in(Easing.ease),
                    });
                    runOnJS(onClose)();
                  }}
                >
                  <Image
                    source={require("../../assets/images/fullPlayer/closeFullPlayerIcon.png")}
                  />
                </Pressable>
                <Text style={styles.albumName} ellipsizeMode="tail">
                  {albumName}
                </Text>
                <Pressable>
                  {/* <Image
                    source={require("../../assets/images/fullPlayer/moreOptionsIcon.png")}
                  /> */}
                </Pressable>
              </View>
              <Image source={{ uri: albumCover }} style={styles.albumCover} />
              <View style={styles.songLikeWrap}>
                <View style={styles.songWrap}>
                  <Text style={styles.songTitle}>{currentTrack?.name}</Text>
                  <Text style={styles.artistName}>
                    by {currentArtist?.user.username}
                  </Text>
                </View>
                <Pressable
                  onPress={() =>
                    currentTrack?.id && handleLikeToggle(currentTrack.id)
                  }
                >
                  <Image
                    source={
                      !isLiked
                        ? require("../../assets/images/common/likeInactive.png")
                        : require("../../assets/images/common/likeActive.png")
                    }
                    style={styles.likeIcon}
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
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                  <Text style={styles.timeText}>
                    {formatTime(currentTrack?.duration || 0)}
                  </Text>
                </View>
              </View>
              <View style={styles.actionIcons}>
                <Image
                  source={require("../../assets/images/fullPlayer/repeatIcon.png")}
                />
                <Image
                  source={require("../../assets/images/fullPlayer/prevIcon.png")}
                />
                <Pressable
                  onPress={() => {
                    togglePlayPause();
                  }}
                >
                  <Image
                    source={
                      isPlaying
                        ? require("../../assets/images/playlists/stopButtonBig.png")
                        : require("../../assets/images/playlists/playButtonBig.png")
                    }
                  />
                </Pressable>
                <Image
                  source={require("../../assets/images/fullPlayer/nextIcon.png")}
                />
                <Image
                  source={require("../../assets/images/fullPlayer/shuffleIcon.png")}
                />
              </View>
              {/* <View style={styles.tracks}>
                <Track
                  title={trackToShow.title}
                  artist={trackToShow.artist}
                  duration={trackToShow.duration}
                  isPlaying={trackToShow.isPlaying}
                  seqNumber={trackToShow.seqNumber}
                ></Track>
                <Track
                  title={trackToShow.title}
                  artist={trackToShow.artist}
                  duration={trackToShow.duration}
                  isPlaying={trackToShow.isPlaying}
                  seqNumber={trackToShow.seqNumber}
                ></Track>
                <Track
                  title={trackToShow.title}
                  artist={trackToShow.artist}
                  duration={trackToShow.duration}
                  isPlaying={trackToShow.isPlaying}
                  seqNumber={trackToShow.seqNumber}
                ></Track>
                <Track
                  title={trackToShow.title}
                  artist={trackToShow.artist}
                  duration={trackToShow.duration}
                  isPlaying={trackToShow.isPlaying}
                  seqNumber={trackToShow.seqNumber}
                ></Track>
                <Track
                  title={trackToShow.title}
                  artist={trackToShow.artist}
                  duration={trackToShow.duration}
                  isPlaying={trackToShow.isPlaying}
                  seqNumber={trackToShow.seqNumber}
                ></Track>
                <Track
                  title={trackToShow.title}
                  artist={trackToShow.artist}
                  duration={trackToShow.duration}
                  isPlaying={trackToShow.isPlaying}
                  seqNumber={trackToShow.seqNumber}
                ></Track>
                
              </View> */}
            </View>
          </ScrollView>
        </ImageBackground>
      </Animated.View>
    </GestureDetector>
  );
}
const styles = StyleSheet.create({
  animatedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    zIndex: 9999,
    elevation: 9999, 
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 100,
  },
  background: {
    flex: 1,
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    padding: 20,
  },
  topElements: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  albumName: {
    color: "rgba(212, 212, 212, 1)",
    fontSize: 16,
  },
  albumCover: {
    width: "100%",
    height: 300,
    marginVertical: 20,
  },
  songLikeWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songWrap: {},
  songTitle: {
    color: "#fff",
    fontSize: 18,
  },
  artistName: {
    color: "#aaa",
    fontSize: 14,
  },
  likeIcon: {
    width: 24,
    height: 24,
  },
  progressBarWrap: {
    marginTop: 20,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#888",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: "#4A90E2",
    borderRadius: 3,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  timeText: {
    color: "#fff",
    fontSize: 12,
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    alignItems: "center",
    marginTop: 20,
  },
  tracks: {
    marginTop: 30,
    flexDirection: "column",
    gap: 15,
  },
});
