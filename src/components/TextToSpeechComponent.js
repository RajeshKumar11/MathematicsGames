import React, { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';

const speak = async (text, onSpeechFinish) => {
  try {
    await Speech.speak(text, {
      language: 'en',
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

const TextToSpeechComponent = ({ textToSpeak, isSpeaking, onSpeechFinish }) => {
  useEffect(() => {
    if (isSpeaking) {
      speak(textToSpeak, onSpeechFinish);
    }
  }, [textToSpeak, isSpeaking]);

  return null; // Return null as there is no UI element in this component
};

export default TextToSpeechComponent;
