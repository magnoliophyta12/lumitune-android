import BottomNavigation from "@/components/home/BottomNavigation";
import Carousel from "@/components/home/Carousel";
import Header from "@/components/common/Header";
import MiniPlayer from "@/components/home/MiniPlayer";
import MoodSelector from "@/components/home/MoodSelection";
import TopMusic from "@/components/home/TopMusic";
import {
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
} from "react-native";
import { View, ScrollView } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import FullPlayer from "@/components/home/FullPlayer";
import { HomeContentResponse, getContentHome } from "@/api/musicApi";
import NewReleases from "./NewReleases";
import FavoriteArtists from "./FavoriteArtists";
import { usePlayer } from "@/context/PlayerContext";

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  
  const { currentTrack} = usePlayer();
  const [content, setContent] = useState<HomeContentResponse | null>(null);

  const openPlayer = () => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  };

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getContentHome();
      if (data) {
        setContent(data);
      }
    };

    fetchContent();
  }, []);

  const { username, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !username) {
      router.replace("/auth/signin");
    }
  }, [isLoading, username]);

  if (isLoading) return null;

  return (
    <ImageBackground
      source={require("../../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Header></Header>
        <ScrollView contentContainerStyle={styles.content}>
          {content?.carousel && content.carousel.length > 0 && (
            <Carousel posters={content.carousel} />
          )}
          <MoodSelector></MoodSelector>
          {content?.recommendations && content.recommendations.length > 0 && (
          <TopMusic music={content.recommendations}></TopMusic>
          )}
             {content?.newReleases && content.recommendations.length > 0 && (
          <NewReleases albums={content.newReleases}></NewReleases>
          )}
          {/* <FavoriteArtists></FavoriteArtists> */}
        </ScrollView>
        
        <BottomNavigation currentPage={"Home"} />

          <FullPlayer translateY={translateY} />
          <Pressable
            onPress={openPlayer}
            style={{
              position: "absolute",
              bottom: 90,
              left: 16,
              right: 16,
            }}
          >
            { currentTrack && <MiniPlayer />}
          </Pressable>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
