import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    alignItems: "center",
  },
  logo: {
    width: 140,
    height: 110,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "rgba(240, 240, 240, 1)",
    textAlign: "center",
    fontFamily: "Inter-Bold",
  },
  inputSection: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "rgba(240, 240, 240, 1)",
    width: "100%",
    marginLeft: 9,
    marginTop: 20
  },
  input: {
    height: 48,
    borderColor: "rgba(147, 183, 255, 0.5)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "rgba(0, 28, 52, 1)",
    color: "rgba(147, 183, 255, 0.5)",
  },
  error: {
    marginTop: 6,
    color: "red",
    fontSize: 14,
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: "rgba(0, 166, 255, 1)",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom:30
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  nextButtonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    width: "100%",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(136, 221, 255, 0.3)",
  },
  lineText: {
    marginHorizontal: 10,
    color: "rgba(136, 221, 255, 0.5)",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "100%",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 40,
  },
  googleText: {
    fontSize: 16,
    color: "rgba(73, 105, 153, 1)",
  },
  signInSection: {
    flexDirection: "row",
    marginTop: 32,
    alignItems: "center",
  },
  signInLink: {
    color: "rgba(147, 183, 255, 1)",
    marginLeft: 6,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  accountQuestion: {
    color: "rgba(147, 183, 255, 0.7)",
  },
  progressBarLabel: {
    color: "rgba(116, 132, 162, 1)",
    fontSize: 16,
    marginTop: 20,
  },
  progressBar: {
    flexDirection: "row",
    height: 8,
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    backgroundColor: "rgba(33, 53, 71, 1)",
    marginTop: 10,
    marginBottom: 20,
  },
  progressFill: {
    backgroundColor: "rgba(64, 204, 255, 1)",
    flex: 1,
    borderRadius: 5,
  },
  progressBackground: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    marginBottom: 10,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    marginTop: 6,
    marginRight: 10,
  },
  circleActive: {
    backgroundColor: "#38B6FF",
    borderColor: "#38B6FF",
  },
  itemText: {
    color: "#ccc",
    fontSize: 15,
    lineHeight: 20,
  },
  textActive: {
    color: "#fff",
    fontWeight: "500",
  },
  rulesSection: {
    width: "100%",
    marginTop: 18,
  },
  rulesTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "rgba(240, 240, 240, 1)",
    width: "100%",
  },
  dropdownTitle:{
    fontSize: 16,
    marginBottom: 8,
    color: "rgba(240, 240, 240, 1)",
    width: "100%",
    marginTop: 20
  },
  dropdownDescription:{
    color: "rgba(166, 166, 166, 1)",
    fontSize: 14,
  },
  dropdownLink:{
    color: "rgba(166, 166, 166, 1)",
    fontSize: 14,
    marginVertical: 4,
    textDecorationLine: "underline",
    marginBottom:20
  },
  dropdown: {
    height: 48,
    borderColor: "rgba(147, 183, 255, 0.5)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "rgba(0, 21, 39, 1)",
    color: "rgba(147, 183, 255, 0.5)",
  },

  dropdownContainer: {
    backgroundColor: "rgba(0, 21, 39, 1)",
    borderColor: "rgba(147, 183, 255, 0.5)",
  },
  row: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  
  column: {
    flex: 1,
  },
  formWrap: {
    width: "100%",
  },
  widerDropdown: {
    width: '115%', 
    alignSelf: 'center', 
  },
  backWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  
  backContainer: {
    position: 'relative',
    paddingBottom: 4,
  },
  
  backText: {
    color: 'rgba(147, 183, 255, 1)',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal:5
  },
  
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(147, 183, 255, 1)',
    borderRadius: 1,
  },
  alignCenter:{
    textAlign:'center'
  }
});
