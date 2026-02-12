import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, ListRenderItem } from 'react-native';
import React from 'react';

interface Singer {
  id: string;
  name: string;
  image: string;
}
const singers = [
  {
    id: '1',
    name: 'MIN',
    image: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Sơn Tùng M-TP',
    image: 'https://images.unsplash.com/photo-1600185365689-fb63ac7362b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Hoàng Thùy Linh',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Đen Vâu',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
  },
];



const SingersScreen = () => {
  const handlePress = (singer : Singer) => {
    console.log('Ca sĩ:', singer.name);
  };

  const renderItem: ListRenderItem<Singer> = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ca sĩ nổi bật</Text>
      <FlatList
        data={singers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SingersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0b',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 18,
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginBottom: 10,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
