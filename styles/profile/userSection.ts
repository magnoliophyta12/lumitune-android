import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    imageRadius: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    absoluteFill: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: "hidden",
    },
    container: {
      flex: 1,
      marginTop:10
    },
    profileBlock: {
      borderRadius: 12,
      padding: 16,
  
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
    },
    avatarSection: {
      alignItems: "center",
      marginVertical: 16,
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "#00000099",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      width: "80%",
      backgroundColor: "rgba(23, 57, 69, 1)",
      padding: 20,
      borderRadius: 10,
    },
    titleUpload: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      color: "#fff",
      alignSelf: "center",
      fontFamily:'CoreSans-Medium'
    },
    inputUpload: {
      alignItems:'center',
      width: "100%",
      paddingVertical: 10,
      paddingHorizontal: 16,
      fontSize: 11,
      fontWeight: "400",
      color: "#fff",
      backgroundColor: "#083647",
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "#3f5e7a",
      borderRadius: 8,
      marginBottom: 20,
    },
    btnUpload: {
      alignSelf: "center",
      paddingVertical: 10,
      paddingHorizontal: 22,
      backgroundColor: "rgba(88, 191, 226, 1)",
      borderRadius: 8,
    },
    btnUploadText: {
      color: "rgba(2, 39, 46, 1)",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "Inter-Bold",
      alignSelf:"center"
    },
    uploadInputText:{
      color: "rgba(82, 134, 159, 1)",
      fontSize: 16,
      fontWeight: "600",
      fontFamily: "Inter-Bold",
      alignSelf:"center"
    },
    nameSection: {
      alignItems: "center",
    },
    username: {
      fontSize: 32,
      fontWeight: "600",
    },
    statistics: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 24,
      marginTop: 12,
      width: "100%",
    },
    statItem: {
      alignItems: "center",
    },
    description: {
      marginTop: 16,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      paddingHorizontal: 15,
      paddingVertical: 10,
      color:'rgba(229, 249, 255, 1)',
      fontStyle:'italic',
      fontFamily:'CoreSans-Medium'
    },
    profileText: {
      color: "rgba(255, 255, 255, 1)",
    },
    statTitle: {
      fontSize: 15,
    },
    statValue: {
      fontSize: 18,
    },
    descriptionText: {
      lineHeight: 20,
      fontStyle: "italic",
    },
    filename:{
      color:"#fff",
      alignContent:"center",
      justifyContent:"center"
    },
    iconsWrap:{
      flexDirection:'row',
      gap:10

    },
    icon:{
      height:19,
      width:16
    },
    uploadAvatar:{
      flexDirection:'column'
    },
    inputSection: {
      width: "100%",
    },
    label: {
      fontSize: 18,
      marginBottom: 8,
      color: "rgba(212, 237, 255, 1)",
      width: "100%",
      marginLeft: 9,
      marginTop: 20,
      fontFamily:'CoreSans-Medium'
    },
    input: {
      height: 48,
      borderColor: "rgba(82, 134, 159, 1)",
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      fontSize: 16,
      backgroundColor: "rgba(42, 86, 101, 1)",
      color: "rgba(212, 237, 255, 1)",
    },
    uploadWrap:{
      flexDirection:'column',
      marginBottom:20
    }
  });
  