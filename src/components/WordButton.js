// Import necessary modules from React and React Native
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Modal, View } from 'react-native';

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
    <React.Fragment>
      {isSelected ? (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isSelected}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.buttonText}>
                {emoji && <Text style={styles.emoji}>{emoji}</Text>}
                {word.split('').map((char, i) => (
                  <Text
                    key={i}
                    style={[
                      styles.buttonCharacter,
                      isSelected && charClickedIndex === -1 && styles.buttonSelectedCharacter,
                      isSelected && i === charClickedIndex && styles.highlightedCharacter,
                    ]}
                  >
                    {char}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
        </Modal>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          isSelected && styles.selectedButton,
        ]}
        onPress={() => onClick(index, word)}
        disabled={isSpeaking || isAutoPlay}
      >
        <Text style={styles.buttonText}>
          {/* Display emoji if available */}
          {emoji && <Text style={styles.emoji}>{emoji}</Text>}
          {word.split('').map((char, i) => (
            <Text
              key={i}
              style={[
                styles.buttonCharacter,
                isSelected && charClickedIndex === -1 && styles.buttonSelectedCharacter,
                isSelected && i === charClickedIndex && styles.highlightedCharacter,
              ]}
            >
              {char}
            </Text>
          ))}
        </Text>
      </TouchableOpacity>
    </React.Fragment>
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
  buttonSelectedCharacter: {
    fontSize: 44,
  },
  highlightedCharacter: {
    fontSize: 44,
    color: 'white', // Change this color to the desired highlight color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
});

// Export the WordButton component as the default export of this module
export default WordButton;
