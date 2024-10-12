import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import HeaderMenu from './components/HeaderMenu';
import MenuItem from './components/MenuItem';
import FooterMenu from './components/FooterMenu';
export default function App() {
  return (
    <>
    <View style={styles.container}>
      <MenuItem />
      <FooterMenu />
    </View>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
