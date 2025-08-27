import { styles } from "@/styles/home/moodSelection";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from "react-native";

const moods = [
  { link:'HAPPY',label: "Хеппі", image: require("../../assets/images/moods/moodHappy.png") },
  {
    link:'MELANCHOLY',label: "Меланхолія",
    image: require("../../assets/images/moods/moodSad.png"),
  },
  {
    link:'ROMANTIC',label: "Романтика",
    image: require("../../assets/images/moods/moodRomantic.png"),
  },
  { link:'DRIVE',label: "Драйв", image: require("../../assets/images/moods/moodDrive.png") },
  { link:'PARTY',label: "Туса", image: require("../../assets/images/moods/moodParty.png") },
  { link:'CHILL',label: "Чілл", image: require("../../assets/images/moods/moodChill.png") },
  { link:'FAN',label: "Фан", image: require("../../assets/images/moods/moodFun.png") },
];
const genres = [
  {
    link:'NEW',label: "Новинки",
    image: require("../../assets/images/genres/genreNew.png"),
  },
  { link:'POP',label: "Поп", image: require("../../assets/images/genres/genrePop.png") },
  {
    link:'KPOP',label: "К-поп",
    image: require("../../assets/images/genres/genreKpop.png"),
  },
  { link:'ROCK',label: "Рок", image: require("../../assets/images/genres/genreRock.png") },
  {
    link:'METAL',label: "Метал",
    image: require("../../assets/images/genres/genreMetal.png"),
  },
  { link:'RAP',label: "Реп", image: require("../../assets/images/genres/genreRap.png") },
  {
    link:'CLASSIC',label: "Класика",
    image: require("../../assets/images/genres/genreClassic.png"),
  },
];

const MoodSelector = () => {
  const router = useRouter();
  const [filterType, setFilterType] = useState<"moods" | "genres">("moods");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  return (
    <>
      <View style={styles.titleWrap}>
        <Text style={styles.title}>Саундтреки на основі твого</Text>

        <View style={styles.dropdownWrap}>
          <Text style={[styles.title, styles.highlight]}>
            {filterType === "moods" ? "настрою" : "жанру"}
          </Text>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              <Pressable
                onPress={() => {
                  setFilterType("moods");
                  setDropdownVisible(false);
                }}
              >
                <View
                  style={[
                    styles.dropdownItem,
                    filterType === "moods" && styles.activeItem,
                  ]}
                >
                  <Text style={[styles.dropdownText]}>Настрій</Text>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setFilterType("genres");
                  setDropdownVisible(false);
                }}
              >
                <View
                  style={[
                    styles.dropdownItem,
                    filterType === "genres" && styles.activeItem,
                  ]}
                >
                  <Text style={[styles.dropdownText]}>Жанри</Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
        <Pressable onPress={() => setDropdownVisible(!dropdownVisible)}>
          <Image
            source={require("../../assets/images/common/moodGenreDropdownArrow.png")}
          />
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scroll}
      >
        {(filterType === "moods" ? moods : genres).map((item, index) => (
          <Pressable key={index} style={styles.moodItem} onPress={()=>{router.push(`/mood/${item.link}`)}}>
            <Image source={item.image} style={styles.moodImage} />
            <Text style={styles.moodLabel}>{item.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
};

export default MoodSelector;
