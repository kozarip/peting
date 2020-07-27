import React from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  View,
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import PetingHeader from '../components/petingHeader';
import LoveButtons from '../components/loveButtons';
import { styleTitle, styleBackground } from '../assets/styles/base';
import { margins } from '../assets/styles/variables';

const { width } = Dimensions.get('window');
const image = require('../assets/images/pet_silhouettes2.jpg');

const PicturesScreen = ({ navigation, route }) => {
  const personImages = route.params.allImages.split(',');
  const animalImages = route.params.allAnimalImages.split(',');
  const name = route.params.name || '';
  const age = route.params.age > 0 ? route.params.age : '';
  const animalName = route.params.animalName || '';

  return (
    <View style={{ flex: 1 }}>
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
          <Text style={styles.title}>
            {name}
            {' '}
            {age}
          </Text>
          <SliderBox
            images={personImages}
            sliderBoxHeight={width}
          />
          <Text style={styles.title}>{animalName}</Text>
          <SliderBox
            images={animalImages}
            sliderBoxHeight={width}
          />
        </ImageBackground>
      </ScrollView>
      <LoveButtons
        handlePressLike={() => { navigation.navigate('Result', { pressedButton: 'handlePressLike' }); }}
        handlePressNext={() => { navigation.navigate('Result', { pressedButton: 'handlePressNext' }); }}
        handlePressDislike={() => { navigation.navigate('Result', { pressedButton: 'handlePressDislike' }); }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...styleTitle as any,
    marginTop: margins.sm,
  },
});

export default PicturesScreen;
