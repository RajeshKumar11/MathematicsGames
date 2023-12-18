// Import necessary modules from React and React Native
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

// Import the SwipeableCards component and generatedNumbers utility
import SwipeableCards from '../components/SwipeableCards';
import generatedNumbers from '../utils/Maths/ClassOne';

// Define the HomeScreen functional component
const HomeScreen = () => {
  // Get the data from the generatedNumbers utility
  const data = generatedNumbers;

  // Render the HomeScreen component
  return (
    // Use SafeAreaView to ensure content is displayed within safe area boundaries
    <SafeAreaView style={styles.container}>
      {/* Render the SwipeableCards component with the generated data */}
      <SwipeableCards data={data} />
    </SafeAreaView>
  );
};

// Define styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Set background color
  },
});

// Export the HomeScreen component as the default export of this module
export default HomeScreen;
