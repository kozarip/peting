import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { useFonts } from '@use-expo/font';
import { fonts, margins } from '../assets/styles/variables';

const Welcome = () => {
  const logo = require('../assets/images/logo.png');
  let [fontsLoaded] = useFonts({
    'segoeprb': require('../assets/fonts/segoeprb.ttf'),
  });

  if (fontsLoaded) {
    return (
      <View>
        <Text style={styles.title}>PETing</Text>
        <Image resizeMode="center" style={styles.logo} source={logo} />
        <Text style={styles.motto}>Az állatbarátok társkeresője</Text>
      </View>
    );
  } else {
    return <></>
  }
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: 200,
    marginBottom: margins.xsm,
  },
  title: {
    fontFamily: 'segoeprb',
    textAlign: 'center',
    fontSize: 48,
    marginBottom: -margins.sm,
  },
  motto: {
    fontFamily: 'segoeprb',
    textAlign: 'center',
    fontSize: fonts.heading3,
    marginBottom: margins.md,
  },
});

export default Welcome;
