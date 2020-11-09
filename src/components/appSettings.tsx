import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox, Button, Card } from 'react-native-elements';
import User from '../services/user';
import Chat from '../services/chat';
import { removeMatch } from '../services/match';
import ImageStore from '../services/imageStore';
import { colors, fonts } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';
import { clearStore, setUser } from '../store/action';
import Modal from './modal';

const AppSettings: React.FC = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [isActiveConfirmUserDeleteModal, setIsActiveConfirmUserDeleteModal] = useState(false)
  const { matches, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const removeUser = () => {
    const userClass = new User();
    const chatClass = new Chat();
    const imageStore = new ImageStore(user.cognitoUserName);

    userClass.removeUser(user.id)

    chatClass.getMyChats(user.cognitoUserName).then((rawChats) => {
      const chats = rawChats.data.searchChats.items
      chats.forEach(givenChat => {
        chatClass.removeChat(givenChat.id);
      });
    });

    matches.forEach((match) => {
      removeMatch(match.id);
    });

    user.images.forEach((image) => {
      imageStore.removeFileFromStore(image);
    });
  };

  const logOut = () => {
    clearStore();
    const newUser = { ...user };
    newUser.deviceId = '';
    dispatch(setUser({ user: newUser }));
    Auth.signOut();
  }

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps="always"
        style={styles.container}
      >
        <Card
          containerStyle={styleForm.cardBlock}
        >
          <Modal
            iconName="trash"
            isVisible={isActiveConfirmUserDeleteModal}
            title="Profilom törlése"
            description="Biztos törölni akarod? Ezzel minden adatod törlésre kerül!"
            buttonPrimaryText='Igen'
            handlePressButtonPrimary={() => { removeUser(); setIsActiveConfirmUserDeleteModal(false);}}
            buttonSecondaryText='Nem'
            handlePressButtonSecondary={() => { setIsActiveConfirmUserDeleteModal(false); }}
          />
          <Text style={styleForm.cardTitle}>Értesítések</Text>
{/*           <CheckBox
            title="Kérek értesítést (Nem működik)"
            checked={hasNotification}
            onPress={() => setHasNotification(!hasNotification)}
            uncheckedIcon={colors.primary}
            checkedColor={colors.primary}
            containerStyle={styles.checkBox}
            textStyle={styles.checkBoxText}
            size={30}
          />
          <CheckBox
            title="Kérek értesítést (Nem működik)"
            checked={hasNotification}
            onPress={() => setHasNotification(!hasNotification)}
            uncheckedIcon={colors.primary}
            checkedColor={colors.primary}
            containerStyle={styles.checkBox}
            textStyle={styles.checkBoxText}
            size={30}
          /> */}
          <Text style={styleForm.cardTitle}>Felhasználó</Text>
          <Button
            buttonStyle={styles.btnRemoveMyUser}
            titleStyle={{ fontSize: fonts.heading2 }}
            title="Profilom törlés"
            onPress={() => {
              setIsActiveConfirmUserDeleteModal(true);
            }}
          />

        </Card>
      </ScrollView>
      <Button
        buttonStyle={styles.btnSave}
        titleStyle={{ fontSize: fonts.heading2 }}
        title="Kijelentkezés"
        onPress={logOut}
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
  btnRemoveMyUser: {
    backgroundColor:colors.darkPrimary,
  },
  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    marginTop: 0,
    marginBottom: 0,
  },
  checkBoxText: {
    color: colors.separator,
  },
});

export default AppSettings;
