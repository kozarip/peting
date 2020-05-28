import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Overlay } from 'react-native-elements';
import Welcome from '../components/welcome';
import Login from '../components/login';
import { styleBackground, styleContainer } from '../assets/styles/base';

const LoginScreen = () => {
  const image = require('../assets/images/pet_silhouettes2.jpg');
  const isOverlayVisible = true;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={styles.container}
        resizeMode="repeat"
      >
        <Overlay
          isVisible={isOverlayVisible}
          windowBackgroundColor="rgba(255, 255, 255, 0.3)"
          overlayBackgroundColor="#fff"
          width="80%"
          height="auto"
        >
          <View>
            <Welcome />
            <Login />
          </View>
        </Overlay>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleContainer as any,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  background: {
    ...styleBackground as any,
  },
});

export default LoginScreen;
