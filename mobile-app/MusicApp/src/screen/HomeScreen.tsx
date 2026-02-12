import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import Header from '../components/Header';
import PlaylistScreen from './PlaylistScreen';
import SongsScreen from './SongsScreen';
import SingersScreen from './SingersScreen';
import FavoriteScreen from './FavoriteScreen';
import PlaySongScreen from '../components/PlaySongScreen';

const sections = [
  { id: 'playlist', component: <PlaylistScreen /> },
  { id: 'songs', component: <SongsScreen /> },
  { id: 'singers', component: <SingersScreen /> },
  { id: 'favorite', component: <FavoriteScreen /> },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* <PlaySongScreen /> */}
      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <View style={styles.section}>{item.component}</View>}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  section: {
    marginBottom: 10,
  },
});
