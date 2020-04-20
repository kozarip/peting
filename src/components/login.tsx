import React from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, GestureResponderEvent, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../services/auth';

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
        pressRetentionOffset={{
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
        }}
        buttonStyle={styles.button}
        onPress={AuthService.loginWithFacebook}
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
        pressRetentionOffset={{
          top: 10,
          left: 10,
          bottom: 10,
          right: 10,
        }}
        buttonStyle={{ ...styles.button, ...styles.googleButton }}
        onPress={AuthService.loginWithGoogle}
        title="Google bejelentkezés"
      />
    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#4267B2',
  },
  googleButton: {
    backgroundColor: '#DB4437',
  },
  icon: {
    marginRight: 10,
  },
});

export default Login;
