import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import MatchScreen from './matchScreen';
import ResultScreen from './resultScreen';
import PicturesScreen from './picturesScreen';
import ChatScreen from './chatScreen';
import SettingsScreen from './settingsScreen';
import LoginScreen from './loginScreen';
import Firebase from '../integrations/firebase';

const AuthScreen: React.FC = () => {
  const Stack = createStackNavigator();

  const user = useSelector((state: any) => state.firebase);

  /* Firebase.auth().onAuthStateChanged(
    (user) => {
      if (u) {
        console.log('Bejelentkezve');
      } else {
        console.log('Nincs user');
      }
    },
  ); */

  if (!user.auth.isEmpty) {
    Firebase.database().ref(`/users/${1234}`).set({
      name: user.auth.displayName,
    });
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
  return (
    <LoginScreen />
  );
};

export default AuthScreen;
