import { styles } from "@/styles/signup";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";

export default function RegisterStep2({
  onNext,
  onBack,
  updateForm,
  data,
}: any) {
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [hasLetter, setHasLetter] = useState(false);
  const [hasDigitOrSpecialChar, setHasDigitOrSpecialChar] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);

  useEffect(() => {
    const password = data.password.trim();
  
    const hasLetterRegex = /[A-Za-z]/.test(password);
    const hasDigitOrSpecialCharRegex = /[\d\W]/.test(password);
    const hasMinLengthRegex = /^.{8,}$/.test(password);
  
    setHasLetter(hasLetterRegex);
    setHasDigitOrSpecialChar(hasDigitOrSpecialCharRegex);
    setHasMinLength(hasMinLengthRegex);
  
    if (!password || !hasLetterRegex || !hasDigitOrSpecialCharRegex || !hasMinLengthRegex) {
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }
  }, [data.password]);

  return (
    <ImageBackground
      source={require("../../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={onBack} style={styles.backWrapper}>
          <View style={styles.backContainer}>
            <Text style={styles.backText}>Назад</Text>
            <View style={styles.underline} />
          </View>
        </Pressable>
        <Image
          source={require("../../assets/images/common/appLogo.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Пориньте вперше у</Text>
        <Text style={styles.title}>LumiTune</Text>
        <Text style={styles.progressBarLabel}>Крок 1 із 2</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
          <View style={styles.progressBackground} />
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            placeholderTextColor={"rgba(147, 183, 255, 0.5)"}
            autoCapitalize="none"
            value={data.password}
            onChangeText={(text) => updateForm({ password: text })}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
        </View>



        <View style={styles.rulesSection}>
        <Text style={styles.rulesTitle}>Пароль має містити принаймні:</Text>
          <View>
            <View style={styles.item}>
              <View style={[styles.circle, hasLetter && styles.circleActive]} />
              <Text style={[styles.itemText, hasLetter && styles.textActive]}>
                1 літеру
              </Text>
            </View>
    
            <View style={styles.item}>
              <View style={[styles.circle, hasDigitOrSpecialChar && styles.circleActive]} />
              <Text style={[styles.itemText, hasDigitOrSpecialChar && styles.textActive]}>
              1 число або 1 спеціальний символ (наприклад: _!?&#)
              </Text>
            </View>
    
            <View style={styles.item}>
              <View style={[styles.circle, hasMinLength && styles.circleActive]} />
              <Text style={[styles.itemText, hasMinLength && styles.textActive]}>
              8 символів
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.nextButton, !isValid && styles.disabledButton]}
          onPress={onNext}
          disabled={!isValid}
        >
          <Text style={styles.nextButtonText}>Далі</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}
