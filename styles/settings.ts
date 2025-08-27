import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    title: {
      fontWeight: "700",
      fontSize: 24,
      color: "rgba(255, 255, 255, 1)",
      marginBottom: 20,
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
    logoutBtn: {
      backgroundColor: "rgba(58, 69, 76, 0.2)",
      borderColor: "rgba(166, 218, 255, 0.3)",
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
    },
    helpLabel: {
      fontWeight: "500",
      fontSize: 12,
      lineHeight: 18,
      color: "rgba(147, 167, 196, 1)",
      marginBottom: 20,
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
  });