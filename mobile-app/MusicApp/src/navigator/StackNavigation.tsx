import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';


const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainHome" component={BottomNavigation}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation