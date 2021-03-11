/* tslint:disable */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Icon, Tooltip } from 'react-native-elements';
// import Tooltip from "rne-modal-tooltip";
import { localizations } from '../../../services/localizations';

import { createNewTypeObject } from '../formHelpers';
import { styleForm } from '../../../assets/styles/form';
import Modal from '../../modal';

import ImageList from './imageList';
import { fonts, margins, colors, dimensions } from '../../../assets/styles/variables';

type ImageSelectorProps = {
  images: string[],
  title: string
  primaryImageIndex: number,
  setValue: any,
  type: string,
  removeImage: any,
  mandatory: boolean,
  hasPrimaryImageIndex: boolean
}

const ImageSelector: React.FC<ImageSelectorProps> = (
  { images, primaryImageIndex, setValue, type, removeImage, title, mandatory, hasPrimaryImageIndex }
) => {
  const initialMaxImagesNumber = 5;
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);;
  const [isActiveConfirmImageDeleteModal, setIsActiveConfirmImageDeleteModal] = useState(false)
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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: imageQuality,
      });
      if (!result.cancelled && result.uri) {
        setValue(createNewTypeObject(type, images.concat(result.uri)));
      }
    } catch (error) {
      alert(error);
    }
  };

  const deleteImage = () => {
    removeImage(selectedImageIndex, type);
    if (selectedImageIndex === primaryImageIndex) {
      setValue(createNewTypeObject('primaryImageIndex', 0));
    }
    closeSelectedImageOverlay();
  }

  const setPrimary = () => {
    console.log(type);
    setValue(createNewTypeObject('primaryImageIndex', selectedImageIndex));
    closeSelectedImageOverlay();
  }

  const closeSelectedImageOverlay = () => {
    setSelectedImageIndex(-1);
  }

  return (
    <View style={styles.imageSelectorContainer}>
      <Modal
        iconName="image"
        handleClose={closeSelectedImageOverlay}
        isVisible={selectedImageIndex > -1}
        description={localizations.t('choose')}
        buttonPrimaryText={hasPrimaryImageIndex ? localizations.t('forPrimaryImage') : false}
        handlePressButtonPrimary={setPrimary}
        buttonSecondaryText={localizations.t('removeImage')}
        handlePressButtonSecondary={() => { setIsActiveConfirmImageDeleteModal(true); }}
      />
      <Modal
        iconName="trash"
        isVisible={isActiveConfirmImageDeleteModal}
        title={localizations.t('removeImage')}
        description={localizations.t('removeConfirmImage')}
        buttonPrimaryText={localizations.t('yes')}
        handlePressButtonPrimary={() => { deleteImage(); setIsActiveConfirmImageDeleteModal(false);}}
        buttonSecondaryText={localizations.t('no')}
        handlePressButtonSecondary={() => { setIsActiveConfirmImageDeleteModal(false); }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {title}
          {mandatory && <Text style={styleForm.mandatory}> *</Text>}
        </Text>
        {
          hasPrimaryImageIndex &&
          <Tooltip
              backgroundColor={colors.primary}
              height={120}
              width={dimensions.fullWidth * 0.8}
              popover={
                <Text style={{...styles.imageText, ...styles.toolTipImageText}}>
                {localizations.t('imageUploadInfo')}
                </Text>
              }
            >
              <Icon
                name="info"
                size={10}
                reverse
                color={colors.primary}
                type="font-awesome"
              />
            </Tooltip>
        }
      </View>
      <View style={styles.imageCardHeader}>
        {
          maxImageNumber > 0  ?
            <Text style={styles.imageText}>{localizations.t('imageRemaining')} {maxImageNumber} </Text>
            :
            <Text style={styles.imageText}>{localizations.t('fullImageNumber')}</Text>
        }
      </View>
      <ImageList
        images={images}
        primaryImageIndex={primaryImageIndex}
        setSelectedImageIndex={setSelectedImageIndex}
        hasPrimaryImageIndex={hasPrimaryImageIndex}
      />
      {
        maxImageNumber > 0 &&
        <Button
          title={localizations.t('uploadImage')}
          onPress={pickImage}
          buttonStyle={styles.btnUploadPic}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  imageSelectorContainer: {
    marginBottom: margins.sm,
  },
  imageText: {
    fontSize: fonts.default,
    marginBottom: margins.sm,
    color: colors.separator,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fonts.heading2,
    color: colors.grey,
  },
  toolTipImageText: {
    color: '#fff',
  },
  imageCardHeader: {
    display: 'flex',
    marginTop: -5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  btnUploadPic:{
    color: '#fff',
    backgroundColor: '#ccc',
    borderRadius: 20,
  }
})

export default ImageSelector;

