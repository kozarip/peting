/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';
import { Card, Button } from 'react-native-elements';

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
import Loader from './loader';
import { colors, fonts, margins } from '../assets/styles/variables';
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
        setUserAttributes({ ...userAttributes, ...modifiedProfileUser });
        saveUser({ ...userAttributes, ...modifiedProfileUser });
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
    return false;
  };

  const formatMandatoryErrorList = (list) => {
    const translatedLabels = list.map((element) => {
      return userField[element].label;
    })
    return translatedLabels.join(', ');
  };

  const selectNewImages = (imageType: 'images' | 'animalImages') => {
    const images = profileUser[imageType] || [];
    return images.filter((image) => image.startsWith('file://'));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <Modal
          iconName="spinner"
          isVisible={isLoaderActive}
          description="Adatok betöltése..."
        />
        <Modal
          iconName="exclamation"
          iconColor={colors.darkPrimary}
          isVisible={isActiveRequireModal}
          description={`Az alábbi mezők kitőltése kötelező: ${formatMandatoryErrorList(errorFields)}`}
          buttonPrimaryText="Rendben"
          handlePressButtonPrimary={() => { setIsActiveRequireModal(false); }}
        />
        <Card>
          <ImageSelector
            type="images"
            mandatory={mandatoryFields.includes('images')}
            primaryImageIndex={profileUser.primaryImageIndex || 0}
            setValue={setProfileUserAttribute}
            images={profileUser.images || []}
            title="Képeid"
            removeImage={handleRemoveImage}
          />
          <ImageSelector
            type="animalImages"
            mandatory={mandatoryFields.includes('animalImages')}
            primaryImageIndex={0}
            setValue={setProfileUserAttribute}
            images={profileUser.animalImages || []}
            title="Kedvenced képei"
            removeImage={handleRemoveImage}
          />
          <Text style={styleForm.cardTitle}>Alapadatok</Text>
          <TextBox
            label="Név"
            type="userName"
            mandatory={mandatoryFields.includes('userName')}
            placeholder="Ird ide a neved"
            value={profileUser.userName}
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label="E-mail"
            mandatory={mandatoryFields.includes('email')}
            value={profileUser.email}
            type="email"
            setValue={setProfileUserAttribute}
            placeholder="E-mail címed"
          />
          <RadioButton
            options={gender}
            value={profileUser.gender}
            mandatory={mandatoryFields.includes('gender')}
            type="gender"
            label="Nemed"
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label="Korod"
            type="age"
            mandatory={mandatoryFields.includes('age')}
            placeholder="év"
            keyboardType="number-pad"
            value={profileUser.age}
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label="Bio"
            type="bio"
            mandatory={mandatoryFields.includes('bio')}
            placeholder=""
            value={profileUser.bio}
            setValue={setProfileUserAttribute}
          />
          <CitySelector
            label="Lakhelyed"
            setValue={setProfileUserAttribute}
            value={profileUser.cityName}
          />
          <Text style={styleForm.cardTitle}>Kinézet</Text>
          <TextBox
            label="Magasság (cm)"
            mandatory={mandatoryFields.includes('height')}
            placeholder="? cm"
            type="height"
            keyboardType="number-pad"
            value={profileUser.height}
            setValue={setProfileUserAttribute}
          />
          <Selector
            label={hairColor.label}
            mandatory={mandatoryFields.includes('hairColor')}
            options={hairColor.options}
            type="hairColor"
            setValue={setProfileUserAttribute}
            value={profileUser.hairColor}
          />
          <Text style={styleForm.cardTitle}>Kedvenced</Text>
          <TextBox
            label="Kedvenced neve"
            type="animalName"
            mandatory={mandatoryFields.includes('animalName')}
            value={profileUser.animalName}
            setValue={setProfileUserAttribute}
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
          <Text style={styleForm.cardTitle}>Egyéb</Text>
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            mandatory={mandatoryFields.includes('smokeFrequency')}
            type="smokeFrequency"
            setValue={setProfileUserAttribute}
            value={profileUser.smokeFrequency}
          />
          <MultiSelector
            label="Hobbijaid"
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
        title="Mentés"
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
    backgroundColor: colors.primary,
  },
});

export default Profile;
