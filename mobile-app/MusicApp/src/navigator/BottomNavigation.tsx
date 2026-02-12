import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import Fontisto from '@expo/vector-icons/Fontisto';
import SongsScreen from '../screen/SongsScreen';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import PlaylistScreen from '../screen/PlaylistScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SingersScreen from '../screen/SingersScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FavoriteScreen from '../screen/FavoriteScreen';
import UserProfileScreen from '../screen/UserProfileScreen';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
    return (
        <>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#1A1A1A',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: 80, // chiều cao chuẩn
                    elevation: 10,
                    borderTopWidth: 0,
                },
                

                tabBarIconStyle: {
                    marginTop: 0, // bỏ marginTop
                    marginBottom: 0,
                    justifyContent: 'center', // căn giữa vertical
                    alignItems: 'center',
                    flex: 1, // bắt container icon chiếm toàn bộ chiều cao tabBar
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="home" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Songs"
                component={SongsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Fontisto name="music-note" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Playlist"
                component={PlaylistScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <SimpleLineIcons name="playlist" size={24} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Singers"
                component={SingersScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="microphone-variant" size={28} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserProfile"
                component={UserProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={27} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
        </>

    )
}

export default BottomNavigation

const styles = StyleSheet.create({
    iconWapper: {
        marginTop: 0,
    }
})