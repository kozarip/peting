/* tslint:disable */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { createNewTypeObject } from '../formHelpers';

import ImageList from './imageList';
import ImageSettings from './imageSettings';
import { fonts, margins, colors } from '../../../assets/styles/variables';

type ImageSelectorProps = {
  images: string[],
  primaryImageIndex: number,
  setValue: any,
  type: string,
  removeImage: any
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ images, primaryImageIndex, setValue, type, removeImage }) => {
  const initialMaxImagesNumber = 5;
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);;
  const maxImageNumber = initialMaxImagesNumber - images.length;
  const imageQuality = 0.2;

  useEffect(() => {
    getPermissionAsync()
  })

  const getPermissionAsync = async () => {
    if (Constants && Constants.platform && Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: imageQuality,
      });
      if (!result.cancelled && result.uri) {
        setValue(createNewTypeObject(type, images.concat(result.uri)));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteImageConfirm = () => {
    Alert.alert(
      'Kép törlése',
      'Biztos törölni akarod?',
      [
        {
          text: 'Igen',
          onPress: () => {deleteImage()}
        },
        {
          text: 'Nem',
          style: 'cancel',
        },
      ],
    );

  }

  const deleteImage = () => {
    removeImage(selectedImageIndex);
    if (selectedImageIndex === primaryImageIndex) {
      setValue(createNewTypeObject('primaryImageIndex', 0));
    }
    closeSelectedImageOverlay();
  }

  const setPrimary = () => {
    setValue(createNewTypeObject('primaryImageIndex', selectedImageIndex));
    closeSelectedImageOverlay();
  }

  const closeSelectedImageOverlay = () => {
    setSelectedImageIndex(-1);
  }

  return (
    <View>
      <ImageSettings
        selectedImageIndex={selectedImageIndex}
        closeSelectedImageOverlay={closeSelectedImageOverlay}
        deleteImageConfirm={deleteImageConfirm}
        setPrimary={setPrimary}
      />
      {
        maxImageNumber > 0  ?
          <Text style={styles.imageText}>Még {maxImageNumber} képet tölthetsz fel!</Text>
          :
          <Text style={styles.imageText}>Több képet már nem tölthetsz fel</Text>
      }
      <ImageList
        images={images}
        primaryImageIndex={primaryImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
      />
      <Text style={styles.imageText}>
        Egyszere csak egy képet tudsz feltölteni.
        Nyomd hosszan a képet a beállításokhoz!
      </Text>
      {
        maxImageNumber > 0 &&
        <Button
          color={colors.primary}
          title="Tölts fel egy képet"
          onPress={pickImage}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  imageText: {
    fontSize: fonts.default,
    marginBottom: margins.sm

  },
})

export default ImageSelector;

