import BottomNavigation from "@/components/home/BottomNavigation";
import Header from "@/components/common/Header";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { View, ScrollView, Text,Image } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import Banner from "@/components/library/Banner";
import Tracklist from "@/components/library/Tracklist";
import MiniPlayer from "@/components/home/MiniPlayer";
import FullPlayer from "@/components/home/FullPlayer";
import { usePlayer } from "@/context/PlayerContext";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { SCREEN_HEIGHT } from "@/components/home/Home";
import { Track } from "@/types/Track";

export default function MoodGenrePage() {
  const router = useRouter();
  const { user, username, isLoading } = useAuth();
  const avatarUrl =
  user?.avatarUrl ||
  Image.resolveAssetSource(require("../assets/images/user/defaultAvatar.png"))
    .uri;

  useEffect(() => {
    if (!isLoading && !username) {
      router.replace("/auth/signin");
    }
  }, [isLoading, username]);

  if (isLoading) return null;
  const { currentTrack } = usePlayer();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const openPlayer = () => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };
  

  return (
    <ImageBackground
      source={require("../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Header></Header>
        <ScrollView>
        <Banner playlistName={"Улюблені треки"}></Banner>
        <Tracklist avatarUrl={avatarUrl} username={username} trackCount={`${100}`}></Tracklist>
        </ScrollView>
        <BottomNavigation currentPage={'Favorite'}/>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});