import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SwipeableCards from '../components/SwipeableCards';
import generatedNumbers from '../utils/Maths/ClassOne';

const HomeScreen = () => {
  const data = generatedNumbers;

  return (
    <SafeAreaView style={styles.container}>
      <SwipeableCards data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen;
