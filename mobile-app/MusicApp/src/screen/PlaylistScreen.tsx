import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';

type Playlist = {
  id: number;
  title: string;
  picture_medium: string;
  nb_tracks: number;
};

const PlaylistScreen = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Lấy danh sách playlist hot từ Deezer API (mặc định genre = pop)
    fetch('https://api.deezer.com/chart/0/playlists')
      .then(res => res.json())
      .then(json => {
        setPlaylists(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.picture_medium }} style={styles.image} />
      <View style={styles.cardText}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.tracks}>{item.nb_tracks} bài hát</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlist của bạn</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          key={'2-cols'} // ✅ khắc phục lỗi Changing numColumns on the fly
          data={playlists}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    width: '48%',
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardText: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tracks: {
    color: '#bbb',
    fontSize: 13,
    marginTop: 3,
  },
});
