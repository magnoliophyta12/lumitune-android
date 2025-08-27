import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  miniPlayerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9,
    elevation: 9, 
  },
  container: {
    flexDirection: 'column',
    height: 70,
    position: 'relative',
    paddingBottom: 3, 
    borderWidth:1,
    borderColor:'rgba(64, 210, 255, 0.3)',
    paddingTop:10,
    paddingHorizontal:15,
    overflow: 'hidden',
    borderRadius: 10, 
  },
  trackWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    height: 44, 
  },
    background: {
      flex: 1,
      width: "100%",
      height: "100%",
      borderRadius: 10,     
      overflow: 'hidden',
    },
    imageWrap:{
      width: 40,
      borderRadius:10,
      overflow: 'hidden',  
    },
    image: {
      flex: 1,
      resizeMode: 'cover',
    },
    info: {
      flex: 1,
      margin:5,
      marginLeft:14
    },
    title: {
      color: '#fff',
      fontWeight: '600',
    },
    artist: {
      color: 'gray',
      fontSize: 12,
    },
    addButton: {
      padding: 6,
    },
    progressBarWrap: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
    },
    progressBarBackground: {
      height: 3,
      backgroundColor: "#888",
      borderRadius: 3,
      overflow: "hidden",
      width: "93%", 
    },
    progressBarFill: {
      height: 3,
      backgroundColor: "#4A90E2",
      borderRadius: 3,
    },
  });