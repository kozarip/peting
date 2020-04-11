import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './src/screens/profileScreen';
import SearchScreen from './src/screens/searchScreen';
import MatchScreen from './src/screens/matchScreen';
import LoginScreen from './src/screens/loginScreen';
import ResultScreen from './src/screens/resultScreen';
import PicturesScreen from './src/screens/picturesScreen';
/* import { View } from 'react-native';
import { Header } from 'react-native-elements'; */

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
        initialRouteName="UserCheck" // Search
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="UserCheck" component={ResultScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Match" component={MatchScreen} />
        <Stack.Screen name="Pictures" component={PicturesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
