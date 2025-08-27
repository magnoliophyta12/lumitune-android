import { useLocalSearchParams } from 'expo-router';
import { View,Text } from 'react-native';

export default function Playlist() {
  const params = useLocalSearchParams();
  const playlistName = params.name; 

  return (
    <View>
      <Text>Плейлист: {playlistName}</Text>
    </View>
  );
}