import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import { Card } from 'react-native-elements';

import User from '../services/user';

import TextBox from './form/textBox';
import Selector from './form/selector';
import RadioButton from './form/radioButton';
import MultiSelector from './form/multiSelector';
import FillAlert from './fillAlert';

import { styleForm } from '../assets/styles/form';

import {
  gender,
  hairColor,
  animalType,
  animalSize,
  smokeFrequency,
  hobbies,
} from '../constants/userFields';

const Profile: React.FC = () => {

  const initialProfileUser = {
    userName: '',
    email: '',
    gender: -1,
    height: '',
    animal: '',
    //hobbies: [],
    cognitoUserName: '',
  };

  const [isNewUser, setIsNewUser] = useState(false);
  const [profileUser, setProfileUser] = useState(initialProfileUser);

  const user = new User();

  useEffect(() => {
    user.isCurrentUserExist().then((exist) => {
      const userExis = !!exist;
      if (!userExis) {
        user.saveNewUser();
        setIsNewUser(true);
      } else {
        user.getUserData().then((u) => {
          console.log(u);
          setProfileUser(
            {
              ...profileUser,
              // @ts-ignore
              ...u.data.userByCognitoUserName.items[0],
            },
          );
        });
      }
    });
  }, []);

  const setProfileUserValue = (value) => {
    setProfileUser({ ...profileUser, ...value });
  };

  return (
    <ScrollView style={styles.container}>
      <FillAlert
        isNewUser={isNewUser}
        setIsNewUser={setIsNewUser}
      />
      <Card
        containerStyle={styleForm.cardBlock}
        title="Alapadatok"
        titleStyle={styleForm.cardTitle as any}
      >
        <TextBox
          label="Név"
          type="userName"
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
          values={gender}
          value={profileUser.gender}
          type="gender"
          label="Nemed"
          setValue={setProfileUserValue}
        />
      </Card>

      <Card
        containerStyle={styleForm.cardBlock}
        title="Kinézet"
        titleStyle={styleForm.cardTitle as any}
      >
        <TextBox
          label="Magasság"
          placeholder="? cm"
          type="height"
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
          type="animal"
          setValue={setProfileUserValue}
          value={profileUser.animal}
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
        <MultiSelector label="Hobbijaid" options={hobbies} />
      </Card>
      <Button
        title="Mentés"
        onPress={() => user.updateUser(profileUser)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default Profile;
