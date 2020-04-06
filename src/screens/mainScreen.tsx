import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import AuthService from '../services/auth';
import Login from '../components/login';
import Welcome from '../components/welcome';

const AuthScreen: React.FC = () => {
  // @ts-ignore
  const [user, setUser] = useState<{ user: null | object }>({});

  useEffect(() => {
    AuthService.subscribeAuthChange((receivedUser) => setUser(receivedUser));
  });

  if (user) {
    const name = user.displayName;
    const avatar = user.photoURL && (
      <Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
    );

    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        {avatar}
        <Button onPress={AuthService.logout} title="Logout" />
      </View>
    );
  }
  const image = require('../assets/images/pet_valentine.jpg');
  const isOverlayVisible = true;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.container}
      >
        <Overlay
          isVisible={isOverlayVisible}
          windowBackgroundColor="rgba(255, 255, 255, 0)"
          overlayBackgroundColor="#fff"
          width="80%"
          height="auto"
        >
          <View>
            <Welcome />
            <Login loginWithFacebook={AuthService.loginWithFacebook} />
          </View>
        </Overlay>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});

export default AuthScreen;
