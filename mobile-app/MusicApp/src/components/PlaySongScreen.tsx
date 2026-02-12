import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider'; // ✅ import đúng

const PlaySongScreen = () => {
  const [song] = useState({
    title: 'Waiting For You',
    artist: 'Mono',
    cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const duration = 100; // ✅ Giả lập bài hát dài 100 giây

  // ✅ useEffect điều khiển tiến trình phát nhạc
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 1 ? prev + 0.01 : 0));
      }, 500);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  // ✅ Hàm định dạng thời gian (từ giây → mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentTime = progress * duration;

  return (
    <View style={styles.container}>
      {/* Ảnh bìa */}
      <Image source={{ uri: song.cover }} style={styles.cover} />

      {/* Thông tin bài hát + icon tim */}
      <View style={styles.infoContainer}>
        <View style={styles.songInfoRow}>
          <View>
            <Text style={styles.title}>
              {song.title.length > 30 ? song.title.slice(0, 30) + '...' : song.title}
            </Text>
            <Text style={styles.artist}>{song.artist}</Text>
          </View>
          <TouchableOpacity onPress={toggleFavorite} style={{ marginLeft: 20 }}>
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'}
              size={28}
              color={isFavorite ? '#e74c3c' : '#ccc'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thanh tiến trình + thời gian */}
      <View style={styles.progressContainer}>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#1DB954"
          maximumTrackTintColor="#333"
          thumbTintColor="#1DB954"
          value={progress}
          onValueChange={(val) => setProgress(val)}
        />

        {/* ✅ Hiển thị thời gian */}
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Nút điều khiển */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back-outline" size={36} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
          <FontAwesome
            name={isPlaying ? 'pause-circle' : 'play-circle'}
            size={70}
            color="#1DB954"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward-outline" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaySongScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  cover: {
    width: 280,
    height: 280,
    borderRadius: 20,
    marginBottom: 30,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  songInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  artist: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 5,
  },
  progressContainer: {
    width: '100%',
    marginVertical: 20,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -10,
  },
  timeText: {
    color: '#ccc',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '70%',
    marginTop: 30,
  },
});
