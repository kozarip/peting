import React from 'react';
import { View, StyleSheet } from 'react-native';
import { dimensions, colors } from '../assets/styles/variables';

const HeaderTriangle = () => {
  return <View style={styles.headerTriangle} />;
};

const styles = StyleSheet.create({
  headerTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    left: 0,
    top: -(dimensions.fullWidth * 0.8),
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: dimensions.fullWidth / 2,
    borderTopWidth: dimensions.fullWidth * 2,
    borderRightColor: 'transparent',
    borderTopColor: colors.primary,
    transform: [
      { rotate: '90deg' }
    ],
  },
});

export default HeaderTriangle;