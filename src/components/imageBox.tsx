import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';
import { isSmallScreen } from '../services/shared';
import { dimensions } from '../assets/styles/variables';

type ImageBoxProps = {
  type: 'animal' | 'person';
  source: any;
  navigation: any;
}

const ImageBox: React.FC<ImageBoxProps> = ({ type, source }) => {
  const touchBoxCssStyle = type === 'person' ? {} : styles.dogImageTouchBox;
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

const calcRationNumberBySceenSize = (originalRatio) => {
  return isSmallScreen() ? originalRatio * 0.8 : originalRatio;
};

const styles = StyleSheet.create({
  dogImageTouchBox: {
    marginTop: -dimensions.fullHeight * calcRationNumberBySceenSize(0.1),
    width: dimensions.fullHeight * calcRationNumberBySceenSize(0.2) + 32,
    height: dimensions.fullHeight * calcRationNumberBySceenSize(0.2) + 32,
    borderColor: 'rgba(255,255,255, 0.6)',
    borderWidth: 16,
    marginLeft: dimensions.fullWidth * -0.4,
    borderRadius: dimensions.fullHeight,
  },
  profileImage: {
    width: dimensions.fullHeight * calcRationNumberBySceenSize(0.4),
    height: dimensions.fullHeight * calcRationNumberBySceenSize(0.4),
    borderRadius: dimensions.fullHeight,
  },
  dogImage: {
    width: dimensions.fullHeight * calcRationNumberBySceenSize(0.2),
    height: dimensions.fullHeight * calcRationNumberBySceenSize(0.2),
    borderRadius: dimensions.fullHeight,
  },
});

export default ImageBox;
