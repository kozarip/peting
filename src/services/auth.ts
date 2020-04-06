import * as Facebook from 'expo-facebook';

import { config } from '../configs/index';
import { Firebase } from '../integrations/firebase';
import { Alert } from 'react-native';

export default class AuthService {
  /**
   * Login with Facebook and Firebase
   *
   * Uses Expo Facebook API and authenticates the Facebook user in Firebase
   */

  public static async loginWithFacebook() {
    try {
      await Facebook.initializeAsync(config.facebook.appId);

      // @ts-ignore
      // prettier-ignore
      const { type, token, expires, permissions, declinedPermissions }
        = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

        const credential = Firebase.auth.FacebookAuthProvider.credential(token);
        await Firebase.auth().signInWithCredential(credential);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  public static async logout() {
    return Firebase.auth().signOut();
  }

  /**
   * Register a subscription callback for changes of the currently authenticated user
   *
   * @param callback Called with the current authenticated user as first argument
   */
  public static subscribeAuthChange(
    callback: (user: firebase.User | null) => void
  ) {
    Firebase.auth().onAuthStateChanged(callback);
  }
}
