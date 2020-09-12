import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Platform,
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

const styles = StyleSheet.create({
  dogImageTouchBox: {
    marginLeft: -14,
    marginTop: -dimensions.fullHeight * 0.1,
    width: dimensions.fullWidth * 0.45,
    height: dimensions.fullWidth * 0.45,
    borderRadius: dimensions.fullWidth * 0.72,
    borderColor: 'rgba(255,255,255, 0.6)',
    borderWidth: 16,
  },
  profileImage: {
    width: dimensions.fullWidth * 0.78,
    height: dimensions.fullWidth * 0.78,
    marginLeft: 'auto',
    borderRadius: dimensions.fullWidth * 1.56,
  },
  dogImage: {
    width: dimensions.fullWidth * 0.36,
    height: dimensions.fullWidth * 0.36,
    borderRadius: dimensions.fullWidth * 0.72,
  },
});

export default ImageBox;
