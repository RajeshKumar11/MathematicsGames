// Import necessary modules from React
import React, { useState, useEffect } from 'react';

// Import Speech module from Expo for text-to-speech functionality
import * as Speech from 'expo-speech';

// Function to speak the provided text
const speak = async (text, onSpeechFinish) => {
  try {
    // Use Expo Speech module to speak the provided text with certain options
    await Speech.speak(text, {
      language: 'en', // Specify the language (English in this case)
      rate: 0.8, // Speed: 1.0 is the default, adjust as needed
      pitch: 1.0, // Pitch: 1.0 is the default, adjust as needed
    });

    // Notify the parent component that speech is finished after a delay
    setTimeout(() => {
      if (onSpeechFinish) {
        onSpeechFinish();
      }
    }, 1); // You may need to adjust the delay based on your requirements
  } catch (error) {
    console.error('Error speaking:', error);
  }
};

// Define the TextToSpeechComponent functional component
const TextToSpeechComponent = ({ textToSpeak, isSpeaking, onSpeechFinish }) => {
  // Effect to handle changes in 'textToSpeak' or 'isSpeaking'
  useEffect(() => {
    // If speech is requested and there is text to speak, invoke the 'speak' function
    if (isSpeaking && textToSpeak) {
      speak(textToSpeak, onSpeechFinish);
    }
  }, [textToSpeak, isSpeaking]);

  // Return null as there is no UI element in this component
  return null;
};

// Export the TextToSpeechComponent component as the default export of this module
export default TextToSpeechComponent;
