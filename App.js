import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Routes />
    </NavigationContainer>
  );
}
