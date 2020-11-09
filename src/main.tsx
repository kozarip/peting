import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import User from './services/user';
import Chat from './services/chat';
import { setGlobalMatches } from './services/match';
import {
  setGlobalSearchParams,
  setUser,
  setMatches,
  setChatIds,
  setHasNotification,
} from './store/action';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Main = ({ navigation }) => {
  const user = new User();
  const chat = new Chat();
  const dispatch = useDispatch();

  const registerForPushNotificationsAsync = async () => {
    console.log(await Notifications.getExpoPushTokenAsync());
    return Notifications.getExpoPushTokenAsync();
  };

  useEffect(() => {
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    const tokenResponse = registerForPushNotificationsAsync();
    tokenResponse.then((token) => {
      console.log(token);
      user.crateNewUserIfNotExist().then((exist) => {
        if (exist) {
          const userData = user.getCurrentUserAttributes().data.userByCognitoUserName.items[0];
          userData.deviceId = token.data;
          dispatch(setGlobalSearchParams({
            searchParams: user.getCurrentUserAttributes().data.userByCognitoUserName.items[0].search,
          }));
          dispatch(setUser({
            user: userData,
          }));
          setGlobalMatches(
            user,
            userData.cognitoUserName,
            setMatchToGlobalState,
            navigation, navigationReset,
          );
          setGlobalChatIDs(userData.cognitoUserName);
        } else {
          navigation.navigate('Settings', { newUser: true });
          if (Platform.OS === 'android') {
            navigationReset('Settings', { newUser: true });
          }
        }
      });
    });
  }, []);

  const handleNotification = (newNotification) => {
    if (newNotification) {
      dispatch(setHasNotification(true));
    }
  };

  const handleNotificationResponse = (response) => {
    console.log(response);
    navigation.navigate('Match');
  };

  const navigationReset = (defaultScreen, paramsObj?) => {
    navigation.reset({
      index: 0,
      routes: [{ name: defaultScreen, params: paramsObj }],
    });
  };

  const setMatchToGlobalState = (match) => {
    dispatch(setMatches(match));
  };

  const setGlobalChatIDs = (cognitoUserName) => {
    chat.getMyChats(cognitoUserName).then((myChats) => {
      const IDs = [];
      myChats.data.searchChats.items.forEach(myChat => {
        IDs.push(myChat.id);
      });
      dispatch(setChatIds({ chatIDs: IDs }));
    });
  };

  const image = require('./assets/images/background.png');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.container}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.5 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});

export default Main;
