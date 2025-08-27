import BottomNavigation from "@/components/home/BottomNavigation";
import Header from "@/components/common/Header";
import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { View, ScrollView, Text } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [filterType, setFilterType] = useState<"all" | "tracks" | "other">(
    "all"
  );
  const router = useRouter();
  const { username, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !username) {
      router.replace("/auth/signin");
    }
  }, [isLoading, username]);

  if (isLoading) return null;

  return (
    <ImageBackground
      source={require("../assets/images/common/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Header></Header>
        <ScrollView style={styles.content}>
          <Text style={styles.title}>Повідомлення</Text>
          <Text style={styles.description}>
            Функція повідомлень робить взаємодію з музикою ще зручнішою та
            цікавішою. Нові релізи улюблених артистів, подкастів, оновлення
            плейлистів.
          </Text>
          <View style={styles.buttonsWrap}>
            <Pressable
              onPress={() => {
                setFilterType("all");
              }}
            >
              <View
                style={[
                  filterType === "all" && styles.buttonActive,
                  styles.button,
                ]}
              >
                <Text style={styles.buttonText}>Всі</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setFilterType("tracks");
              }}
            >
              <View
                style={[
                  filterType === "tracks" && styles.buttonActive,
                  styles.button,
                ]}
              >
                <Text style={styles.buttonText}>Треки</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setFilterType("other");
              }}
            >
              <View
                style={[
                  filterType === "other" && styles.buttonActive,
                  styles.button,
                ]}
              >
                <Text style={styles.buttonText}>Інші</Text>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: "rgba(84, 115, 131, 1)",
              marginVertical: 8,
            }}
          />
          <View>
            <Text style={styles.emptyNotifs}>Поки нових сповіщень немає</Text>
          </View>
        </ScrollView>
        <BottomNavigation currentPage={"Notifications"} />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    color: "rgba(190, 244, 255, 1)",
    fontSize: 32,
    fontFamily: "Inter-Bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 17,
    color: "rgba(147, 167, 196, 1)",
    marginBottom: 20,
  },
  buttonsWrap: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  button: {
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "rgba(166, 218, 255, 0.3)",
    paddingVertical: 3,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "rgba(190, 244, 255, 1)",
    fontSize: 14,
    fontFamily: "Inter-Bold",
  },
  buttonActive: {
    backgroundColor: "rgba(58, 69, 76, 0.5)",
  },
  emptyNotifsWrap: {},
  emptyNotifs: {
    color: "rgba(191, 237, 253, 0.5)",
    fontSize: 28,
    fontFamily: "Inter-Bold",
  },
});
