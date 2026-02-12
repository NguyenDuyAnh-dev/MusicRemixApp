import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
    return (
        <>
            {/* Thay đổi màu status bar */}
            <StatusBar
                barStyle="light-content" // chữ trắng
                backgroundColor="#1A1A1A" // nền status bar
            />
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.leftContainer}>
                    <Image style={styles.icon} source={require('../../assets/IconHeader.png')} />
                    <Text style={styles.headerText}>NDA Music App</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={24} color="#fff" />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 80,
        backgroundColor: '#1A1A1A',
        borderWidth: 1,
        borderBottomColor: 'gray',
        zIndex: 1,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 20,
    },

    searchIcon: {
        marginRight: 15,
    },
});
