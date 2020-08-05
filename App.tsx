import React from 'react';
import { Platform } from 'react-native';
import { Linking } from 'expo';

import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import { withOAuth } from 'aws-amplify-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';

import config from './aws-exports';
import store from './src/store/store';

import Main from './src/main';
import MatchScreen from './src/screens/matchScreen';
import ResultScreen from './src/screens/resultScreen';
import PicturesScreen from './src/screens/picturesScreen';
import ChatScreen from './src/screens/chatScreen';
import SettingsScreen from './src/screens/settingsScreen';
import LoginScreen from './src/screens/loginScreen';

const amplifyConfig = {
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener: async (url, redirectUrl) => {
      // On Expo, use WebBrowser.openAuthSessionAsync to open the Hosted UI pages.
      const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(url, redirectUrl);

      if (type === 'success') {
        await WebBrowser.dismissBrowser();

        if (Platform.OS === 'ios') {
          return Linking.openURL(newUrl);
        }
      }
    },
    options: {
      AdvancedSecurityDataCollectionFlag: true,
    },
  },
};

const expoScheme = "peting://"
// Technically you need to pass the correct redirectUrl to the web browser.
let redirectUrl = Linking.makeUrl();
if (redirectUrl.startsWith('exp://1')) {
  // handle simulator(localhost) and device(Lan)
  redirectUrl = redirectUrl + '/--/';
} else
if (redirectUrl === expoScheme) {
  // dont do anything
} else {
  // handle the expo client
  redirectUrl = redirectUrl + '/'
}
amplifyConfig.oauth.redirectSignIn = redirectUrl;
amplifyConfig.oauth.redirectSignOut = redirectUrl;

Amplify.configure(amplifyConfig);

const App = (props) => {
  const Stack = createStackNavigator();

  const { oAuthUser: cognitoUser } = props;

  if (cognitoUser) {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Main" component={Main} />
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
