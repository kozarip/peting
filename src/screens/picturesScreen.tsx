import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import PetingHeader from '../components/petingHeader';
import { styleBox, styleTitle, styleBackground } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';

const { width } = Dimensions.get('window');
const image = require('../assets/images/pet_silhouettes2.jpg');

const PicturesScreen = ({ navigation }) => {
  const personImages = [
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  const animalImages = [
    require('../assets/images/dog_sample.jpg'),
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={image}
        style={styleBackground}
        resizeMode="repeat"
        imageStyle={{ opacity: 0.04 }}
      >
        <PetingHeader
          navigation={navigation}
        />
        <Text style={styles.title}>Elza, 30</Text>
        <SliderBox
          images={personImages}
          sliderBoxHeight={width}
        />
        <Text style={styles.title}>Zsömi</Text>
        <SliderBox
          images={animalImages}
          sliderBoxHeight={width}
        />
      </ImageBackground>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...styleBox as any,
  },
  title: {
    ...styleTitle as any,
    marginTop: margins.sm,
  },
});

export default PicturesScreen;
