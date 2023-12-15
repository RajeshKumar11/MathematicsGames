import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

function Navigator() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarVisible: false }} // Hide the bottom tab bar
    >
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{ headerShown: false }} // Disable header for HomeScreen
      />
      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{ headerShown: false }} // Disable header for HomeScreen
      />
      <Tab.Screen name="Search" component={SearchScreen} 
        options={{ headerShown: false }} // Disable header for HomeScreen
      />
    </Tab.Navigator>
  );
}

export default Navigator;
