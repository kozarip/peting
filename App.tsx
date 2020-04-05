import React from 'react';
import MainScreen from './src/screens/mainScreen';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default function App() {
  return (
    <MainScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
