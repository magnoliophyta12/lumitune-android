import BottomNavigation from "@/components/home/BottomNavigation";
import Header from "@/components/common/Header";
import {
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import DocumentPicker from "react-native-document-picker";
import { View, ScrollView, Image } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import UserSection from "@/components/profile/UserSection";
import { Album } from "@/types/Album";
import { Artist } from "@/types/Artist";
import { Track } from "@/types/Track";
import * as FileSystem from "expo-file-system";
import { getCurrentUser } from "@/api/userApi";
import {
  createAlbum,
  createTrack,
  getAlbumById,
  getAlbums,
  getArtistByUserId,
  getGenres,
  getMoods,
  getPlaylistFavorites,
  setTrackGenre,
  setTrackMood,
} from "@/api/musicApi";
import YourAlbums from "@/components/artistProfile/YourAlbums";
import YourTracks from "@/components/artistProfile/YourTracks";
import YourFavorites from "@/components/artistProfile/YourFavorites";
import { uploadImage } from "@/api/ImageApi";
import DropDownPicker from "react-native-dropdown-picker";

const screenDimensions = Dimensions.get("window");
const SCREEN_WIDTH = screenDimensions.width;
const SCREEN_HEIGHT = screenDimensions.height;

export default function UserProfile() {
  const router = useRouter();
  const { username, isLoading, user } = useAuth();
  const avatarUrl =
    user?.avatarUrl ||
    Image.resolveAssetSource(require("../assets/images/user/defaultAvatar.png"))
      .uri;

  const [subscribers, setSubscribers] = useState<number>(0);
  const [followings, setFollowings] = useState<number>(0);
  const [musicAmount, setMusicAmount] = useState<number>(0);
  const [bio, setBio] = useState<string>();

  const [moodOpen, setMoodOpen] = useState(false);
  const [moodValue, setMoodValue] = useState("HAPPY");
  const [moodItems, setMoodItems] = useState([
    { label: "Хеппі", value: "HAPPY" },
    { label: "Меланхолія", value: "MELANCHOLY" },
    { label: "Романтика", value: "ROMANTIC" },
    { label: "Драйв", value: "DRIVE" },
    { label: "Туса", value: "PARTY" },
    { label: "Чілл", value: "CHILL" },
    { label: "Фан", value: "FAN" },
  ]);
  const [genreOpen, setGenreOpen] = useState(false);
  const [genreValue, setGenreValue] = useState("POP");
  const [genreItems, setGenreItems] = useState([
    { label: "Новинки", value: "NEW" },
    { label: "Поп", value: "POP" },
    { label: "К-pop", value: "KPOP" },
    { label: "Рок", value: "ROCK" },
    { label: "Метал", value: "METAL" },
    { label: "Реп", value: "RAP" },
    { label: "Класика", value: "CLASSIC" },
  ]);
  const onMoodOpen = useCallback(() => {
    setGenreOpen(false);
  }, []);

  const onGenreOpen = useCallback(() => {
    setMoodOpen(false);
  }, []);

  const [isAuthor, setIsAuthor] = useState(false);
  const [artist, setArtist] = useState<Artist>();
  const [albumOpen, setAlbumOpen] = useState(false);
  const [albumValue, setAlbumValue] = useState("");
  const [albums, setAlbums] = useState<Album[] | null>();
  const [albumOptions, setAlbumOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [allTracks, setAllTracks] = useState<Track[] | null>();
  const [favorites, setFavorites] = useState<Track[] | null>(null);

  const [createAlbumModalVisible, setCreateAlbumModalVisible] = useState(false);
  const [selectedAlbumName, setSelectedAlbumName] = useState<string>();
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [isCreateTrackModalOpen, setIsCreateTrackModalOpen] = useState(false);
  const [selectedTrackName, setSelectedTrackName] = useState<string>();
  const [selectedAudio, setSelectedAudio] = useState<any>(null);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>();
  const [selectedGenre, setSelectedGenre] = useState<string>();
  const [selectedMood, setSelectedMood] = useState<string>();
  const [modalVisible, setModalVisible] = useState(false);

  const [moodNames, setMoodNames] = useState<string[]>([]);
  const [genreNames, setGenreNames] = useState<string[]>([]);

  useEffect(() => {
    if (!isLoading && !username) {
      router.replace("/auth/signin");
    }
    if (user) {
      getCurrentUser()
        .then(async (data) => {
          setSubscribers(data.accSubscribers || 0);
          setFollowings(data.accFollowings || 0);

          if (data.userData.isArtist === true) {
            setIsAuthor(true);
            const artist = await getArtistByUserId(data.id);
            setMusicAmount(artist.albums.length);
            setBio(artist.bio || "Вітаю на моїй сторінці!");

            const albums = await getAlbums(artist.id);
            setArtist(artist);
            setAlbums(albums);
            if (albums) {
              const options = albums.map((album: { name: any; id: any }) => ({
                label: album.name,
                value: album.id,
              }));
              setAlbumOptions(options);
            }
          }
          const favorites = await getPlaylistFavorites();
          if (favorites) setFavorites(favorites?.tracks);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [isLoading, username]);

  if (isLoading) return null;

  useEffect(() => {
    if (!albums) return;

    const fetchAllTracks = async () => {
      try {
        const trackArrays = await Promise.all(
          albums.map(async (album) => {
            const fullAlbum = await getAlbumById(album.id);
            return fullAlbum?.tracks || [];
          })
        );

        const flattened = trackArrays.flat();
        setAllTracks(flattened);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllTracks();
  }, [albums]);
  const handleUploadAlbum = async () => {
    if (!selectedAlbumName || !artist) return;
    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.fileName || "avatar.jpg",
      } as any);

      const uploadedImage = await uploadImage(formData);
      if (!uploadedImage) throw new Error("Не вдалося завантажити зображення");

      const AlbumPayload = {
        name: selectedAlbumName,
        type: "album",
        label: "string",
        duration: 0,
        relDate: new Date(),
        cover: uploadedImage,
        artist: artist,
        tracks: [],
      };

      const created = await createAlbum(AlbumPayload);

      console.log(created);
      if (created) {
        setAlbums((prev) => (prev ? [...prev, created] : [created]));
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Помилка публікування альбому:", error);
    }
  };
  const handleUploadTrack = async () => {
    if (!selectedAudio || !selectedTrackName || !artist) return;

    try {
      const formData = new FormData();
      const newPath = FileSystem.documentDirectory + selectedAudio.fileName;
      await FileSystem.copyAsync({
        from: selectedAudio.uri,
        to: newPath,
      });

      formData.append("file", {
        uri: selectedAudio.uri,
        type: selectedAudio.type || "audio/mpeg",
        name: selectedAudio.fileName || "audio.mp3",
      } as any);

      const trackPayload = {
        name: selectedTrackName,
        albumId: albumValue,
        isExplicit: false,
        duration: 0,
      };

      formData.append("track", {
        string: JSON.stringify({
          name: selectedTrackName,
          albumId: albumValue,
          isExplicit: false,
          duration: 0,
        }),
        name: "track",
        type: "application/json",
      } as any);
      console.log(formData);

      const created = await createTrack(formData);
      console.log(created);
      if (created) {
        setAllTracks((prev) => (prev ? [...prev, created] : [created]));

        // await setTrackGenre(created.id, genreValue || "");
        // await setTrackMood(created.id, moodValue || "");
        setIsCreateTrackModalOpen(false);
      }
    } catch (error) {
      console.error("Помилка публікування треку:", error);
    }
  };
  const fetchgenres = async () => {
    const moods = await getMoods();
    const genres = await getGenres();
    setMoodNames(moods);
    setGenreNames(genres);
  };

  const handleTrackDeleted = (deletedId: string) => {
    setAllTracks((prev) =>
      prev ? prev.filter((track) => track.id !== deletedId) : null
    );
  };

  const handleAlbumDeleted = (deletedId: string) => {
    setAlbums((prev) =>
      prev ? prev.filter((album) => album.id !== deletedId) : null
    );
  };
  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setSelectedFile({
        uri: result.uri,
        type: result.type,
        fileName: result.name,
      });
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert("Помилка", "Не вдалося вибрати файл");
      }
    }
  };
  const handlePickAudio = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.audio],
      });
      setSelectedAudio({
        uri: result.uri,
        type: result.type || "audio/mpeg",
        fileName: result.name,
      });
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        Alert.alert("Помилка", "Не вдалося вибрати файл");
      }
    }
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
          <UserSection
            isAuthor={isAuthor}
            bio={bio || "Вітаю на моїй сторінці!"}
          ></UserSection>
          {isAuthor && (
            <View style={styles.content}>
              <View style={styles.buttonsWrap}>
                <Pressable onPress={() => setIsCreateTrackModalOpen(true)}>
                  <View style={[styles.button]}>
                    <Text style={styles.buttonText}>Завантажити трек</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => setModalVisible(true)}>
                  <View style={[styles.button]}>
                    <Text style={styles.buttonText}>Створити альбом</Text>
                  </View>
                </Pressable>
              </View>
              {albums && <YourAlbums albums={albums}></YourAlbums>}
              {allTracks && <YourTracks music={allTracks}></YourTracks>}
              {favorites && <YourFavorites music={favorites}></YourFavorites>}
            </View>
          )}
        </ScrollView>

        <BottomNavigation currentPage={"Home"} />

        {modalVisible && (
          <View style={styles.customModalOverlay}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={styles.customModalBackdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.customModal}>
              <Text style={styles.titleUpload}>Створення альбому</Text>

              <View style={styles.uploadWrap}>
                <Pressable style={styles.inputUpload} onPress={handlePickImage}>
                  <Image
                    source={require("../assets/images/user/uploadIcon.png")}
                  />
                  <Text style={styles.uploadInputText}>Створення альбому</Text>
                </Pressable>

                <View>
                  <View style={styles.inputSection}>
                    <Text style={styles.label}>Назва альбому</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Назва альбому"
                      placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
                      onChangeText={(text) => setSelectedAlbumName(text)}
                      value={selectedAlbumName}
                    />
                  </View>
                </View>
              </View>

              <Pressable style={styles.btnUpload} onPress={handleUploadAlbum}>
                <Text style={styles.btnUploadText}>Опублікувати</Text>
              </Pressable>
            </View>
          </View>
        )}

        {isCreateTrackModalOpen && (
          <View style={styles.customModalOverlay}>
            <TouchableWithoutFeedback
              onPress={() => setIsCreateTrackModalOpen(false)}
            >
              <View style={styles.customModalBackdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.customModal}>
              <Text style={styles.titleUpload}>Завантаження треку</Text>
              <View>
                <View style={styles.inputSection}>
                  <Text style={styles.label}>Назва треку</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Назва треку"
                    placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
                    onChangeText={(text) => setSelectedTrackName(text)}
                    value={selectedTrackName}
                  />
                </View>
              </View>
              <View style={styles.uploadWrap}>
                <Pressable style={styles.inputUpload} onPress={handlePickAudio}>
                  <Image
                    source={require("../assets/images/user/uploadIcon.png")}
                  />
                  <Text style={styles.uploadInputText}>Аудіофайл</Text>
                </Pressable>
              </View>
              <View style={styles.block}>
                <Text style={styles.topic}>Оберіть альбом</Text>
                <View>
                  <DropDownPicker
                    open={albumOpen}
                    value={albumValue}
                    items={albumOptions}
                    setOpen={setAlbumOpen}
                    setValue={setAlbumValue}
                    setItems={setAlbumOptions}
                    onOpen={onGenreOpen}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    placeholder="Оберіть альбом"
                    zIndex={2000}
                    zIndexInverse={3000}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    ArrowDownIconComponent={() => (
                      <Image
                        source={require("../assets/images/common/smallDropdownIcon.png")}
                      />
                    )}
                    ArrowUpIconComponent={() => (
                      <Image
                        source={require("../assets/images/common/smallDropdownIcon.png")}
                      />
                    )}
                    showArrowIcon={true}
                  />
                </View>
              </View>

              <View style={styles.block}>
                <Text style={styles.topic}>Оберіть настрій</Text>
                <View>
                  <DropDownPicker
                    open={moodOpen}
                    value={moodValue}
                    items={moodItems}
                    setOpen={setMoodOpen}
                    setValue={setMoodValue}
                    setItems={setMoodItems}
                    onOpen={onMoodOpen}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    placeholder="Оберіть настрій"
                    zIndex={1000}
                    zIndexInverse={2000}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    ArrowDownIconComponent={() => (
                      <Image
                        source={require("../assets/images/common/smallDropdownIcon.png")}
                      />
                    )}
                    ArrowUpIconComponent={() => (
                      <Image
                        source={require("../assets/images/common/smallDropdownIcon.png")}
                      />
                    )}
                    showArrowIcon={true}
                  />
                </View>
              </View>

              <View style={styles.block}>
                <Text style={styles.topic}>Оберіть жанр</Text>
                <View>
                  <DropDownPicker
                    open={genreOpen}
                    value={genreValue}
                    items={genreItems}
                    setOpen={setGenreOpen}
                    setValue={setGenreValue}
                    setItems={setGenreItems}
                    onOpen={onGenreOpen}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    placeholder="Оберіть жанр"
                    zIndex={600}
                    zIndexInverse={600}
                    listMode="SCROLLVIEW"
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    ArrowDownIconComponent={() => (
                      <Image
                        source={require("../assets/images/common/smallDropdownIcon.png")}
                      />
                    )}
                    ArrowUpIconComponent={() => (
                      <Image
                        source={require("../assets/images/common/smallDropdownIcon.png")}
                      />
                    )}
                    showArrowIcon={true}
                  />
                </View>
              </View>

              <Pressable style={styles.btnUpload} onPress={handleUploadTrack}>
                <Text style={styles.btnUploadText}>Опублікувати</Text>
              </Pressable>
            </View>
          </View>
        )}
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
  content: {
    padding: 16,
  },
  dropdown: {
    backgroundColor: "rgba(0, 21, 39, 1)",
    borderColor: "rgba(147, 232, 255, 0.5)",
    height: 40,
    minHeight: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: 164,
  },
  dropdownContainer: {
    width: 164,
    backgroundColor: "rgba(0, 21, 39, 1)",
    borderColor: "rgba(147, 232, 255, 0.5)",
  },
  dropdownText: {
    fontSize: 14,
    color: "rgba(86, 127, 141, 1)",
    lineHeight: 18,
  },
  block: {
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topic: {
    fontWeight: "700",
    fontSize: 16,
    color: "rgba(255, 255, 255, 1)",
  },
  button: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(166, 218, 255, 0.3)",
    backgroundColor: "rgba(58, 69, 76, 0.5)",
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "rgba(240, 240, 240, 1)",
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
  buttonsWrap: {
    flexDirection: "row",
    gap: 10,
  },

  customModalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  customModalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  customModal: {
    width: SCREEN_WIDTH * 0.8,
    maxWidth: 400,
    backgroundColor: "rgba(23, 57, 69, 1)",
    padding: 20,
    borderRadius: 10,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    zIndex: 10000,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },

  btnUpload: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: "rgba(88, 191, 226, 1)",
    borderRadius: 8,
  },
  btnUploadText: {
    color: "rgba(2, 39, 46, 1)",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-Bold",
    alignSelf: "center",
  },
  titleUpload: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "CoreSans-Medium",
  },
  inputUpload: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 11,
    fontWeight: "400",
    color: "#fff",
    backgroundColor: "#083647",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#3f5e7a",
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadInputText: {
    color: "rgba(82, 134, 159, 1)",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Inter-Bold",
    alignSelf: "center",
  },
  inputSection: {
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: "rgba(212, 237, 255, 1)",
    width: "100%",
    marginLeft: 9,
    marginTop: 20,
    fontFamily: "CoreSans-Medium",
  },
  input: {
    height: 48,
    borderColor: "rgba(82, 134, 159, 1)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "rgba(42, 86, 101, 1)",
    color: "rgba(212, 237, 255, 1)",
  },
  uploadWrap: {
    flexDirection: "column",
    marginBottom: 20,
    marginTop: 20,
  },
});
