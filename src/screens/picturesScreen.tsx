import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import PetingHeader from '../components/petingHeader';

const { width } = Dimensions.get('window');
const image = require('../assets/images/pet_silhouettes2.jpg');

const PicturesScreen = ({ navigation }) => {
  const images = [
    require('../assets/images/dog_sample.jpg'),
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        style={{ width: '100%', flex: 1 }}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.04 }}
      >
        <PetingHeader
          navigation={navigation}
        />
        <Text style={styles.title}>Elza, 30</Text>
        <SliderBox
          images={images}
          sliderBoxHeight={width}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  title: {
    fontSize: 22,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
});

export default PicturesScreen;
