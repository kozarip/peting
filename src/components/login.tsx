import React from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, GestureResponderEvent, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AuthService from '../services/auth';


const Login = () => {
  return (
    <View>
      <Button
        icon={
          <Icon
            style={styles.icon}
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
        style={styles.button}
        onPress={AuthService.loginWithFacebook}
        title="Facebook bejelentkezés"
      />
      <Button title="Google bejelentkezés" onPress={AuthService.loginWithGoogle} />
    </View>

  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default Login;
