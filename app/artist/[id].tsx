import BottomNavigation from "@/components/home/BottomNavigation";
import Header from "@/components/common/Header";
import { ImageBackground, StyleSheet, Image, Pressable } from "react-native";
import { View, ScrollView, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import UserSection from "@/components/profile/UserSection";
import PopularTracks from "@/components/artist/PopularTracks";
import { Track } from "@/types/Track";
import axiosInstance from "@/api/axiosInstance";
import { getAlbumById, getAlbums } from "@/api/musicApi";
import About from "@/components/artist/About";

export default function ArtistPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { username, isLoading } = useAuth();
  

  const getTopTracksByArtist = async (artistId: string): Promise<Track[] | null> => {
    try {
      const albumsResponse = await getAlbums(artistId);
      const albums = albumsResponse;
  
      if (!albums || albums.length === 0) return [];
  
      const tracksPromises = albums.map(async (album: any) => {
        const tracksRes = await getAlbumById(album.id);
        return tracksRes.tracks;
      });
  
      const tracksArrays = await Promise.all(tracksPromises);
      const allTracks: Track[] = tracksArrays.flat();
  
      const topTracks = allTracks
        .sort((a, b) => b.playsNumber - a.playsNumber)
        .slice(0, 5);
  
      return topTracks;
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      return null;
    }
  };


  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const result = await getTopTracksByArtist(params.id as string);
      // console.log(topTracks[1])
      if (result) setTopTracks(result);
    };
  
    fetchTopTracks();
  }, []);

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
        <ScrollView>
          <View style={styles.content}>
            <Image
              source={{ uri: params.cover as string }}
              style={styles.cover}
            />
            <Text style={styles.role}>Виконавець</Text>
            <Text style={styles.name}>{params.name}</Text>
            <View style={styles.creatorInfo}>
              <Image
                source={{ uri: params.cover as string }}
                style={styles.avatar}
              />
              <Text style={[styles.creatorInfoText, styles.creatorInfoName]}>
                {params.name}
              </Text>
              <Text style={styles.creatorInfoText}>•</Text>
              <Text style={styles.creatorInfoText}>
                {params.monthlyListeners}
              </Text>
              <Text style={styles.creatorInfoText}>слухачів за місяць</Text>
            </View>
            <View style={styles.buttons}>
              <Pressable>
                <Image
                  source={require("../../assets/images/playlists/playButtonBig.png")}
                />
              </Pressable>
              <Pressable>
                <Image
                  source={require("../../assets/images/playlists/plusButtonBig.png")}
                />
              </Pressable>
            </View>
           {/* <PopularTracks tracks={topTracks}></PopularTracks> */}
           <About monthlyListeners={params.monthlyListeners as string} bio={params.bio as string} cover={params.cover as string}></About>
          </View>
        </ScrollView>
        <BottomNavigation currentPage={"Home"} />
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
  cover: {
    width: "100%",
    height: 351,
    borderRadius: 16,
  },
  content: {
    margin: 16,
  },
  role: {
    color: "rgba(147, 161, 184, 1)",
    fontSize: 16,
    fontFamily: "Inter-Bold",
    marginTop: 20,
  },
  name: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 32,
    fontFamily: "Inter-Bold",
  },
  creatorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 10,
  },
  creatorInfoText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontFamily: "CoreSans-Regular",
  },
  creatorInfoName: {
    fontFamily: "Inter-Bold",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 23,
    borderWidth: 5,
    borderColor: "rgba(69, 96, 144, 0.19)",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
