import React from 'react';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import { withOAuth } from "aws-amplify-react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import config from './aws-exports';
import MatchScreen from './src/screens/matchScreen';
import ResultScreen from './src/screens/resultScreen';
import PicturesScreen from './src/screens/picturesScreen';
import ChatScreen from './src/screens/chatScreen';
import SettingsScreen from './src/screens/settingsScreen';
import LoginScreen from './src/screens/loginScreen';


require('./src/services/clearGlobalSetTimeout');

import store from './src/store/store';

Amplify.configure(config);

const App = (props) => {
  const Stack = createStackNavigator();

  const {
    oAuthUser: user,
  } = props;

  if (user) {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
  return (
    <LoginScreen />
  );
};

export default withOAuth(App);
