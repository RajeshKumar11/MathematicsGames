// Import necessary modules from React and React Navigation
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import screen components for each tab
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

// Create a bottom tab navigator using React Navigation
const Tab = createBottomTabNavigator();

// Define a functional component called Navigator
function Navigator() {
  return (
    // Define the bottom tab navigator with certain options
    <Tab.Navigator
      screenOptions={{ tabBarVisible: false }} // Hide the bottom tab bar
    >
      {/* Define the first tab named "Home" with its associated component and options */}
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{ headerShown: false }} // Disable header for HomeScreen
      />
      {/* Define the second tab named "Profile" with its associated component and options */}
      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{ headerShown: false }} // Disable header for ProfileScreen
      />
      {/* Define the third tab named "Search" with its associated component and options */}
      <Tab.Screen name="Search" component={SearchScreen} 
        options={{ headerShown: false }} // Disable header for SearchScreen
      />
    </Tab.Navigator>
  );
}

// Export the Navigator component as the default export of this module
export default Navigator;
