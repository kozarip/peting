import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, TouchableOpacity, View, Text, Linking } from 'react-native';
import { Button, Icon, CheckBox, Overlay } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import LocalStorage from '../services/localStorage';
import { localizations } from '../services/localizations';
import { openLink } from '../services/shared';
import { styleForm } from '../assets/styles/form';
import { styleLink } from '../assets/styles/base';
import {
  dimensions,
  margins,
  colors,
  fonts,
} from '../assets/styles/variables';

const Login: React.FC = () => {
  const ppMarkKey = 'ppMark';
  const ppUrl = 'https://peting.hu/privacy';
  const [ppMark, setPpMark] = useState({
    Google: false,
    Facebook: false,
    SignInWithApple: false,
  });
  const [isActivePpModal, setIsActivePpModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('');

  useEffect(() => {
    const savedPpMarkGoogle = LocalStorage.getItem(`${ppMarkKey}Google`);
    const savedPpMarkFacebook = LocalStorage.getItem(`${ppMarkKey}Facebook`);
    const savedPpMarkApple = LocalStorage.getItem(`${ppMarkKey}SignInWithApple`);
    Promise.all([savedPpMarkGoogle, savedPpMarkFacebook, savedPpMarkApple]).then((values) => {
      setPpMark({
        Google: values[0] === 'true',
        Facebook: values[1] === 'true',
        SignInWithApple: values[2] === 'true',
      });
    });
  }, []);

  const handlePressLoginButton = (provider: 'Google' | 'Facebook' | 'SignInWithApple') => {
    if (ppMark[provider]) {
      if (provider) {
        Auth.federatedSignIn({ provider: provider });
      }
    } else {
      setSelectedProvider(provider);
      setIsActivePpModal(true);
    }
  };

  const handlePressPPCheckBox = () => {
    LocalStorage.setItem(`${ppMarkKey}${selectedProvider}`, (!ppMark[selectedProvider]).toString());
    setPpMark((prev) => {
      return { ...prev, ...{ selectedProvider: !prev[selectedProvider] } };
    });
    if (selectedProvider) {
      setIsActivePpModal(false);
      Auth.federatedSignIn({ provider: selectedProvider });
    }
  };

  const renderPPLabel = () => {
    const stylePPLink = {
      fontSize: fonts.heading2,
      marginLeft: 0,
      color: colors.grey,
    };

    const ppLink = localizations.t('ppLabel');
    const formattedPPLink = ppLink.split('*&/').map((element, i) => {
      if (i % 2 !== 0) {
        return <Text key={i} style={{...stylePPLink, ...styleLink }}>{element}</Text>;
      } else {
        return <Text key={i} style={stylePPLink}>{element}</Text>;
      }
    });
    return formattedPPLink;
  };

  return (
    <View style={styles.buttonContainer}>
      <Overlay
        isVisible={isActivePpModal}
        overlayStyle={styles.modalContainer}
      >
        <View>
          <View style={styles.ppBox}>
            <CheckBox
              title={''}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor={colors.primary}
              size={30}
              uncheckedColor={colors.primary}
              checked={ppMark[selectedProvider]}
              textStyle={{ color: colors.separator, fontWeight: 'normal', fontSize: fonts.heading3 }}
              containerStyle={styleForm.checkBox}
              onPress={handlePressPPCheckBox}
            />
            <TouchableOpacity onPress={() => { openLink(ppUrl)}}>
              <Text style={styles.PPLinkBox}>
                { renderPPLabel() }
              </Text>
            </TouchableOpacity>
          </View>
          <Button
            buttonStyle={styles.btnSecondary}
            titleStyle={{ fontSize: fonts.heading2 }}
            title={localizations.t('close')}
            onPress={() => setIsActivePpModal(false)}
          />
        </View>
      </Overlay>
      <Button
        icon={
          <Icon
            iconStyle={styles.icon}
            name="facebook-square"
            size={30}
            color="white"
            type="font-awesome"
          />
        }
        buttonStyle={styles.button}
        // @ts-ignore
        onPress={() => {
          handlePressLoginButton('Facebook');
        }}
        title={localizations.t('fbLogin')}
      />
      <Button
        icon={
          <Icon
            iconStyle={styles.googleIcon}
            name="google"
            size={30}
            color="white"
            type="font-awesome"
          />
        }
        buttonStyle={{ ...styles.button, ...styles.googleButton }}
        // @ts-ignore
        onPress={() => {
          handlePressLoginButton('Google');
        }}
        title={localizations.t('googleLogin')}
      />
      <Button
        icon={
          <Icon
            iconStyle={styles.googleIcon}
            name="apple"
            size={30}
            color="white"
            type="font-awesome"
          />
        }
        buttonStyle={{ ...styles.button, ...styles.appleButton }}
        // @ts-ignore
        onPress={() => {
          handlePressLoginButton('SignInWithApple');
        }}
        title={localizations.t('appleLogin')}
      />
    </View>

  );
};

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: margins.lg,
    paddingVertical: margins.lg,
    borderRadius: 20,
    width: dimensions.fullWidth * 0.9,
    height: 'auto',
    top: '-10%',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    padding: margins.sm,
    marginBottom: margins.sm,
    backgroundColor: colors.facebook,
    borderRadius: 20,
    width: dimensions.fullWidth * 0.80,
  },
  googleButton: {
    backgroundColor: colors.google,
  },
  appleButton: {
    backgroundColor: colors.apple,
  },
  icon: {
    marginRight: margins.sm,
  },
  googleIcon: {
    marginRight: margins.sm,
  },
  btnSecondary: {
    backgroundColor: colors.separator,
    color: '#fff',
    borderRadius: 20,
    padding: 10,
    marginTop: margins.md,
    marginBottom: margins.sm,
  },
  ppBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  PPLinkBox: {
    textAlign: 'center',
    paddingLeft: 5,
  },
});

export default Login;
