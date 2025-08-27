import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: "#001221E5",
      justifyContent: "space-between",
      borderBottomColor:'rgba(166, 218, 255, 1)',
      borderBottomWidth:1
    },
    logo: {
      width: 55,
      height: 55,
      resizeMode: "contain",
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 23,
      borderWidth: 5,
      borderColor: "rgba(69, 96, 144, 0.19)",
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
      marginHorizontal: 10,
      backgroundColor: "#001C34",
      borderRadius: 10,
      paddingLeft: 10,
      borderWidth: 2,
      borderColor: "#2d4f6b",
      borderRightWidth: 0,
      height: 40,
    },
    searchInput: {
      flex: 1,
      height: "100%",
      paddingHorizontal: 8,
      color: "#AAE4FF99",
      fontSize: 12,
      fontFamily: "Inter-Bold",
    },
    searchIcon: {
      marginRight: 6,
    },
    voiceIconWrap: {
      borderWidth: 2,
      borderColor: "#2d4f6b",
      borderRadius: 10,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    voiceIcon: {
      width: 13,
      height: 23,
    },
  });
  