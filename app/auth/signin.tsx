import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { styles } from "@/styles/signup";
import { useRouter } from "expo-router";
import { loginUser } from "@/api/userApi";
import { useAuth } from "@/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Config from "react-native-config";

import { decrypt, encrypt } from "@/utils/aes";

export default function SignInPage() {
  const router = useRouter();
const [formData, setFormData] = useState({
  password: "",
  username: "",
});
const [error, setError] = useState("");
const [isValid, setIsValid] = useState(false);

useEffect(() => {
  const username = formData.username.trim();
  const password = formData.password.trim();

  if (!username || !password) {
    setError("");
    setIsValid(false);
  } else {
    setError("");
    setIsValid(true);
  }
}, [formData.username, formData.password]);

const { setUsername, refreshUser } = useAuth();


const handleSubmit = async () => {
  try {
    let encryptedFormData = { ...formData };
    
    if (Config.AES_KEY && formData.password) {
      const encryptedPassword = encrypt(formData.password);
      
      encryptedFormData = {
        ...formData,
        password: encryptedPassword
      };
    }

    const data = await loginUser(encryptedFormData);

    if (!data?.user?.username) {
      throw new Error("Невалідна відповідь від сервера");
    }
    
    await setUsername(data.user.username);
    await AsyncStorage.setItem("authToken", data.user.token);

    await refreshUser();

    console.log("success");
    router.replace("/");
  } catch (error) {
    console.error("Error:", error);
    setError("Невірне ім'я користувача або пароль.");
  }
};

  return (
    <ImageBackground
      source={require("../../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require("../../assets/images/common/appLogo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Пориньте у LumiTune</Text>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Iм'я користувача</Text>
          <TextInput
            style={styles.input}
            placeholder="Iм'я користувача"
            placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
            autoCapitalize="none"
            value={formData.username}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, username: text }))
            }
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
            autoCapitalize="none"
            value={formData.password}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, password: text }))
            }
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        <Pressable
          style={[styles.nextButton, !isValid && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>Увійти</Text>
        </Pressable>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.lineText}>або</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.googleButton}>
          <Image
            source={require("../../assets/images/common/googleLogo.png")}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Увійти з Google</Text>
        </View>

        <View style={styles.signInSection}>
          <Text style={styles.accountQuestion}>Немає акаунта?</Text>
          <Pressable onPress={() => router.replace("/auth/signup")}>
            <Text style={styles.signInLink}>Реєстрація у LumiTune</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
