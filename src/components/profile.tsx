/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Platform,
} from 'react-native';
import { Card, Button } from 'react-native-elements';

import { localizations } from '../services/localizations';
import ImageStore from '../services/imageStore';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';
import MultiSelector from './form/multiSelector';
import ImageSelector from './form/imageSelector/imageSelector';
import CitySelector from './form/citySelectorModal';

import { styleForm } from '../assets/styles/form';
// eslint-disable-next-line no-unused-vars
import { UserType } from '../types/user';
import { createNewTypeObject } from './form/formHelpers';
import { colors, fonts } from '../assets/styles/variables';
import * as userField from '../constants/userFields';
import Modal from './modal';

import {
  gender,
  hairColor,
  animalType,
  animalSize,
  smokeFrequency,
  hobbies,
} from '../constants/userFields';

type profileProps = {
  userAttributes: any,
  saveUser: any,
  setUserAttributes: any,
}

const Profile: React.FC<profileProps> = ({ userAttributes, saveUser, setUserAttributes }) => {
  const initialProfileUser: UserType = {
    userName: '',
    firstName: '',
    surName: '',
    email: '',
    gender: 0,
    height: 0,
    bio: '',
    animalName: '',
    animalSize: '',
    animalType: '',
    smokeFrequency: '',
    hobbies: [],
    hairColor: '',
    age: 0,
    images: [],
    animalImages: [],
    primaryImageIndex: 0,
    likes: [],
    dislikes: [],
    cognitoUserName: '',
    cityName: ' ',
    cityLat: 0,
    cityLng: 0,
    deviceId: '',
    isPushNotificationActive: null,
  };
  const mandatoryFields = [
    'images',
    'animalImages',
    'userName',
    'email',
    'gender',
    'height',
    'animalName',
    'animalType',
    'age',
    'cityName',
  ];
  const imageTypes = ['images', 'animalImages'];

  const [profileUser, setProfileUser] = useState(initialProfileUser);
  const [removedImageKeys, setRemovedImageKeys] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);
  const [isActiveRequireModal, setIsActiveRequireModal] = useState(false);
  const [errorFields, setErrorFields] = useState([]);

  const imageStore = new ImageStore('Unknown');
  const compiledImagesObj = {};

  useEffect(() => {
    initProfileUser();
  }, []);

  const initProfileUser = async () => {
    setProfileUser({ ...profileUser, ...userAttributes });
    imageTypes.forEach((type) => {
      if (isImageCompileIsNecessary(type)) {
        setCompiledImagesToUrl(type);
      }
    });
  };

  const isImageCompileIsNecessary = (imageType) => {
    return userAttributes[imageType]
      && userAttributes[imageType].length > 0
      && !userAttributes[imageType][0].startsWith('https://');
  };

  const setCompiledImagesToUrl = async (type) => {
    setIsLoaderActive(true);
    const imageURLs = await imageStore.fetchImages(userAttributes[type]);
    await Promise.all(imageURLs).then((compiledImages: string[]) => {
      compiledImagesObj[type] = compiledImages;
      setProfileUser({ ...userAttributes, ...compiledImagesObj });
      setIsLoaderActive(false);
    });
  };

  const setProfileUserAttribute = (value) => {
    setProfileUser({ ...profileUser, ...value });
  };

  const handleRemoveImage = (index, imageType) => {
    if (index < userAttributes[imageType].length) {
      const removedImageKey = userAttributes[imageType].splice(index, 1);
      setRemovedImageKeys(removedImageKeys.concat(removedImageKey));
    }

    profileUser[imageType].splice(index, 1);
    setProfileUserAttribute(createNewTypeObject(imageType, profileUser[imageType]));
  };

  const handleSaveProfile = async () => {
    const localErrorFields = checkMandatoryFields();
    if (localErrorFields.length > 0) {
      setErrorFields(localErrorFields);
      setIsActiveRequireModal(true);
    } else {
      setIsLoaderActive(true);

      const removeImages = await imageStore.removeImages(removedImageKeys);
      Promise.all(removeImages);

      const newImages = selectNewImages('images');
      const newAnimalImages = selectNewImages('animalImages');
      const newKeysPromise = await imageStore.uploadImages(newImages, profileUser.cognitoUserName);
      const newAnimalKeysPromise = await imageStore.uploadImages(
        newAnimalImages, profileUser.cognitoUserName,
      );

      Promise.all([newKeysPromise, newAnimalKeysPromise]).then((newKeys: any) => {
        const modifiedProfileUser = { ...{}, ...profileUser };
        const oldImages = userAttributes.images || [];
        const wholeImageKeys = [...oldImages, ...newKeys[0]];
        modifiedProfileUser.images = wholeImageKeys;

        const oldAnimalImages = userAttributes.animalImages || [];
        const wholeAnimalImageKeys = [...oldAnimalImages, ...newKeys[1]];
        modifiedProfileUser.animalImages = wholeAnimalImageKeys;
        if (!modifiedProfileUser.primaryImageIndex) {
          modifiedProfileUser.primaryImageIndex = 0;
        }
        if (
          modifiedProfileUser.animalImages.length === 0
          || modifiedProfileUser.images.length === 0
          || modifiedProfileUser.animalImages[0] === '[]'
          || modifiedProfileUser.images[0] === '[]'
        ) {
          setErrorFields(['animalImages', 'images']);
          setIsActiveRequireModal(true);
        } else {
          setUserAttributes({ ...userAttributes, ...modifiedProfileUser });
          saveUser({ ...userAttributes, ...modifiedProfileUser });
        }
        setIsLoaderActive(false);
      });
    }
  };

  const checkMandatoryFields = () => {
    return mandatoryFields.filter((field) => isEmpty(profileUser[field], field));
  };

  const isEmpty = (value, field = '') => {
    if (isNaN(value) && !value) {
      return true;
    }
    const valueType = typeof value;
    if (valueType === 'undefined') {
      return true;
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    if (valueType === 'number') {
      if (field === 'gender') {
        return value < 0;
      }
      return value < 1;
    }
    if (valueType === 'string') {
      return value.trim() === '';
    }
    if (valueType === 'object') {
      return !value;
    }
    return false;
  };

  const formatMandatoryErrorList = (list) => {
    const translatedLabels = list.map((element) => {
      return userField[element].label;
    });
    return translatedLabels.join(', ');
  };

  const selectNewImages = (imageType: 'images' | 'animalImages') => {
    const images = profileUser[imageType] || [];
    return images.filter((image) => image.startsWith('file:/'));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.container}
      >
        <Modal
          iconName="spinner"
          isVisible={isLoaderActive}
          description={localizations.t('load')}
        />
        <Modal
          iconName="exclamation"
          iconColor={colors.darkPrimary}
          isVisible={isActiveRequireModal}
          description={`${localizations.t('mandatory')} ${formatMandatoryErrorList(errorFields)}`}
          buttonPrimaryText={localizations.t('agree')}
          handlePressButtonPrimary={() => { setIsActiveRequireModal(false); }}
        />
        <Card>
          <ImageSelector
            type="images"
            mandatory={mandatoryFields.includes('images')}
            primaryImageIndex={profileUser.primaryImageIndex || 0}
            setValue={setProfileUserAttribute}
            images={profileUser.images || []}
            title={localizations.t('images')}
            removeImage={handleRemoveImage}
          />
          <ImageSelector
            type="animalImages"
            mandatory={mandatoryFields.includes('animalImages')}
            primaryImageIndex={0}
            setValue={setProfileUserAttribute}
            images={profileUser.animalImages || []}
            title={localizations.t('animalImages')}
            removeImage={handleRemoveImage}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('baseData')}</Text>
          <TextBox
            label={userField.userName.label}
            type="userName"
            mandatory={mandatoryFields.includes('userName')}
            placeholder={localizations.t('placeholderName')}
            value={profileUser.userName}
            setValue={setProfileUserAttribute}
            maxLength={18}
          />
          <TextBox
            label={userField.email.label}
            mandatory={mandatoryFields.includes('email')}
            value={profileUser.email}
            type="email"
            setValue={setProfileUserAttribute}
            placeholder={localizations.t('placeholderEmail')}
          />
          <RadioButton
            options={gender}
            value={profileUser.gender}
            mandatory={mandatoryFields.includes('gender')}
            type="gender"
            label={localizations.t('gender')}
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label={userField.age.label}
            type="age"
            mandatory={mandatoryFields.includes('age')}
            placeholder={localizations.t('year')}
            keyboardType="number-pad"
            value={profileUser.age}
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label={userField.bio.label}
            type="bio"
            mandatory={mandatoryFields.includes('bio')}
            placeholder={localizations.t('placeholderBio')}
            value={profileUser.bio}
            setValue={setProfileUserAttribute}
          />
          <CitySelector
            label={userField.cityName.label}
            mandatory={mandatoryFields.includes('cityName')}
            setValue={setProfileUserAttribute}
            value={profileUser.cityName}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('outFit')}</Text>
          <TextBox
            label={userField.height.label}
            mandatory={mandatoryFields.includes('height')}
            placeholder={`? ${localizations.t('cm')}`}
            type="height"
            keyboardType="number-pad"
            value={profileUser.height}
            setValue={setProfileUserAttribute}
          />
          <Selector
            label={userField.hairColor.label}
            mandatory={mandatoryFields.includes('hairColor')}
            options={hairColor.options}
            type="hairColor"
            setValue={setProfileUserAttribute}
            value={profileUser.hairColor}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('yourAnimal')}</Text>
          <TextBox
            label={userField.animalName.label}
            type="animalName"
            mandatory={mandatoryFields.includes('animalName')}
            value={profileUser.animalName}
            setValue={setProfileUserAttribute}
            maxLength={12}
          />
          <Selector
            label={animalType.label}
            options={animalType.options}
            type="animalType"
            mandatory={mandatoryFields.includes('animalType')}
            setValue={setProfileUserAttribute}
            value={profileUser.animalType}
          />
          <Selector
            label={animalSize.label}
            options={animalSize.options}
            mandatory={mandatoryFields.includes('animalSize')}
            type="animalSize"
            setValue={setProfileUserAttribute}
            value={profileUser.animalSize}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('others')}</Text>
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            mandatory={mandatoryFields.includes('smokeFrequency')}
            type="smokeFrequency"
            setValue={setProfileUserAttribute}
            value={profileUser.smokeFrequency}
          />
          <MultiSelector
            label={userField.hobbies.label}
            options={hobbies.options}
            type="hobbies"
            setValue={setProfileUserAttribute}
            value={profileUser.hobbies}
          />
        </Card>
      </ScrollView>
      <Button
        buttonStyle={styles.btnSave}
        titleStyle={{ fontSize: fonts.heading2 }}
        title={localizations.t('save')}
        onPress={handleSaveProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  btnSave: {
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.primary,
  },
});

export default Profile;
