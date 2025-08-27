import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleWrap: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 24,
    alignItems: "center",
  },
  title: {
    color: "rgba(190, 244, 255, 1)",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    marginRight: 8,
  },
  highlight: {
    color: "#00BFFF",
  },
  scroll: {
    marginBottom: 16,
    marginHorizontal: -16,
  },
  moodItem: {
    alignItems: "center",
    marginHorizontal: 16,
  },
  moodCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1A1F2E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  moodImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  moodLabel: {
    color: "rgba(148, 210, 255, 1)",
    fontSize: 16,
    fontFamily: "CoreSans-Regular",
    marginTop: 5,
    fontWeight: "400",
  },
  dropdown: {
    position: "absolute",
    top: 16,
    left: 0,
    backgroundColor: "#2b3a50",
    borderRadius: 6,
    paddingVertical: 7,
    zIndex: 1000,
    width: 100,
  },
  dropdownItem: {
    paddingVertical: 6,
    fontSize: 16,
  },
  dropdownText: {
    marginLeft:10,
    color: "rgba(190, 244, 255, 1)",
    fontFamily:'Inter-Bold'
  },
  activeItem: {
    backgroundColor: "rgba(60, 82, 97, 1)",
  },
  dropdownWrap: {
    position: "relative",
  },
});
