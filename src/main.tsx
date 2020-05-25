import React, { useEffect } from 'react';

import { View, ImageBackground, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import User from './services/user';
import { setSearchParams } from './store/action';

const Main = ({ navigation }) => {
  const user = new User();
  const dispatch = useDispatch();

  useEffect(() => {
    user.crateNewUserIfNotExist().then((exist) => {
      if (exist) {
        dispatch(setSearchParams({
          searchParams: user.getCurrentUserAttributes().data.userByCognitoUserName.items[0].search,
        }));
        navigation.navigate('Result');
      } else {
        navigation.navigate('Settings', { newUser: true });
      }
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
