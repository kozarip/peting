import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CheckBox } from 'react-native-elements';
import User from '../services/user';
import Chat from '../services/chat';
import { localizations } from '../services/localizations';
import { removeMatch } from '../services/match';
import ImageStore from '../services/imageStore';
import { colors, fonts } from '../assets/styles/variables';
import { styleForm } from '../assets/styles/form';
import { clearStore, setUser } from '../store/action';
import Modal from './modal';
import { notificationPermission } from '../services/pushNotifications';

const AppSettings: React.FC = () => {
  const [allowedNotification, setAllowedNotification] = useState(false);
  const [isActiveConfirmUserDeleteModal, setIsActiveConfirmUserDeleteModal] = useState(false);
  const { matches, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setAllowedNotification(user.isPushNotificationActive);
  }, []);

  const removeUser = () => {
    const userClass = new User();
    const chatClass = new Chat();
    const imageStore = new ImageStore(user.cognitoUserName);

    userClass.removeUser(user.id);

    chatClass.getMyChats(user.cognitoUserName).then((rawChats) => {
      const chats = rawChats.data.searchChats.items;
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

    logOut();
  };

  const logOut = () => {
    clearStore();
    addNewTokenForUser('');
    Auth.signOut();
  };

  const switchAllowedNotification = async () => {
    const permission = await notificationPermission();
    let tempAllowedNotification = true;
    if (allowedNotification || permission !== 'granted') {
      tempAllowedNotification = false;
    }
    const newUser = { ...user };
    newUser.isPushNotificationActive = tempAllowedNotification;
    dispatch(setUser({ user: newUser }));
    setAllowedNotification(tempAllowedNotification);
  };

  const addNewTokenForUser = (token) => {
    const newUser = { ...user };
    newUser.deviceId = token;
    dispatch(setUser({ user: newUser }));
  };

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
            title={localizations.t('removeProfile')}
            description={localizations.t('removeProfileConfirm')}
            buttonPrimaryText={localizations.t('yes')}
            handlePressButtonPrimary={() => { removeUser(); setIsActiveConfirmUserDeleteModal(false);}}
            buttonSecondaryText={localizations.t('no')}
            handlePressButtonSecondary={() => { setIsActiveConfirmUserDeleteModal(false); }}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('notifications')}</Text>
          <CheckBox
            title={localizations.t('getNotifications')}
            checked={allowedNotification}
            onPress={switchAllowedNotification}
            checkedColor={colors.primary}
            containerStyle={styles.checkBox}
            textStyle={styles.checkBoxText}
            size={30}
          />
          <Text style={styleForm.cardTitle}>{localizations.t('user')}</Text>
          <Button
            buttonStyle={styles.btnRemoveMyUser}
            titleStyle={{ fontSize: fonts.heading2 }}
            title={localizations.t('removeProfile')}
            onPress={() => {
              setIsActiveConfirmUserDeleteModal(true);
            }}
          />

        </Card>
      </ScrollView>
      <Button
        buttonStyle={styles.btnSave}
        titleStyle={{ fontSize: fonts.heading2 }}
        title={localizations.t('logout')}
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
