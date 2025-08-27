import { useAuth } from "@/context/AuthContext";
import { styles } from "@/styles/common/header";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View, TextInput, Image, StyleSheet, Pressable } from "react-native";

export default function Header() {
  const router = useRouter();
  const { user} = useAuth();
  const avatarUrl =
  user?.avatarUrl ||
  Image.resolveAssetSource(require("../../assets/images/user/defaultAvatar.png"))
    .uri;

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.replace("/")}>
        <Image
          source={require("../../assets/images/common/appLogo.png")}
          style={styles.logo}
        />
      </Pressable>

      <View style={styles.searchContainer}>
        <Image
          source={require("../../assets/images/common/searchIcon.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Що бажаєте послухати?"
          placeholderTextColor="#AAE4FF99"
        />
        <View style={styles.voiceIconWrap}>
          <Image
            source={require("../../assets/images/common/voiceSearchIcon.png")}
            style={styles.voiceIcon}
          />
        </View>
      </View>

      <Pressable onPress={() => router.push("/profile")}>
        <Image
          source={{ uri: avatarUrl }}
          style={styles.avatar}
        />
      </Pressable>
    </View>
  );
}

