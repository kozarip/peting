/* tslint:disable */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Image, View, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { styleContainer, styleTitle } from '../../assets/styles/base';
import { dimensions, margins, colors } from '../../assets/styles/variables';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import { createNewTypeObject } from './formHelpers';

type ImageSelectorProps = {
  images: string[],
  primaryImageIndex: number,
  setValue: any,
  type: string,
}

const ImageSelector: React.FC<ImageSelectorProps> = ({images, primaryImageIndex, setValue, type}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);
  const [maxImageNumber, setMaxImageNumber] = useState(Math.max(images.length, 5));


  useEffect(() => {
    getPermissionAsync()
  })

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
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
        quality: 1,
      });
      if (!result.cancelled && result.uri) {
        setValue(createNewTypeObject(type, images.concat('https://lumiere-a.akamaihd.net/v1/images/ct_frozen_elsa_18466_22a50822.jpeg?region=0,0,600,600')));
        setMaxImageNumber(maxImageNumber -1)
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
    setValue(createNewTypeObject(type, images.splice(selectedImageIndex, 1)));

    if (selectedImageIndex === primaryImageIndex) {
      setValue(createNewTypeObject('primaryImageIndex', 0));
    }
    setMaxImageNumber(maxImageNumber + 1);
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
      <Overlay
        isVisible={selectedImageIndex > -1}
        windowBackgroundColor="rgba(255, 255, 255, 0.8)"
        overlayBackgroundColor="#fff"
        width="80%"
        height={dimensions.fullHeight * 0.25}
      >
        <View style={styles.selectedImageOverlay}>
          <Text style={styleTitle}>Kérlek válassz</Text>
          <View style={styles.imageOverlayButtonBox}>
            <View style={styles.imageOverlyButton} >
              <Button
                title="Kezdőképnek"
                onPress={setPrimary}
              />
            </View>
            <View style={styles.imageOverlyButton}>
              <Button
                title="Kép törlése"
                onPress={deleteImageConfirm}
                color="red"
              />
            </View>
          </View>
          <View style={styles.imageOverlyButton}>
            <Button
              title="Bezárás"
              onPress={closeSelectedImageOverlay}
            />
          </View>
        </View>
      </Overlay>
      <Text>
        Egyszere csak egy képet tudsz feltölteni.
        Hosszan nyomva előhozhatod a beállításokat.
      </Text>
      <View style={styles.imageBox}>
        {
          images.map((image, i) => {
            const primaryClass = i === primaryImageIndex ? styles.primaryImage : {}
            return (
              <TouchableOpacity
                key={image}
                onLongPress={() => {setSelectedImageIndex(i)}}
              >
                <Image
                  source={{ uri: image }}
                  style={{ ...styles.image, ...primaryClass }}
                />
              </TouchableOpacity>
            )
          })
        }
      </View>
      <Text>Még {maxImageNumber} képet tölthetsz fel</Text>
      {
        images.length <= maxImageNumber &&
        <Button
          title="Tölts fel egy képet"
          onPress={pickImage}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: margins.md,
  },
  image: {
    width: dimensions.fullWidth / 2.5,
    height: dimensions.fullWidth / 2.5,
    marginBottom: margins.sm,
  },
  primaryImage: {
    borderColor: colors.secondary,
    borderWidth: 4,
  },
  selectedImageOverlay: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlayButtonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageOverlyButton: {
    marginBottom: margins.sm,
  },
})

export default ImageSelector;

