import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { dimensions } from '../assets/styles/variables';

type ImageBoxProps = {
  type: 'animal' | 'person';
  source: any;
  navigation: any;
}

const ImageBox: React.FC<ImageBoxProps> = ({ type, source }) => {
  const touchBoxCssStyle = type === 'person' ? styles.profileImageTouchBox : styles.dogImageTouchBox;
  const imageCssStyle = type === 'person' ? styles.profileImage : styles.dogImage;

  return (
    <View style={touchBoxCssStyle}>
      <Image
        resizeMode="contain"
        style={imageCssStyle}
        source={{ uri: source }}
      />
    </View>
  );
};

const profileImageToucbox = {
  position: 'absolute',
  bottom: 0,
};

const styles = StyleSheet.create({
  profileImageTouchBox: {
    ...profileImageToucbox as any,
  },
  dogImageTouchBox: {
    ...profileImageToucbox as any,
    right: 0,
  },
  profileImage: {
    width: dimensions.fullWidth * 0.8,
    height: dimensions.fullWidth * 0.8,
    borderRadius: (dimensions.fullWidth) / 2,
  },
  dogImage: {
    width: dimensions.fullWidth * 0.36,
    height: dimensions.fullWidth * 0.36,
    borderRadius: dimensions.fullWidth / 2,
  },
});

export default ImageBox;
