import React, { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';

import User from './services/user';
import Chat from './services/chat';
import { setGlobalMatches } from './services/match';
import { localizations } from './services/localizations';
import { notificationPermission, registerForPushNotificationsAsync } from './services/pushNotifications';
import { fetchAdvertisements } from './services/advertisements';
import {
  setGlobalSearchParams,
  setUser,
  setMatches,
  setChatIds,
  setHasNotification,
  setAdvertisement,
} from './store/action';
import Modal from './components/modal';

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
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  useEffect(() => {
    Notifications.addNotificationReceivedListener(handleNotification);
    Notifications.addNotificationResponseReceivedListener(handleNotificationResponse);
    fetchAdvertisements().then((res) => {
      dispatch(setAdvertisement({ advertisements: res }));
    });
    try {
      user.crateNewUserIfNotExist().then(async (exist) => {
        if (exist) {
          if (user.getCurrentUserAttributes()) {
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
            setGlobalChatIDs(userData.cognitoUserName);
            setGlobalMatches(
              user,
              userData.cognitoUserName,
              setMatchToGlobalState,
              handleNotification,
              navigation,
              navigationReset,
            );
          } else {
            Alert.alert('The user doesn\'t have properties');
          }
        } else {
          navigation.navigate('Settings', { newUser: true });
          if (Platform.OS === 'android') {
            navigationReset('Settings', { newUser: true });
          }
        }
      }).catch((error) => {
        Alert.alert('There has been a problem with the user properties downloading ' + error.message);
      });
    } catch (error) {
      Alert.alert(`Error: ${error.message}`);
    }
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
    }).catch((error) => {
      Alert.alert('There has been a problem with set global chat ids: ' + error.message);
    });
  };

  const image = require('./assets/images/background.png');

  return (
    <View style={styles.container}>
      <Modal
        iconName="spinner"
        isVisible={isLoaderActive}
        description={localizations.t('load')}
      />
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
