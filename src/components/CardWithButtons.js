import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import TextToSpeechComponent from './TextToSpeechComponent';
import WordButton from './WordButton';

const { width, height } = Dimensions.get('window');
const reducedWidth = width;
const reducedHeight = height - 88;
console.log(reducedWidth, reducedHeight);

const CardWithButtons = ({ cardData, cardIndex, cardSelectedIndex, resetCardIndex }) => {

  const scrollViewRef = useRef(null);
  const words = cardData.activity.trim().split(' ');

  const [sepakingText, setSepakingText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wordClickedIndex, setWordClickedIndex] = useState(-1);
  const [isCharSpeaking, setIsCharSpeaking] = useState(cardData.spellings && cardData.spellings ? true : false);
  // const [isCharSpeaking, setIsCharSpeaking] = useState(true);
  const [charClickedIndex, setCharClickedIndex] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleSpeechFinish = () => {
    if (!isCharSpeaking) {
      setWordClickedIndex(-1);
    }

    setIsSpeaking(false);
    setSepakingText('');

    if (currentWordIndex < words.length && autoPlay) {
      requestAnimationFrame(() => {
        handleWordPress(currentWordIndex + 1, words[currentWordIndex + 1]);
      });
    } else if (currentWordIndex === words.length) {
      setAutoPlay(false);
      setCurrentWordIndex(0);
    }
  };

  const handleWordPress = async (index, word) => {
    setCurrentWordIndex(index);
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

  const speakCharacter = async (char, wordIndex, charIndex) => {
    await new Promise((resolve) => setTimeout(resolve, 1000 * charIndex));

    setIsSpeaking(true);
    setSepakingText(char);
    setWordClickedIndex(wordIndex);
    setCurrentWordIndex(wordIndex);
    setCharClickedIndex(charIndex);
  };


  const speakWord = async (word, wordIndex) => {
    const delay = isCharSpeaking ? 1000 * (word.length + 2) : 0;

    await new Promise((resolve) => setTimeout(resolve, delay));

    setIsSpeaking(true);
    setWordClickedIndex(wordIndex);
    setCurrentWordIndex(wordIndex);
    setSepakingText(word);

    if (isCharSpeaking) {
      setTimeout(() => {
        setWordClickedIndex(-1);
      }, 1000 * (word.length + 2));
    }
  };

  const enableAutoPlay = () => {
    if (!autoPlay) {
      setAutoPlay(true);
      handleWordPress(currentWordIndex, words[currentWordIndex]);
      console.log("Auto Play Enabled");
    } else {
      setAutoPlay(false);
      console.log("Auto Play Disabled");
    }
  };

  const scrollToWordButton = (index) => {
    if (scrollViewRef.current) {
      const buttonHeight = 22; // Replace with the actual height of your WordButton
      const screenHeight = Dimensions.get('window').height; // Get the height of the screen

      // Calculate the offset to center the button on the screen
      const offset = index * buttonHeight - screenHeight / 2 + buttonHeight / 2;

      // Scroll to the calculated offset
      scrollViewRef.current.scrollTo({ y: offset, animated: true });
    }
  };

  return (
    <View style={styles.card}>
      {cardIndex === cardSelectedIndex ?
        <>
          {isSpeaking && (
            <TextToSpeechComponent
              textToSpeak={sepakingText}
              isSpeaking={isSpeaking}
              onSpeechFinish={handleSpeechFinish}
            />
          )}
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{cardData.title}</Text>
            <TouchableOpacity style={styles.button} onPress={enableAutoPlay}>
              <Text style={styles.buttonCharacter}>{autoPlay ? "Pause" : "Play"}</Text>
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
                  onClick={handleWordPress}
                  isSpeaking={isSpeaking}
                  isSelected={index === wordClickedIndex}
                  charClickedIndex={charClickedIndex}
                />
              ))}
            </View>
          </ScrollView>
        </>
        :
        <View style={styles.loadingContainer}>
          <Text>
            Loading...
          </Text>
        </View>
      }
    </View>
  );
};

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
    height: reducedHeight, // Set the desired height
    // Add any other styles you need for the ScrollView
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // Allow buttons to wrap to the next line
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
    color: 'white', // Default character color
  },
  loadingContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardWithButtons;
