import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { fonts, margins } from '../assets/styles/variables';

const Welcome = () => {
  const logo = require('../assets/images/logo.jpg');
  return (
    <View>
      <Image resizeMode="center" style={styles.logo} source={logo} />
      <Text style={styles.title}>PETing</Text>
      <Text style={styles.motto}>Az állatbarátok társkeresője</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    maxWidth: '74%',
    marginLeft: '13%',
    height: 180,
  },
  title: {
    textAlign: 'center',
    fontSize: 64,
    marginBottom: margins.md,
  },
  motto: {
    textAlign: 'center',
    fontSize: fonts.heading3,
    marginBottom: margins.md,
  },
});

export default Welcome;
