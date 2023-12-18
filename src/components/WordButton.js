// Import necessary modules from React and React Native
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Import emoji mapping utility
import { emojiMapping } from '../utils/EmojiMapping';

// Define the WordButton functional component
const WordButton = ({
  word,
  index,
  onClick,
  isAutoPlay,
  isSpeaking,
  isSelected,
  charClickedIndex,
}) => {
  
  // Get the emoji based on the word from the mapping
  const emoji = emojiMapping[word.toLowerCase()] || '';

  // Render the WordButton component
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected && styles.selectedButton,
      ]}
      onPress={() => onClick(index, word)}
      disabled={isSpeaking || isAutoPlay}
    >
      <Text style={styles.buttonText}>
        {emoji && <Text style={styles.emoji}>{emoji}</Text>} {/* Display emoji if available */}
        {word.split('').map((char, i) => (
          <Text
            key={i}
            style={[
              styles.buttonCharacter,
              isSelected && i === charClickedIndex && styles.highlightedCharacter,
            ]}
          >
            {char}
          </Text>
        ))}
      </Text>
    </TouchableOpacity>
  );
};

// Styles for the WordButton component
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 20,
    marginRight: 5,
  },
  selectedButton: {
    backgroundColor: '#2ecc71', // Change color for the selected button
  },
  buttonCharacter: {
    fontSize: 28,
    color: 'white', // Default character color
  },
  highlightedCharacter: {
    color: 'black', // Change this color to the desired highlight color
  },
});

// Export the WordButton component as the default export of this module
export default WordButton;
