import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Auth } from 'aws-amplify';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CheckBox } from 'react-native-elements';
import { clearStore, setUser } from '../store/action';
import User from '../services/user';
import Chat from '../services/chat';
import { localizations } from '../services/localizations';
import { removeMatch } from '../services/match';
import ImageStore from '../services/imageStore';
import { openLink } from '../services/shared';
import { notificationPermission } from '../services/pushNotifications';
import { colors, fonts } from '../assets/styles/variables';
import { styleLink } from '../assets/styles/base';
import { styleForm } from '../assets/styles/form';
import Modal from './modal';

const AppSettings: React.FC = () => {
  const ppUrl = 'https://peting.hu/privacy';
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

    if (matches) {
      matches.forEach((match) => {
        removeMatch(match.id);
      });
    }

    if (user.images) {
      user.images.forEach((image) => {
        imageStore.removeFileFromStore(image);
      });
    }

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

  const renderPPLink = () => {
    const stylePPLink = {
      fontSize: fonts.heading2,
      marginLeft: 0,
      color: colors.grey,
    };

    const ppLink = localizations.t('ppLink');
    const formattedPPLink = ppLink.split('*&/').map((element, i) => {
      if (i % 2 !== 0) {
        return <Text style={{...stylePPLink, ...styleLink }}>{element}</Text>;
      } else {
        return <Text style={stylePPLink}>{element}</Text>;
      }
    });
    return formattedPPLink;
  };

  return (
    <View style={{ flex: 1 }}>
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
          <Text style={styleForm.cardTitle}>{localizations.t('others')}</Text>
          <TouchableOpacity onPress={() => { openLink(ppUrl) }}>
            <Text style={styles.PPLinkBox}>
              { renderPPLink() }
            </Text>
          </TouchableOpacity>
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
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: colors.primary,
  },
  btnRemoveMyUser: {
    backgroundColor: colors.darkPrimary,
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
  PPLinkBox: {
    textAlign: 'center',
  },
});

export default AppSettings;
