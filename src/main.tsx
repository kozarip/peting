import React, { useEffect } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';

import User from './services/user';
import Chat from './services/chat';
import { setGlobalMatches } from './services/match';
import { notificationPermission, registerForPushNotificationsAsync } from './services/pushNotifications';
import {
  setGlobalSearchParams,
  setUser,
  setMatches,
  setChatIds,
  setHasNotification,
} from './store/action';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Main = ({ navigation }) => {
  const user = new User();
  const chat = new Chat();
  const dispatch = useDispatch();

  useEffect(() => {
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    user.crateNewUserIfNotExist().then(async (exist) => {
      if (exist) {
        const userData = user.getCurrentUserAttributes().data.userByCognitoUserName.items[0];
        const permission = await notificationPermission();
        if (userData.isPushNotificationActive === false || permission !== 'granted') {
          userData.isPushNotificationActive = false;
        } else {
          userData.isPushNotificationActive = true;
        }
        const token = await registerForPushNotificationsAsync();
        console.log(token);
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
          handleNotification,
          navigation,
          navigationReset,
        );
        setGlobalChatIDs(userData.cognitoUserName);
      } else {
        navigation.navigate('Settings', { newUser: true });
        if (Platform.OS === 'android') {
          navigationReset('Settings', { newUser: true });
        }
      }
    });
  }, []);

  const handleNotification = (newNotification) => {
    const { index, routes } = navigation.dangerouslyGetState();
    const screenName = routes[index].name;
    if (screenName !== 'Chat' && newNotification) {
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
