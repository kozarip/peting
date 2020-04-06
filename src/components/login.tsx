import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = (props) => {
  const { loginWithFacebook } = props;
  return (
    <Button
      icon={
        <Icon
          style={styles.icon}
          name="facebook-square"
          size={30}
          color="white"
        />
      }
      style={styles.button}
      onPress={loginWithFacebook}
      title="Facebook bejelentkezés"
    />

  )
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
  },
  icon: {
    marginRight: 10
  }
})

export default Login