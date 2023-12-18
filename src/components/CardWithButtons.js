// Import necessary modules from React and React Native
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

// Import custom components for text-to-speech and word button
import TextToSpeechComponent from './TextToSpeechComponent';
import WordButton from './WordButton';

// Get the device dimensions
const { width, height } = Dimensions.get('window');
const reducedHeight = height - 88;

// Define the CardWithButtons functional component
const CardWithButtons = ({ cardData, cardIndex, cardSelectedIndex }) => {
  // Ref to scroll view
  const scrollViewRef = useRef(null);

  // Extract words from the activity
  const words = cardData.activity.trim().split(' ');

  // State variables
  const [speakingText, setSpeakingText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wordClickedIndex, setWordClickedIndex] = useState(-1);
  const [isCharSpeaking, setIsCharSpeaking] = useState(
    cardData.spellings && cardData.spellings ? true : false
  );
  const [charClickedIndex, setCharClickedIndex] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Effect to handle auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      handleWordPress(currentWordIndex, words[currentWordIndex]);
    }
  }, [autoPlay]);

  // Callback when text-to-speech finishes
  const handleSpeechFinish = () => {
    if (!isCharSpeaking) {
      setWordClickedIndex(-1);
    }

    setIsSpeaking(false);
    setSpeakingText('');

    if (currentWordIndex < words.length && autoPlay) {
      requestAnimationFrame(() => {
        handleWordPress(currentWordIndex + 1, words[currentWordIndex + 1]);
      });
    } else if (currentWordIndex === words.length) {
      setAutoPlay(false);
      setCurrentWordIndex(0);
    }
  };

  // Function to handle word pressing
  const handleWordPress = async (index, word) => {
    setCurrentWordIndex(index);
    scrollToWordButton(index);

    if (isCharSpeaking) {
      const charsList = word.split('');

      if (charsList.length > 0) {
        for (let charIndex = 0; charIndex < charsList.length; charIndex++) {
          const char = charsList[charIndex];
          await speakCharacter(char, index, charIndex);
        }
      }

      await speakWord(word, index);
    } else {
      await speakWord(word, index);
    }
  };

  // Function to speak individual characters
  const speakCharacter = async (char, wordIndex, charIndex) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 * charIndex));

    setIsSpeaking(true);
    setSpeakingText(char);
    setWordClickedIndex(wordIndex);
    setCurrentWordIndex(wordIndex);
    setCharClickedIndex(charIndex);
  };

  // Function to speak the entire word
  const speakWord = async (word, wordIndex) => {
    const delay = isCharSpeaking ? 1000 * (word.length + 2) : 0;

    await new Promise((resolve) => setTimeout(resolve, delay));

    setIsSpeaking(true);
    setWordClickedIndex(wordIndex);
    setCurrentWordIndex(wordIndex);
    setSpeakingText(word);

    if (isCharSpeaking) {
      setTimeout(() => {
        setWordClickedIndex(-1);
      }, 1000 * (word.length + 2));
    }
  };

  // Function to enable/disable auto-play
  const enableAutoPlay = () => {
    setAutoPlay(!autoPlay);
    console.log(`Auto Play ${autoPlay ? 'Disabled' : 'Enabled'}`);
  };

  // Function to scroll to a specific word button
  const scrollToWordButton = (index) => {
    if (scrollViewRef.current) {
      const buttonHeight = 22;
      const screenHeight = Dimensions.get('window').height;

      const offset = index * buttonHeight - screenHeight / 2 + buttonHeight / 2;
      scrollViewRef.current.scrollTo({ y: offset, animated: true });
    }
  };

  // Render the component
  return (
    <View style={styles.card}>
      {cardIndex === cardSelectedIndex ? (
        <>
          {isSpeaking && (
            <TextToSpeechComponent
              textToSpeak={speakingText}
              isSpeaking={isSpeaking}
              onSpeechFinish={handleSpeechFinish}
            />
          )}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{cardData.title}</Text>
            <TouchableOpacity style={styles.button} onPress={enableAutoPlay}>
              <Text style={styles.buttonCharacter}>{autoPlay ? 'Pause' : 'Play'}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.buttonContainer}>
              {words.map((word, index) => (
                <WordButton
                  key={index}
                  word={word}
                  index={index}
                  isAutoPlay={autoPlay}
                  onClick={handleWordPress}
                  isSpeaking={isSpeaking}
                  isSelected={index === wordClickedIndex}
                  charClickedIndex={charClickedIndex}
                />
              ))}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  scrollView: {
    height: reducedHeight,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCharacter: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Export the CardWithButtons component as the default export of this module
export default CardWithButtons;
