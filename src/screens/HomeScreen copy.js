import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, PanResponder, Animated } from 'react-native';
import CardWithButtons from '../components/CardWithButtons';
import * as Speech from 'expo-speech';
import generatedNumbers from '../utils/Maths/ClassOne';

const { height, width } = Dimensions.get('window');
const reducedWidth = width;
const reducedHeight = height - StatusBar.currentHeight - 88;

// Memoized CardWithButtons component
const MemoizedCardWithButtons = React.memo(CardWithButtons);

const HomeScreen = () => {
  const data = generatedNumbers;

  const panX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState && gestureState.dx) {
          Animated.event(
            [null, { dx: panX }],
            { useNativeDriver: false }
          )(_, gestureState);
        }
      },
      onPanResponderRelease: (_, gestureState) => handlePanResponderRelease(gestureState),
    })
  ).current;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("\ncurrentIndex:", currentIndex);
    // Load Speech instance in the HomeScreen
    Speech.speak("", { language: 'en' });

    // Cleanup function to stop speech when the component unmounts
    return () => {
      Speech.stop();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const handlePanResponderRelease = (gestureState) => {
    console.log("Gesture State:", gestureState);
    
    // if (gestureState.dx > width / 2 && currentIndex > 0) {
    if (gestureState.dx > width / 2) {
      console.log("\nLEFT");
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        console.log("Left New Current Index:", newIndex);
        if(newIndex >= 0) {
          return newIndex;
        } else {
          return prevIndex;
        }
      });      
    } else if (gestureState.dx < -width / 2 && currentIndex < data.length - 1) {
      console.log("\nRIGHT");
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        console.log("Right New Current Index:", newIndex);
        if(newIndex < data.length) {
          return newIndex;
        } else {
          return prevIndex;
        }
      });
    }
  
    Animated.spring(panX, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };  

  const animatedStyle = {
    transform: [{ translateX: panX }],
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[animatedStyle, styles.cardContainer]}>
        <MemoizedCardWithButtons cardData={data[currentIndex]} />
      </Animated.View>
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
  cardContainer: {
    width: reducedWidth,
    height: reducedHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

// import React, { useRef, useState, useEffect } from 'react';
// import { View, FlatList, StyleSheet, Dimensions, StatusBar } from 'react-native';
// import CardWithButtons from '../components/CardWithButtons';
// import * as Speech from 'expo-speech';
// import generatedNumbers from '../utils/Maths/ClassOne';

// const { height, width } = Dimensions.get('window');
// const reducedWidth = width;
// const reducedHeight = height - StatusBar.currentHeight - 88;

// // Memoized CardWithButtons component
// const MemoizedCardWithButtons = React.memo(CardWithButtons);

// const HomeScreen = () => {
  
//   const data = generatedNumbers;

//   const flatListRef = useRef(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     // Load Speech instance in the HomeScreen
//     Speech.speak("", { language: 'en' });

//     // Cleanup function to stop speech when the component unmounts
//     return () => {
//       Speech.stop();
//     };
//   }, []); // Empty dependency array ensures this effect runs only once

//   const renderItem = ({ item, index }) => {
//     return <MemoizedCardWithButtons key={index} cardData={item} />;
//   };

//   const onScroll = (event) => {
//     // const offsetY = event.nativeEvent.contentOffset.y;
//     // const index = Math.floor(offsetY / CardHeight); // Assuming each card has the same height
//     const offsetX = event.nativeEvent.contentOffset.x;
//     const index = Math.floor(offsetX / CardWidth); // Assuming each card has the same height

//     if (index !== currentIndex) {
//       setCurrentIndex(index);
//     }
//   };

//   const onMomentumScrollEnd = () => {
//     if (flatListRef.current) {
//       flatListRef.current.scrollToIndex({ index: currentIndex, animated: true });
//     }
//   };

//   const CardHeight = reducedHeight; // Adjust as needed based on your card height
//   const CardWidth = reducedWidth;

//   return (
//     <View style={styles.container}>
//       <FlatList
//         ref={flatListRef}
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => index.toString()}
//         ItemSeparatorComponent={() => <View style={styles.separator} />}
//         onScroll={onScroll}
//         onMomentumScrollEnd={onMomentumScrollEnd}
//         scrollEventThrottle={16}
//         horizontal={true} // Set to true for horizontal scrolling
//         pagingEnabled={true} // Snap to each item while scrolling
//         showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
//       />
//       {/* <Text style={styles.currentIndexText}>{`Current Index: ${currentIndex + 1}/${data.length}`}</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: StatusBar.currentHeight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   currentIndexText: {
//     textAlign: 'center',
//     marginVertical: 10,
//   },
//   separator: {
//     // height: 16, // Adjust as needed to control spacing between cards
//     width: 16,
//   },
// });

// export default HomeScreen;
