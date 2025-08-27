import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    carouselWrapper: {
      position: 'relative',
      width: 400,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
    },
    carousel: {
      width: '100%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    arrow: {
      position: 'absolute',
      top: '45%',
      zIndex: 4,
      padding: 12,
      borderRadius: 50,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    arrowText: {
      color: 'white',
      fontSize: 24,
    },
    left: {
      left: 10,
    },
    right: {
      right: 10,
    },
    poster: {
      position: 'absolute',
      width: '90%',
      height: '100%',
      borderRadius: 20,
    },
    dots: {
      flexDirection: 'row',
      marginTop: 10,
      gap: 8,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(93, 110, 150, 1)',
    },
    activeDot: {
      backgroundColor: 'rgba(123, 166, 223, 1)',
    },
  });
  