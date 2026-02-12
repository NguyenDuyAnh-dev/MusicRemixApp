import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import StackNavigation from './src/navigator/StackNavigation';



export default function App() {
  return (
    <SafeAreaProvider>
      <StackNavigation />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});
