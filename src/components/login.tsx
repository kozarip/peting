import React from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import {
  margins,
  colors,
} from '../assets/styles/variables';

const Login: React.FC = () => {
  return (
    <View>
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
        onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}
        title="Facebook bejelentkezés"
      />
      <Button
        icon={
          <Icon
            iconStyle={styles.icon}
            name="google"
            size={30}
            color="white"
            type="font-awesome"
          />
        }
        buttonStyle={{ ...styles.button, ...styles.googleButton }}
        // @ts-ignore
        onPress={() => Auth.federatedSignIn({ provider: 'Google' })}
        title="Google bejelentkezés"
      />
    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    padding: margins.xsm,
    marginBottom: margins.sm,
    backgroundColor: colors.facebook,
  },
  googleButton: {
    backgroundColor: colors.google,
  },
  icon: {
    marginRight: margins.sm,
  },
});

export default Login;
