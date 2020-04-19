import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Overlay } from 'react-native-elements';
import Welcome from '../components/welcome';
import Login from '../components/login';

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
          windowBackgroundColor="rgba(255, 255, 255, 0)"
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
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default LoginScreen;
