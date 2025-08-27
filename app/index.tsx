import Home from '@/components/home/Home';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Home></Home>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001221E5',
  },
});