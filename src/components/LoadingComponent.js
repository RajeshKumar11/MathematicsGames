// Import necessary modules from React and React Native
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Define the LoadingComponent functional component
const LoadingComponent = () => {
  // Render a view with an activity indicator and loading text
  return (
    <View style={styles.loadingContainer}>
      {/* Display a loading spinner */}
      <ActivityIndicator size="large" color="#0000ff" />
      {/* Display loading text */}
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

// Styles for the LoadingComponent
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

// Export the LoadingComponent component as the default export of this module
export default LoadingComponent;
