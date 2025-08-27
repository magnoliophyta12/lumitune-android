import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import { styles } from "@/styles/signup";
import { useRouter } from "expo-router";

export default function RegisterStep1({ onNext, updateForm, data }: any) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const email = data.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);
    const isRussianDomain = /\.ru$/.test(email.split("@")[1] || "");

    if (!email) {
      setError("");
      setIsValid(false);
    } else if (!isValidFormat) {
      setError("Невірний формат електронної пошти");
      setIsValid(false);
    } else if (isRussianDomain) {
      setError("Ми не приймаємо пошти з доменом .ru");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }, [data.email]);

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

        <Text style={styles.title}>Пориньте вперше у</Text>
        <Text style={styles.title}>LumiTune</Text>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Електронна пошта</Text>
          <TextInput
            style={styles.input}
            placeholder="Електронна пошта"
            placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
            keyboardType="email-address"
            autoCapitalize="none"
            value={data.email}
            onChangeText={(text) => updateForm({ email: text })}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>

        <Pressable
          style={[styles.nextButton, !isValid && styles.disabledButton]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>Далі</Text>
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
          <Text style={styles.accountQuestion}>Є акаунт?</Text>
          <Pressable onPress={() => router.replace("/auth/signin")}>
            <Text style={styles.signInLink}>Увійдіть до нього</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
