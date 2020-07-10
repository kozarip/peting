/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
  Alert,
} from 'react-native';
import { Card } from 'react-native-elements';

import ImageStore from '../services/imageStore';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';
import MultiSelector from './form/multiSelector';
import ImageSelector from './form/imageSelector/imageSelector';
import CitySelector from './form/citySelector';

import { styleForm } from '../assets/styles/form';
// eslint-disable-next-line no-unused-vars
import { UserType } from '../types/user';
import { createNewTypeObject } from './form/formHelpers';
import Loader from './loader';
import { colors } from '../assets/styles/variables';

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
    gender: -1,
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
  };
  const imageTypes = ['images', 'animalImages'];

  const [profileUser, setProfileUser] = useState(initialProfileUser);
  const [removedImageKeys, setRemovedImageKeys] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

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
      console.log(modifiedProfileUser.primaryImageIndex);
      saveUser({ ...userAttributes, ...modifiedProfileUser });
      Alert.alert('Sikeres mentés');
      setIsLoaderActive(false);
    });
  };

  const selectNewImages = (imageType: 'images' | 'animalImages') => {
    const images = profileUser[imageType] || [];
    return images.filter((image) => image.startsWith('file://'));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
        <Loader isActive={isLoaderActive} />
        <Card>
          <ImageSelector
            type="images"
            primaryImageIndex={profileUser.primaryImageIndex || 0}
            setValue={setProfileUserAttribute}
            images={profileUser.images || []}
            title="Tölts fel képeket magadról"
            removeImage={handleRemoveImage}
          />
          <ImageSelector
            type="animalImages"
            primaryImageIndex={0}
            setValue={setProfileUserAttribute}
            images={profileUser.animalImages || []}
            title="Tölts fel képeket a kedvencedről"
            removeImage={handleRemoveImage}
          />
        </Card>
        <Card
          containerStyle={styleForm.cardBlock}
          title="Alapadatok"
          titleStyle={styleForm.cardTitle as any}
        >
          <TextBox
            label="Név"
            type="userName"
            placeholder="Ird ide a neved"
            value={profileUser.userName}
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label="E-mail"
            value={profileUser.email}
            type="email"
            setValue={setProfileUserAttribute}
            placeholder="E-mail címed"
          />
          <RadioButton
            options={gender}
            value={profileUser.gender}
            type="gender"
            label="Nemed"
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label="Korod"
            type="age"
            placeholder="év"
            keyboardType="number-pad"
            value={profileUser.age}
            setValue={setProfileUserAttribute}
          />
          <TextBox
            label="Bio"
            type="bio"
            placeholder=""
            value={profileUser.bio}
            setValue={setProfileUserAttribute}
          />
          <CitySelector />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Kinézet"
          titleStyle={styleForm.cardTitle as any}
        >
          <TextBox
            label="Magasság (cm)"
            placeholder="? cm"
            type="height"
            keyboardType="number-pad"
            value={profileUser.height}
            setValue={setProfileUserAttribute}
          />
          <Selector
            label={hairColor.label}
            options={hairColor.options}
            type="hairColor"
            setValue={setProfileUserAttribute}
            value={profileUser.hairColor}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Állatod"
          titleStyle={styleForm.cardTitle as any}
        >
          <TextBox
            label="Állatod neve"
            type="animalName"
            value={profileUser.animalName}
            setValue={setProfileUserAttribute}
          />
          <Selector
            label={animalType.label}
            options={animalType.options}
            type="animalType"
            setValue={setProfileUserAttribute}
            value={profileUser.animalType}
          />
          <Selector
            label={animalSize.label}
            options={animalSize.options}
            type="animalSize"
            setValue={setProfileUserAttribute}
            value={profileUser.animalSize}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Egyéb"
          titleStyle={styleForm.cardTitle as any}
        >
          <Selector
            label={smokeFrequency.label}
            options={smokeFrequency.options}
            type="smokeFrequency"
            setValue={setProfileUserAttribute}
            value={profileUser.smokeFrequency}
          />
          <MultiSelector
            label="Hobbijaid"
            options={hobbies}
            type="hobbies"
            setValue={setProfileUserAttribute}
            value={profileUser.hobbies}
          />
        </Card>
      </ScrollView>
      <Button
        color={colors.darkPrimary}
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
});

export default Profile;
