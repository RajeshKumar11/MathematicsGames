import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigators/Navigator';

function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
