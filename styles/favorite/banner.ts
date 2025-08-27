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
    container: {
      flex: 1,
      marginTop:10,
    },
    mainBlock:{
      height:200,
      flexDirection: 'column',
      justifyContent:'flex-end',
      marginLeft:20,
      marginBottom:10
    },
    title:{
      fontSize:14,
      color:"rgba(255, 255, 255, 1)",
      fontFamily: 'CoreSans-Regular'
    },
    name:{
      fontSize:32,
      color:"rgba(255, 255, 255, 1)",
      fontFamily:'Inter-Bold'
    }
  });
  