import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import AuthService from '../services/auth';

const AuthScreen: React.FC = () => {
  const [user, setUser] = useState<{ user: null | object }>({});

  useEffect(() => {
    AuthService.subscribeAuthChange(receivedUser => setUser(receivedUser));
  })

  if (user) {
    console.log(user);
    const name = user.displayName
    const avatar = user.photoURL && (
      <Image style={{ width: 50, height: 50 }} source={{ uri: user.photoURL }} />
    );
    return (
      <View style={styles.container}>
        <Text>{name}</Text>
        {avatar}
        <Button onPress={AuthService.logout} title='Logout' />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Button onPress={AuthService.loginWithFacebook} title='Login with Facebook' />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default AuthScreen;