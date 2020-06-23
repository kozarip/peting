import React, { useEffect } from 'react';

import { View, ImageBackground, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import User from './services/user';
import { setGlobalSearchParams, setUser } from './store/action';

const Main = ({ navigation }) => {
  const user = new User();
  const dispatch = useDispatch();

  useEffect(() => {
    user.crateNewUserIfNotExist().then((exist) => {
      if (exist) {
        dispatch(setGlobalSearchParams({
          searchParams: user.getCurrentUserAttributes().data.userByCognitoUserName.items[0].search,
        }));
        dispatch(setUser({
          user: user.getCurrentUserAttributes().data.userByCognitoUserName.items[0],
        }));
        navigation.navigate('Result');
      } else {
        navigation.navigate('Settings', { newUser: true });
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Result' }],
      });
    });
  }, []);


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
