import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import ImageBox from './imageBox';
import ImageStore from '../services/imageStore';
import { margins, dimensions } from '../assets/styles/variables';

type ImagesBoxProps = {
  navigation: any,
  images: any,
  animalImages: any,
  primaryImage: number,
  name: string,
  age: number,
  animalName: string,
}

const ImagesBox: React.FC<ImagesBoxProps> = (
  {
    navigation,
    images,
    animalImages,
    primaryImage,
    name,
    age,
    animalName,
  },
) => {
  const [profileImage, setProfileImage] = useState('https://www.jtsoftex.com/wp-content/uploads/2015/01/dummy-person.jpg');
  const [animalProfileImage, setAnimalProfileImage] = useState('https://www.jtsoftex.com/wp-content/uploads/2015/01/dummy-person.jpg');
  const [allImages, setAllImages] = useState('');
  const [allAnimalImages, setAllAnimalImages] = useState(',');

  const imageStore = new ImageStore('');

  useEffect(() => {
    initImage();
  });

  const initImage = async () => {
    const imageURLs = await imageStore.fetchImages(images);
    Promise.all(imageURLs).then((compiledImages: string[]) => {
      setProfileImage(compiledImages[primaryImage]);
      setAllImages(compiledImages.join(','));
    });
    const animalImageURLs = await imageStore.fetchImages(animalImages);
    Promise.all(animalImageURLs).then((compiledImages: string[]) => {
      setAllAnimalImages(compiledImages.join(','));
      setAnimalProfileImage(compiledImages[0]);
    });
  };


  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => {
        navigation.navigate('Pictures', {
          id: 1,
          allImages,
          allAnimalImages,
          name,
          age,
          animalName,
        });
      }}
    >
      <ImageBox
        type="person"
        source={profileImage}
        navigation={navigation}
      />
      <ImageBox
        type="animal"
        source={animalProfileImage}
        navigation={navigation}
      />
      <View style={styles.moreImageIcon}>
        <Icon
          raised
          name="ios-images"
          size={20}
          color="#21618C"
          type="ionicon"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: margins.md,
    height: dimensions.fullWidth * 0.8,
  },
  moreImageIcon: {
    position: 'absolute',
    bottom: 0,
    right: -7,
    height: 52,
    width: 52,
  },
});

export default ImagesBox;
