import BottomNavigation from "@/components/home/BottomNavigation";
import Header from "@/components/common/Header";
import { ImageBackground, StyleSheet, Text } from "react-native";
import { View, ScrollView } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import MyPlaylists from "@/components/library/MyPlaylists";
import { getPlaylistsByUserId } from "@/api/musicApi";
import { getUserByUsername } from "@/api/userApi";
import { Playlist } from "@/types/Playlist";

export default function LibraryPage() {
  const router = useRouter();
  const { username, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !username) {
      router.replace("/auth/signin");
    }
  }, [isLoading, username]);

  if (isLoading) return null;

  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchContent = async () => {
      const userId = await getUserByUsername(user.username);
      const playlists = await getPlaylistsByUserId(userId.id);
      if (playlists) setPlaylists(playlists);
    };

    fetchContent();
  }, [user]);

  return (
    <ImageBackground
      source={require("../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Header></Header>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Моя медіатека</Text>
          {playlists && playlists.length > 0 && (
            <MyPlaylists playlists={playlists}></MyPlaylists>
          )}
        </ScrollView>
        <BottomNavigation currentPage={"Notifications"} />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001221E5",
  },
  content: {
    padding: 16,
  },
  title: {
    color: "rgba(190, 244, 255, 1)",
    fontSize: 32,
    fontFamily: "Inter-Bold",
    marginBottom: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
