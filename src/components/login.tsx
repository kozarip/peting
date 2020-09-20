import React from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import {
  dimensions,
  margins,
  colors,
} from '../assets/styles/variables';

const Login: React.FC = () => {
  return (
    <View style={styles.buttonContainer}>
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
            iconStyle={styles.googleIcon}
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
  icon: {
    marginRight: margins.sm,
  },
  googleIcon: {
    marginRight: margins.sm,
  },
});

export default Login;
