import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Card } from 'react-native-elements';
import Welcome from '../components/welcome';
import Login from '../components/login';
import { styleBackground, styleContainer } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';

const LoginScreen = () => {
  const image = require('../assets/images/background.png');

  return (
    <ImageBackground
      source={image}
      style={styleBackground}
      resizeMode="repeat"
      imageStyle={{ opacity: 0.3 }}
    >
      <Card
        containerStyle={styles.overlayStyle}
      >
        <View>
          <Welcome />
          <Login />
        </View>
      </Card>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleContainer as any,
    justifyContent: 'center',
  },
  background: {
    ...styleBackground as any,
  },
  overlayStyle: {
    marginTop: '65%',
    padding: 0,
    paddingBottom: margins.md,
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: 20,
    elevation: 0,
    shadowOpacity: 0,
    borderWidth: 0,
  },
});

export default LoginScreen;
