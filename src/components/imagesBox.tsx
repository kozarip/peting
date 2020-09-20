import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageBox from './imageBox';
import ImageStore from '../services/imageStore';
import MorePictures from './morePictures';
import { Overlay } from 'react-native-elements';
import { dimensions } from '../assets/styles/variables';

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
  const [isActiveMorePicture, setIsActiveMorePicture] = useState(false);

  const imageStore = new ImageStore('');

  useEffect(() => {
    initImage();
  }, [images]);

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
      onPress={() => { console.log('click'); setIsActiveMorePicture(true); }}
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
      {/* <View style={styles.moreImageIcon}>
        <Icon
          raised
          name="ios-images"
          size={20}
          color="#21618C"
          type="ionicon"
        />
      </View> */}
      <Overlay
        overlayStyle={styles.moreImagesBox}
        isVisible={isActiveMorePicture}
      >
        <MorePictures
          allImages={allImages}
          allAnimalImages={allAnimalImages}
          name={name}
          age={age}
          animalName={animalName}
          handleClose={() => { setIsActiveMorePicture(false); }}
        />
      </Overlay>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  moreImagesBox: {
    margin: 0,
    padding: 0,
    height: dimensions.fullHeight * 0.95,
    paddingBottom: 10,
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
