import React, { useEffect } from 'react';

import { View, ImageBackground, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import User from './services/user';
import { getUserMatches, selectTheOtherProfileId } from './services/match';
import { setGlobalSearchParams, setUser, setMatches } from './store/action';

const Main = ({ navigation }) => {
  const user = new User();
  const dispatch = useDispatch();

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
        navigation.navigate('Result');
        if (Platform.OS === 'android') {
          navigationReset('Result', {});
        }
      } else {
        navigation.navigate('Settings');
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
      Promise.all(matchPromises).then((resolved) => {
        const imageIds = [];
        resolved.forEach((fullUser: any, i) => {
          const fullUserData = fullUser.data.userByCognitoUserName.items[0];
          if (fullUserData.images && fullUserData.images[fullUserData.primaryImageIndex]) {
            imageIds.push(fullUserData.images[fullUserData.primaryImageIndex]);
          }
          const matchData: matchType = {
            id: i,
            cognitoUserName: fullUserData.cognitoUserName,
            name: fullUserData.userName,
            avatar_url: fullUserData.images[fullUserData.primaryImageIndex],
            subtitle: matches[i].timestamp.split('T', 1).join(''),
          };
          globalMatches.push(matchData);
        });
        dispatch(setMatches({ matches: globalMatches }));
      });
    });
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
