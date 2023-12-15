import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Mapping between words and corresponding emojis
const emojiMapping = {
  'wake': '⏰',
  'early': '🌅',
  'to-do': '📝',
  'organized': '🗃️',
  'exercise': '🏋️‍♂️',
  'physical': '🏃',
  'mental': '🧠',
  'well-being': '💪',
  'balanced': '⚖️',
  'nutritious': '🥦',
  'diet': '🍎',
  'fruits': '🍏',
  'vegetables': '🥕',
  'hydrated': '💧',
  'water': '🚰',
  'sleep': '😴',
  'books': '📚',
  'knowledge': '🧠',
  'mind': '🤔',
  'mindfulness': '🧘',
  'meditation': '🧘‍♂️',
  'gratitude': '🙏',
  'positive': '😊',
  'goals': '🎯',
  'skill': '🛠️',
  'hobby': '🎨',
  'screen time': '📱⏰',
  'breaks': '☕',
  'technology': '🔧',
  'posture': '🚶‍♂️',
  'health': '❤️',
  'relationships': '👫',
  'listening': '👂',
  'processed foods': '🍔🚫',
  'sugars': '🍬🚫',
  'breathing exercises': '🌬️',
  'reduce stress': '😌',
  'volunteer': '🤝',
  'journal': '📓',
  'self-care': '🛁',
  'positive attitude': '😇',
  'challenging situations': '🤨',
  'organized': '🗂️',
  'decluttering': '🧹',
  'living spaces': '🏡',
  'workspaces': '🏢',
  'boundaries': '🚧',
  'work-life balance': '⚖️',
  'say "no"': '🙅‍♂️',
  'overcommitment': '🚫',
  'review': '📋',
  'assess': '🤔',
  'empathy': '🤝',
  'understanding': '🤔',
  'continuous learning': '📚🎓',
  'growth': '🌱',
  'save money': '💰',
  'budgeting': '📊',
  'curious': '🤔',
  'ask questions': '❓',
  'tolerance': '🌍',
  'open-mindedness': '🤯',
  'creativity': '🎨',
  'art': '🎨',
  'writing': '📝',
  'growth mindset': '🌱🧠',
  'effective stress management': '🧘‍♂️',
  'communication skills': '🗣️',
  'random acts of kindness': '🤝',
  'healthy meals': '🥗',
  'mental health': '🧠❤️',
  'support': '🤗',
  'negative news': '🚫📰',
  'positive media diet': '🌐📰',
  'physical activities': '🏃‍♂️',
  'time management': '⌛',
  'optimization': '🔄',
  'expressing': '🗣️',
  'receiving feedback': '👂🔄',
  'sense of humor': '😄',
  'joy': '😊',
  'small moments': '🌈',
  'assess and update goals': '🔄📋',
  'relax': '☕😌',
  'recharge': '⚡',
  'environmental consciousness': '🌍♻️',
  'sustainability': '♻️',
  'resilience': '🌳',
  'challenges': '🏔️',
  'financial goals': '💰🎯',
  'future': '🔮',
  'supportive social network': '🤝',
  'celebrate achievements': '🎉🏆',
  'mindfulness in daily activities': '🧘‍♂️🌍',
};

const WordButton = ({ word, index, onClick, isSpeaking, isSelected, charClickedIndex }) => {
  // useEffect to handle side effects when certain props change
  useEffect(() => {
    // Example: Perform some action when isSelected or charClickedIndex changes
    // console.log('isSelected or charClickedIndex changed:', isSelected, charClickedIndex);
  }, [isSelected, charClickedIndex]);

  // Get the emoji based on the word from the mapping
  const emoji = emojiMapping[word.toLowerCase()] || '';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected && styles.selectedButton
      ]}
      onPress={() => onClick(index, word)}
      disabled={isSpeaking}
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

export default WordButton;
