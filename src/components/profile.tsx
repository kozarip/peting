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
import ImageSelector from './form/imageSelector';

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
    cognitoUserName: '',
    hairColor: '',
    age: 0,
    images: [],
    primaryImageIndex: 0,
  };

  const [profileUser, setProfileUser] = useState(initialProfileUser);
  const [oldImageKeys, setOldImageKeys] = useState([]);
  const [removedImageKeys, setRemovedImageKeys] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const imageStore = new ImageStore('Unknown');

  useEffect(() => {
    initProfileUser();
  }, []);

  const initProfileUser = async () => {
    setProfileUser({ ...profileUser, ...userAttributes });
    if (userAttributes.images && userAttributes.images.length > 0 && !userAttributes.images[0].startsWith('https://')) {
      setCompiledImagesToUrl();
    }
  };

  const setCompiledImagesToUrl = async () => {
    setIsLoaderActive(true);
    setOldImageKeys(userAttributes.images);
    const imageURLs = await imageStore.fetchImages(userAttributes.images);
    Promise.all(imageURLs).then((compiledImages: string[]) => {
      const profileUserWithCompiledImage = { ...{}, ...userAttributes };
      profileUserWithCompiledImage.images = compiledImages;
      setProfileUser(profileUserWithCompiledImage);
      setIsLoaderActive(false);
    });
  };

  const setProfileUserAttribute = (value) => {
    setProfileUser({ ...profileUser, ...value });
  };

  const handleRemoveImage = (index) => {
    if (index < oldImageKeys.length) {
      const removedImageKey = oldImageKeys.splice(index, 1);
      setOldImageKeys(oldImageKeys);
      setRemovedImageKeys(removedImageKeys.concat(removedImageKey));
    }

    profileUser.images.splice(index, 1);
    setProfileUserAttribute(createNewTypeObject('images', profileUser.images));
  };

  const handleSaveProfile = async () => {
    setIsLoaderActive(true);
    const images = profileUser.images || [];
    const newImages = images.filter((image) => image.startsWith('file://'));
    const newKeysPromise = await imageStore.uploadImages(
      newImages,
      profileUser.cognitoUserName,
    );

    const removeImages = await imageStore.removeImages(removedImageKeys);
    Promise.all(removeImages).then((log) => {
      console.log(log);
    });

    Promise.all(newKeysPromise).then((newKeys: any) => {
      const wholeImageKeys = oldImageKeys.concat(newKeys);
      const modifiedProfileUser = { ...{}, ...profileUser };
      modifiedProfileUser.images = wholeImageKeys;
      setUserAttributes({ ...userAttributes, ...modifiedProfileUser });
      saveUser({ ...userAttributes, ...modifiedProfileUser });
      Alert.alert('Sikeres mentés');
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Loader isActive={isLoaderActive} />
        <Card>
          <ImageSelector
            type="images"
            primaryImageIndex={profileUser.primaryImageIndex || 0}
            setValue={setProfileUserAttribute}
            images={profileUser.images || []}
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
