import React from 'react';
// eslint-disable-next-line no-unused-vars
import { StyleSheet, GestureResponderEvent } from 'react-native';
import { Button, Icon } from 'react-native-elements';

type LoginProps = {
  loginWithFacebook: (event: GestureResponderEvent) => void
}

const Login = (props: LoginProps) => {
  const { loginWithFacebook } = props;
  return (
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
      onPress={loginWithFacebook}
      title="Facebook bejelentkezés"
    />

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
