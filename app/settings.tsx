import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { clearStorage } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import RectangularSwitch from "@/components/common/Switch";
import { styles } from "@/styles/settings";

export default function Settings() {
  const router = useRouter();

  const [offlineMode, setOfflineMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [adultContent, setAdultContent] = useState(false);
  const [publicPlaylists, setPublicPlaylists] = useState(false);
  const [viewListening, setViewListening] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);
  const [showLocalFiles, setShowLocalFiles] = useState(false);
  const [musicFolder, setMusicFolder] = useState(false);

  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState("ua");
  const [languageItems, setLanguageItems] = useState([
    { label: "Українська(UA)", value: "ua" },
  ]);

  const [colourOpen, setColourOpen] = useState(false);
  const [colourValue, setColourValue] = useState("dark");
  const [colourItems, setColourItems] = useState([
    { label: "Колір системи", value: "dark" },
  ]);

  const Logout = () => {
    clearStorage();
    router.replace("/auth/signin");
  };

  const onLanguageOpen = useCallback(() => {
    setColourOpen(false);
  }, []);

  const onColourOpen = useCallback(() => {
    setLanguageOpen(false);
  }, []);

  return (
    <ImageBackground
      source={require("../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Налаштування</Text>

        <View style={styles.block}>
          <Text style={styles.topic}>Акаунт</Text>
          <TouchableOpacity style={styles.logoutBtn} onPress={Logout}>
            <Text style={styles.buttonText}>Вийти</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <Text style={styles.topic}>Офлайн-режим</Text>
          <RectangularSwitch
            value={offlineMode}
            onValueChange={setOfflineMode}
          />
        </View>
        <Text style={styles.helpLabel}>
          Слухайте музику без підключення до інтернету.
        </Text>

        <View style={styles.block}>
          <Text style={styles.topic}>Мова</Text>
          <View>
            <DropDownPicker
              open={languageOpen}
              value={languageValue}
              items={languageItems}
              setOpen={setLanguageOpen}
              setValue={setLanguageValue}
              setItems={setLanguageItems}
              onOpen={onLanguageOpen}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              placeholder="Оберіть мову"
              zIndex={3000}
              zIndexInverse={1000}
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
              arrowIconStyle={{ marginRight: 10 }}
            />
          </View>
        </View>
        <Text style={styles.helpLabel}>
          Оберіть мову платформи. Після цього зробіть перезапуск.
        </Text>

        <View style={styles.block}>
          <Text style={styles.topic}>Сповіщення</Text>
          <RectangularSwitch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        </View>
        <Text style={styles.helpLabel}>Контролюйте ваші сповіщення.</Text>

        <View style={styles.block}>
          <Text style={styles.topic}>Контент для дорослих</Text>
          <RectangularSwitch
            value={adultContent}
            onValueChange={setAdultContent}
          />
        </View>
        <Text style={styles.helpLabel}>
          Дозволити контент для дорослих(М){"\n"}
          Контент позначений значком М(mature).{"\n"}
          Налаштування може зайняти деякий час!
        </Text>

        <View style={styles.block}>
          <Text style={styles.topic}>Приватність</Text>
        </View>
        <Text style={styles.helpLabel}>
          Керуйте тим, хто може бачити ваші плейлисти, підписки та активність у
          додатку.
        </Text>

        <View style={styles.block}>
          <Text style={styles.helpLabel}>
            Показувати мої публічні плейлисти:
          </Text>
          <RectangularSwitch
            value={publicPlaylists}
            onValueChange={setPublicPlaylists}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.helpLabel}>
            Дозволити іншим бачити, що я слухаю зараз:
          </Text>
          <RectangularSwitch
            value={viewListening}
            onValueChange={setViewListening}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.helpLabel}>Приховати мій профіль з пошуку:</Text>
          <RectangularSwitch
            value={hideProfile}
            onValueChange={setHideProfile}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.topic}>Моя медіатека</Text>
        </View>
        <Text style={styles.helpLabel}>Слухайте музику з вашого пристрою!</Text>

        <View style={styles.block}>
          <Text style={styles.helpLabel}>Показати файли на пристрої</Text>
          <RectangularSwitch
            value={showLocalFiles}
            onValueChange={setShowLocalFiles}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.helpLabel}>Папка “Музика”</Text>
          <RectangularSwitch
            value={musicFolder}
            onValueChange={setMusicFolder}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.topic}>Колір системи</Text>
          <View>
            <DropDownPicker
              open={colourOpen}
              value={colourValue}
              items={colourItems}
              setOpen={setColourOpen}
              setValue={setColourValue}
              setItems={setColourItems}
              onOpen={onColourOpen}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              placeholder="Оберіть тему"
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
      </ScrollView>
    </ImageBackground>
  );
}


