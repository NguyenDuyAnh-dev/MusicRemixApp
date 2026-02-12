import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Kiểu dữ liệu bài hát
type Song = {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    cover_medium: string;
  };
};

const SongsScreen = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://api.deezer.com/search?q=gazo')
      .then(res => res.json())
      .then(json => {
        setSongs(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Giới hạn tiêu đề tối đa 30 ký tự
  const truncateTitle = (title: string) => {
    return title.length > 25 ? title.substring(0, 25) + '...' : title;
  };

  // Hàm toggle thả tim
  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Render từng bài hát
  const renderItem = ({ item }: { item: Song }) => {
    const isFavorite = favorites.includes(item.id);
    return (
      <View style={styles.songItem}>
        <Image source={{ uri: item.album.cover_medium }} style={styles.cover} />
        <View style={styles.info}>
          <Text style={styles.title}>{truncateTitle(item.title)}</Text>
          <Text style={styles.artist}>{truncateTitle(item.artist.name)}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <FontAwesome name="heart-o" size={24} color={isFavorite ? '#e74c3c' : '#ccc'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách bài hát</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
};

export default SongsScreen;

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
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#1A1A1A',
    borderRadius: 10,
    padding: 10,
  },
  cover: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 3,
  },
});
