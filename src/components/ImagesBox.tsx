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
}

const ImagesBox: React.FC<ImagesBoxProps> = (
  {
    navigation,
    images,
    animalImages,
    primaryImage,
  },
) => {
  const [profileImage, setProfileImage] = useState('https://www.jtsoftex.com/wp-content/uploads/2015/01/dummy-person.jpg');
  const [animalProfileImage, setAnimalProfileImage] = useState('https://www.jtsoftex.com/wp-content/uploads/2015/01/dummy-person.jpg');
  const [allImages, setAllImages] = useState(['']);
  const [allAnimalImages, setAllAnimalImages] = useState();

  const imageStore = new ImageStore('');

  useEffect(() => {
    initImage();
  });

  const initImage = async () => {
    const imageURLs = await imageStore.fetchImages(images);
    Promise.all(imageURLs).then((compiledImages: string[]) => {
      console.log(compiledImages);
      setProfileImage(compiledImages[primaryImage]);
      //setAllImages(allImages.concat(['alma']));
    });
    const animalImageURLs = await imageStore.fetchImages(animalImages);
    Promise.all(animalImageURLs).then((compiledImages: string[]) => {
      //setAllAnimalImages(compiledImages);
      setAnimalProfileImage(compiledImages[0]);
    });
  };


  return (
    <View style={styles.imageContainer}>
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
        <TouchableOpacity
          onPress={() => navigation.navigate('Pictures')}
        >
          <Icon
            raised
            name="ios-images"
            size={20}
            color="#21618C"
            type="ionicon"
          />
        </TouchableOpacity>
      </View>
    </View>
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
    bottom: -3,
    right: -5,
    height: 52,
    width: 52,
  },
});

export default ImagesBox;
