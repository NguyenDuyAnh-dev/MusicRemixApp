import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Alert
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type FavoriteSong = {
    id: number;
    title: string;
    artist: string;
    cover: string;
};

const UserProfileScreen = () => {
    // Giả lập dữ liệu người dùng
    const [user, setUser] = useState({
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        avatar: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    });

    // Giả lập danh sách yêu thích
    const [favorites, setFavorites] = useState<FavoriteSong[]>([
        {
            id: 1,
            title: 'Dieu Anh Biet',
            artist: 'Chi Dan',
            cover: 'https://cdns-images.dzcdn.net/images/cover/12345/500x500-000000-80-0-0.jpg',
        },
        {
            id: 2,
            title: 'Waiting For You',
            artist: 'Mono',
            cover: 'https://cdns-images.dzcdn.net/images/cover/78910/500x500-000000-80-0-0.jpg',
        },
    ]);

    const handleLogout = () => {
        Alert.alert('Đăng xuất', 'Bạn có chắc muốn đăng xuất không?', [
            { text: 'Huỷ' },
            { text: 'Đăng xuất', onPress: () => console.log('User logged out') },
        ]);
    };

    const renderFavorite = ({ item }: { item: FavoriteSong }) => (
        <View style={styles.songItem}>
            <Image source={{ uri: item.cover }} style={styles.cover} />
            <View style={styles.info}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.artist}>{item.artist}</Text>
            </View>
            <FontAwesome name="heart" size={22} color="#e74c3c" />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>

                <View style={styles.stats}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{favorites.length}</Text>
                        <Text style={styles.statLabel}>Bài yêu thích</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>24</Text>
                        <Text style={styles.statLabel}>Đã nghe</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editText}>Chỉnh sửa hồ sơ</Text>
                </TouchableOpacity>

                {/* Đăng xuất */}
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

            {/* Danh sách bài hát yêu thích */}
            <Text style={styles.sectionTitle}>Bài hát yêu thích</Text>
            <FlatList
                data={favorites}
                renderItem={renderFavorite}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 15,
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#1DB954',
    },
    name: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginTop: 10,
    },
    email: {
        color: '#aaa',
        fontSize: 14,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },
    statBox: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    statNumber: {
        color: '#1DB954',
        fontSize: 18,
        fontWeight: '700',
    },
    statLabel: {
        color: '#aaa',
        fontSize: 14,
    },
    editButton: {
        marginTop: 15,
        backgroundColor: '#1DB954',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        width: '50%',
        alignItems: 'center',
    },
    editText: {
        color: '#fff',
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
    },
    cover: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    info: {
        flex: 1,
        marginLeft: 12,
    },
    songTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    artist: {
        color: '#bbb',
        fontSize: 14,
    },
    logoutButton: {
        backgroundColor: '#333',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 25,
        width: '50%',
    },
    logoutText: {
        color: '#e74c3c',
        fontWeight: '600',
    },
});
