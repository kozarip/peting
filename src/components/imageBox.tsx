import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

type ImageBoxProps = {
  type: 'animal' | 'person';
  source: any;
  navigation: any;
}

const { width } = Dimensions.get('window');

const ImageBox: React.FC<ImageBoxProps> = ({ type, source, navigation }) => {
  const touchBoxCssStyle = type === 'person' ? styles.profileImageTouchBox : styles.dogImageTouchBox;
  const imageCssStyle = type === 'person' ? styles.profileImage : styles.dogImage;
  return (
    <TouchableOpacity style={touchBoxCssStyle} onPress={() => navigation.navigate('Pictures')}>
      <Image
        resizeMode="contain"
        style={imageCssStyle}
        source={source}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  profileImageTouchBox: {
    position: 'absolute',
    bottom: 0,
  },
  dogImageTouchBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profileImage: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
  },
  dogImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
  },
});

export default ImageBox;
