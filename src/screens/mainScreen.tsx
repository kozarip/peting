import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Firebase from '../integrations/firebase';

import MatchScreen from './matchScreen';
import ResultScreen from './resultScreen';
import PicturesScreen from './picturesScreen';
import ChatScreen from './chatScreen';
import SettingsScreen from './settingsScreen';
import LoginScreen from './loginScreen';

require('../services/clearGlobalSetTimeout');

const AuthScreen: React.FC = () => {
  const Stack = createStackNavigator();

  const user = useSelector((state: any) => state.firebase);

  if (!user.auth.isEmpty) {
    // eslint-disable-next-line prefer-destructuring
    const uid = user.auth.providerData[0].uid;
    Firebase.database().ref(`/users/${uid}`).set({
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
