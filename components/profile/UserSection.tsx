import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  Alert,
  Pressable,
  ImageBackground,
  TextInput,
} from "react-native";
import DocumentPicker from "react-native-document-picker";

import { getCurrentUser, editUser } from "../../api/userApi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { uploadImage } from "@/api/ImageApi";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/profile/userSection";
import { editArtistById, getArtistByUserId } from "@/api/musicApi";
import { Artist } from "@/types/Artist";
import { User } from "@/types/User";

interface UserSectionProps {
  isAuthor: boolean;
  bio: string;
}

export default function UserProfile({
  isAuthor,
}: UserSectionProps) {
  const router = useRouter();
  const { user, refreshUser } = useAuth();
  const avatarUrl =
    user?.avatarUrl ||
    Image.resolveAssetSource(
      require("../../assets/images/user/defaultAvatar.png")
    ).uri;

  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [selectedBio, setSelectedBio] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [subscribers, setSubscribers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [musicAmount, setMusicAmount] = useState<number>(0);
  const [ bio, setBio ] = useState<string>();
  useEffect(() => {
    if (user) {
      getCurrentUser()
        .then(async (data) => {
          setSubscribers(data.accSubscribers || 0);
          setFollowings(data.accFollowings || 0);
          if (isAuthor) {
            const artist = await getArtistByUserId(data.id);
            setMusicAmount(artist.albums.length);
            setSelectedBio(artist.bio || "Вітаю на моїй сторінці!");
            setBio(artist.bio || "Вітаю на моїй сторінці!");
            setSelectedName(user.username || "Нікнейм");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [user]);

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

  // const handleUpload = async () => {
  //   try {
  //     const currentUser = await getCurrentUser();
  //     let avatarToUpdate = currentUser.avatar;
  //     const oldAvatarId = currentUser.avatar?.id;

  //     if (selectedFile) {
  //       const formData = new FormData();
  //       formData.append("file", selectedFile);

  //       const uploadedImage = await uploadImage(formData);
  //       if (!uploadedImage)
  //         throw new Error("Не вдалося завантажити зображення");
  //       avatarToUpdate = uploadedImage;
  //     }
  //     if (isAuthor) {
  //       const currentArtist = await getArtistByUserId(currentUser.id);
  //       const updatedArtist: Artist = {
  //         ...currentArtist,
  //         bio: currentUser.userData.bio,
  //       };
  //       await editArtistById(currentArtist.id, updatedArtist);
  //     }

  //     const updatedUser: User = {
  //       ...currentUser,
  //       avatar: avatarToUpdate,
  //       username: selectedName || currentUser.username,
  //     };
  //     console.log(updatedUser);
  //     await editUser(updatedUser);
  //     await refreshUser();

  //     if (selectedFile && oldAvatarId) {
  //       await deleteImage(oldAvatarId);
  //     }
  //     setModalVisible(false);

  //     setSelectedFile(null);
  //     setSelectedName(null);
  //     setSelectedBio(null);
  //   } catch (error) {
  //     console.error("Помилка редагування користувача:", error);
  //   }
  // };
  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.fileName || "avatar.jpg",
      } as any);

      const uploadedImage = await uploadImage(formData);
      if (!uploadedImage) throw new Error("Error");

      const currentUser = await getCurrentUser();
      const updatedUser = { ...currentUser, avatar: uploadedImage };

      await editUser(updatedUser);
      await refreshUser();
      setModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/user/profileBg.jpg")}
        style={[styles.background]}
        resizeMode="cover"
        imageStyle={styles.imageRadius}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.4)",
            "rgba(0, 0, 0, 0.4)",
            "rgba(0, 225, 255, 0.1)",
            "rgba(0, 225, 255, 0.3)",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.absoluteFill}
        />
        <View style={styles.profileBlock}>
          <View style={styles.header}>
            <Text style={[styles.title, styles.profileText]}>Профіль</Text>
            <View style={styles.iconsWrap}>
              <Pressable onPress={() => setModalVisible(true)}>
                <Image
                  style={styles.icon}
                  source={require("../../assets/images/common/editIcon.png")}
                />
              </Pressable>
              <Pressable onPress={() => router.push("/settings")}>
                <Image
                  source={require("../../assets/images/common/settingsIcon.png")}
                />
              </Pressable>
            </View>
     
          </View>

          <View style={styles.avatarSection}>
            <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          </View>
   

          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setModalVisible(false)}
            >
              <View style={styles.modal}>
                <Text style={styles.titleUpload}>Редагування профіля</Text>

                <View style={styles.uploadWrap}>
                  <View style={styles.uploadAvatar}>
                    <View style={styles.avatarSection}>
                      <Image
                        source={{ uri: avatarUrl }}
                        style={styles.avatar}
                      />
                    </View>
                    <Pressable
                      style={styles.inputUpload}
                      onPress={handlePickImage}
                    >
                      <Image
                        source={require("../../assets/images/user/uploadIcon.png")}
                      />
                      <Text style={styles.uploadInputText}>Фото профілю</Text>
                    </Pressable>
                  </View>
                  <View>
                    <View style={styles.inputSection}>
                      <Text style={styles.label}>Нікнейм</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Нікнейм"
                        placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
                        value={selectedName ?? user?.username ?? ""}
                        onChangeText={(text) => setSelectedName(text)}
                      />
                    </View>
                    {isAuthor && <View style={styles.inputSection}>
                      <Text style={styles.label}>Опис</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Розкажи про себе"
                        placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
                        value={selectedBio ?? bio ?? ""}
                        onChangeText={(text) => setSelectedBio(text)}
                      />
                    </View>}
                  </View>
                </View>


                <Pressable style={styles.btnUpload} onPress={handleUpload}>
                  <Text style={styles.btnUploadText}>Зберегти</Text>
                </Pressable>
              </View>
            </Pressable>
          </Modal>

          <View style={styles.nameSection}>
            <Text style={[styles.username, styles.profileText]}>
              {user?.username || "Нікнейм"}
            </Text>
            <View style={styles.statistics}>
              <View style={styles.statItem}>
                <Text style={[styles.profileText, styles.statValue]}>
                  {followings}
                </Text>
                <Text style={[styles.profileText, styles.statTitle]}>
                  Підписки
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.profileText, styles.statValue]}>{musicAmount}</Text>
                <Text style={[styles.profileText, styles.statTitle]}>
                  Музика
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.profileText, styles.statValue]}>
                  {subscribers}
                </Text>
                <Text style={[styles.profileText, styles.statTitle]}>
                  Слухачі
                </Text>
              </View>
           
            </View>
            { isAuthor && <Text style={styles.description}>{selectedBio ?? bio ?? "Вітаю на моїй сторінці!"}</Text>}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
