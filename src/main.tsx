import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import User from './services/user';
import Chat from './services/chat';
import { setGlobalMatches } from './services/match';
import { setGlobalSearchParams, setUser, setMatches, setChatIds } from './store/action';
import { registerFetchTask } from './components/registerFetchTask';

const Main = ({ navigation }) => {
  const user = new User();
  const chat = new Chat();
  const dispatch = useDispatch();

  registerFetchTask('wow', ()=>{
    console.log('WOWWW HIIIIIIIII YGNNNNNN');
}, 5);

  useEffect(() => {
    user.crateNewUserIfNotExist().then((exist) => {
      if (exist) {
        const userData = user.getCurrentUserAttributes().data.userByCognitoUserName.items[0];
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
  }, []);

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
