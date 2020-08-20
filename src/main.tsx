import React, { useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import User from './services/user';
import { getUserMatches, selectTheOtherProfileId } from './services/match';
import { setGlobalSearchParams, setUser, setMatches } from './store/action';

//import aws_exports from '../aws-exports';

const Main = ({ navigation }) => {
  const user = new User();
  const dispatch = useDispatch();

  // PushNotification.configure(aws_exports);

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
        setGlobalMatches(userData.cognitoUserName);
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

  const setGlobalMatches = (cognitoUserName) => {
    const globalMatches: matchType[] = [];
    getUserMatches(cognitoUserName).then((rawMatches) => {
      const matches = rawMatches.data.searchMatchess.items;
      const matchPromises = matches.map((match) => {
        return user.getUserByCognitoUserName(selectTheOtherProfileId(match, cognitoUserName));
      });
      const imageIds = [];
      Promise.all(matchPromises).then((resolved) => {
        resolved.forEach((fullUser: any, i) => {
          const fullUserData = fullUser.data.userByCognitoUserName.items[0];
          const matchData: matchType = {
            id: matches[i].id,
            cognitoUserName: fullUserData.cognitoUserName,
            name: fullUserData.userName,
            avatar_url: fullUserData.images[fullUserData.primaryImageIndex],
            subtitle: matches[i].timestamp.split('T', 1).join(''),
            lastNewMessageSender: matches[i].lastNewMessageSender,
          };
          globalMatches.push(matchData);
        });
        setMatchToGlobalState(globalMatches);
        navigation.navigate('Result');
        if (Platform.OS === 'android') {
          navigationReset('Result', {});
        }
      });
    });
  };

  const setMatchToGlobalState = (match) => {
    dispatch(setMatches({ matches: match }));
  };

  const image = require('./assets/images/pet_silhouettes2.jpg');

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
