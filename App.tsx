import React from 'react';
import { Provider } from 'react-redux';
import MainScreen from './src/screens/mainScreen';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
