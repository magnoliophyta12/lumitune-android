import BottomNavigation from "@/components/home/BottomNavigation";
import Header from "@/components/common/Header";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { View, ScrollView, Text, Image } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import Banner from "@/components/library/Banner";
import { usePlayer } from "@/context/PlayerContext";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { SCREEN_HEIGHT } from "@/components/home/Home";

export default function MoodGenrePage() {
  const params = useLocalSearchParams();
  const playlistName = Array.isArray(params.name) ? params.name[0] : params.name;

  const router = useRouter();
  
  const { user, username, isLoading } = useAuth();
  const avatarUrl =
    user?.avatarUrl ||
    Image.resolveAssetSource(
      require("../../assets/images/user/defaultAvatar.png")
    ).uri;

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
      source={require("../../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Header></Header>
        <ScrollView>
          <Banner playlistName={playlistName}></Banner>
          <View style={styles.creatorInfo}>
            <Image source={require('../../assets/images/common/appLogo.png')} style={styles.avatar} />
            <Text style={styles.creatorInfoText}>{'Lumitune'}</Text>
            <Text style={styles.creatorInfoText}>•</Text>
            <Text style={styles.creatorInfoText}>
              {0}
            </Text>
            <Text style={styles.creatorInfoText}>трек(а\ів)</Text>
          </View>
        </ScrollView>
        <BottomNavigation currentPage={"Other"} />
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
  imageRadius: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 20,
    marginTop: 10,
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
