import { styles } from '@/styles/home/bottomNavigation';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

type BottomNavigationProps = {
  currentPage: string; 
};

export default function BottomNavigation ({ currentPage }: BottomNavigationProps){
  const router = useRouter();
  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Image source={
          currentPage==="Home"
            ? require('../../assets/images/bottomNavigation/homeActive.png')
            : require('../../assets/images/bottomNavigation/homeInactive.png')
        } />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/favorite")}>
        <Image source={
          currentPage==="Favorite"
            ? require('../../assets/images/bottomNavigation/heartActive.png')
            : require('../../assets/images/bottomNavigation/heartInactive.png')
        } />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/library")}>
        <Image source={
          currentPage==="Library"
            ? require('../../assets/images/bottomNavigation/playlistsActive.png')
            : require('../../assets/images/bottomNavigation/playlistsInactive.png')
        } />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/notifications")}>
        <Image source={
          currentPage==="Notifications"
            ? require('../../assets/images/bottomNavigation/notifActive.png')
            : require('../../assets/images/bottomNavigation/notifInactive.png')
        } />
      </TouchableOpacity>
    </View>
  );
};


