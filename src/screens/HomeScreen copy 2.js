import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, Dimensions, StatusBar } from 'react-native';
import CardWithButtons from '../components/CardWithButtons';
import * as Speech from 'expo-speech';
import generatedNumbers from '../utils/Maths/ClassOne';

const { height, width } = Dimensions.get('window');
const reducedWidth = width;
const reducedHeight = height - StatusBar.currentHeight - 88;

const HomeScreen = () => {
  const data = generatedNumbers;

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load Speech instance in the HomeScreen
    Speech.speak("", { language: 'en' });

    // Cleanup function to stop speech when the component unmounts
    return () => {
      Speech.stop();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    // Load data based on currentIndex
    // Example: fetchData(data[currentIndex]);

    // Log the currentIndex for demonstration purposes
    console.log('Current Index:', currentIndex);
  }, [currentIndex]);

  const renderItem = useCallback(({ item, index }) => {
    return <CardWithButtons key={`${index}-${currentIndex}`} cardData={item} />;
  }, []);
  
  const onScroll = useCallback((event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / reducedWidth);
  
    setCurrentIndex((prevIndex) => {
      if (prevIndex !== index) {
        // Perform other updates if needed
        return index;
      }
      return prevIndex;
    });    
  }, [currentIndex]);
  
  const onMomentumScrollEnd = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
    }
  }, [currentIndex]);  

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={4}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    width: 16,
  },
});

export default HomeScreen;
