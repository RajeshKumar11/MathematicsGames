import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native';
import TextToSpeechComponent from './TextToSpeechComponent';
import WordButton from './WordButton';

const { width, height } = Dimensions.get('window');
const reducedWidth = width;
const reducedHeight = height - 88;
console.log(reducedWidth, reducedHeight);

const CardWithButtons = ({ cardData, cardIndex, resetCardIndex }) => {
  const words = cardData.activity.trim().split(' ');

  const [sepakingText, setSepakingText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wordClickedIndex, setWordClickedIndex] = useState(-1);
  const [isCharSpeaking, setIsCharSpeaking] = useState(cardData.spellings && cardData.spellings ? true : false);
  const [charClickedIndex, setCharClickedIndex] = useState(-1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (cardIndex === resetCardIndex - 1 || cardIndex === resetCardIndex + 1) {
      console.log(`Card at index ${cardIndex} needs to be reloaded`);
      setAutoPlay(false);
      setIsSpeaking(false);
    }
  }, [cardIndex, resetCardIndex]);

  const handleSpeechFinish = () => {
    if (!isCharSpeaking) {
      setWordClickedIndex(-1);
    }
    setIsSpeaking(false);
    setSepakingText('');

    if (currentWordIndex < words.length && autoPlay) {
      setTimeout(() => {
        handleWordPress(currentWordIndex + 1, words[currentWordIndex + 1]);
      }, 1);
    }
  };

  const handleWordPress = async (index, word) => {
    setCurrentWordIndex(index);

    if (isCharSpeaking) {
      const wordsList = word.split('');

      for (let charIndex = 0; charIndex < wordsList.length; charIndex++) {
        const char = wordsList[charIndex];
        await speakCharacter(char, index, charIndex);
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
    setCharClickedIndex(charIndex);
  };

  const speakWord = async (word, wordIndex) => {
    const delay = isCharSpeaking ? 1000 * (word.length + 2) : 0;

    await new Promise((resolve) => setTimeout(resolve, delay));

    setIsSpeaking(true);
    setWordClickedIndex(wordIndex);
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

  return (
    <View style={styles.card}>
      {isSpeaking && (
        <TextToSpeechComponent
          textToSpeak={sepakingText}
          isSpeaking={isSpeaking}
          onSpeechFinish={handleSpeechFinish}
        />
      )}
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{cardData.title}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={enableAutoPlay}
        >
          <Text style={styles.buttonCharacter}>
            {autoPlay ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
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
});

export default CardWithButtons;
