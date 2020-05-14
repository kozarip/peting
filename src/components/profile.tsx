/* eslint-disable no-return-await */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';

import User from '../services/user';
import ImageStore from '../services/imageStore';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';
import MultiSelector from './form/multiSelector';
import ImageSelector from './form/imageSelector';
import FillAlert from './fillAlert';

import { styleForm } from '../assets/styles/form';
// eslint-disable-next-line no-unused-vars
import { UserType } from '../types/user';
import { createNewTypeObject } from './form/formHelpers';
import Loader from './loader';
import { Alert } from 'react-native';
import { colors } from '../assets/styles/variables';

import {
  gender,
  hairColor,
  animalType,
  animalSize,
  smokeFrequency,
  hobbies,
} from '../constants/userFields';

const Profile: React.FC = () => {
  const initialProfileUser: UserType = {
    userName: '',
    firstName: '',
    surName: '',
    email: '',
    gender: -1,
    height: 0,
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

  const [isNewUser, setIsNewUser] = useState(false);
  const [profileUser, setProfileUser] = useState(initialProfileUser);
  const [oldImageKeys, setOldImageKeys] = useState([]);
  const [removedImageKeys, setRemovedImageKeys] = useState([]);
  const [isLoaderActive, setIsLoaderActive] = useState(false);

  const user = new User();
  const imageStore = new ImageStore('Unknown');

  useEffect(() => {
    user.isCurrentUserExist().then((exist) => {
      setIsLoaderActive(true);
      const userExis = !!exist;
      if (!userExis) {
        user.saveNewUser();
        setIsNewUser(true);
      } else {
        loadExistingUser();
      }
    });
  }, [isNewUser]);

  const loadExistingUser = () => {
    user.getUserData().then(async (u: any) => {
      console.log(u);
      const fetchedUser = u.data.userByCognitoUserName.items[0];
      if (fetchedUser.images) {
        setOldImageKeys(fetchedUser.images);
      }
      const imageKeys = fetchedUser.images || [];
      const imageURLs = await imageStore.fetchImages(imageKeys);
      Promise.all(imageURLs).then((compiledImages) => {
        fetchedUser.images = compiledImages;
        setProfileUser({ ...profileUser, ...fetchedUser });
        setIsLoaderActive(false);
      });
    });
  };

  const setProfileUserValue = (value) => {
    setProfileUser({ ...profileUser, ...value });
  };

  const handleRemoveImage = (index) => {
    if (index < oldImageKeys.length) {
      const removedImageKey = oldImageKeys.splice(index, 1);
      console.log(removedImageKeys);
      setOldImageKeys(oldImageKeys);
      setRemovedImageKeys(removedImageKeys.concat(removedImageKey));
      console.log(removedImageKeys);
    }

    profileUser.images.splice(index, 1);
    setProfileUserValue(createNewTypeObject('images', profileUser.images));
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
      user.updateUser(modifiedProfileUser);
      setIsLoaderActive(false);
      Alert.alert('Sikeres mentés');
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Loader isActive={isLoaderActive} />
        <FillAlert
          isNewUser={isNewUser}
          setIsNewUser={setIsNewUser}
        />
        <Card>
          <ImageSelector
            type="images"
            primaryImageIndex={profileUser.primaryImageIndex || 0}
            setValue={setProfileUserValue}
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
            setValue={setProfileUserValue}
          />
          <TextBox
            label="E-mail"
            value={profileUser.email}
            type="email"
            setValue={setProfileUserValue}
            placeholder="E-mail címed"
          />
          <RadioButton
            options={gender}
            value={profileUser.gender}
            type="gender"
            label="Nemed"
            setValue={setProfileUserValue}
          />
          <TextBox
            label="Korod"
            type="age"
            placeholder="év"
            keyboardType="number-pad"
            value={profileUser.age}
            setValue={setProfileUserValue}
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
            setValue={setProfileUserValue}
          />
          <Selector
            label={hairColor.label}
            options={hairColor.options}
            type="hairColor"
            setValue={setProfileUserValue}
            value={profileUser.hairColor}
          />
        </Card>

        <Card
          containerStyle={styleForm.cardBlock}
          title="Állatod"
          titleStyle={styleForm.cardTitle as any}
        >
          <Selector
            label={animalType.label}
            options={animalType.options}
            type="animalType"
            setValue={setProfileUserValue}
            value={profileUser.animalType}
          />
          <Selector
            label={animalSize.label}
            options={animalSize.options}
            type="animalSize"
            setValue={setProfileUserValue}
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
            setValue={setProfileUserValue}
            value={profileUser.smokeFrequency}
          />
          <MultiSelector
            label="Hobbijaid"
            options={hobbies}
            type="hobbies"
            setValue={setProfileUserValue}
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
