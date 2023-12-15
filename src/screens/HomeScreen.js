import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SwipeableCards from '../components/SwipeableCards';
import generatedNumbers from '../utils/Maths/ClassOne';

const HomeScreen = () => {
  // const data = [
  //   { title: 'Card 1' },
  //   { title: 'Card 2' },
  //   { title: 'Card 3' },
  //   // Add more data as needed
  // ];
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
