import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MatchScreen from './src/screens/matchScreen';
import LoginScreen from './src/screens/loginScreen';
import ResultScreen from './src/screens/resultScreen';
import PicturesScreen from './src/screens/picturesScreen';
/* import { View } from 'react-native';
import { Header } from 'react-native-elements'; */
import ChatScreen from './src/screens/chatScreen';
import SettingsScreen from './src/screens/settingsScreen';

export default function MainScreen() {
  const Stack = createStackNavigator();
  const user = true;

  if (!user) {
    return (
      <LoginScreen />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Result"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Pictures" component={PicturesScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
