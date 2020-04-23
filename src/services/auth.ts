import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import { Alert } from 'react-native';

import { config } from '../configs/index';
import Firebase from '../integrations/firebase';

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
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] });
      if (type === 'success') {
        const credential = Firebase.auth.FacebookAuthProvider.credential(token);
        await Firebase.auth().signInWithCredential(credential);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert(`Facebook Login Error: ${message}`);
    }
  }

  static async loginWithGoogle() {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId: '987658316582-rvkudgpoho1oeochlv7sti2136sccaqh.apps.googleusercontent.com',
        iosClientId: '987658316582-alluojp12vglaf7n3m6c3r4gunhphbka.apps.googleusercontent.com',
      });
      if (result.type === 'success') {
        const credential = Firebase.auth
          .GoogleAuthProvider.credential(result.idToken, result.accessToken);
        Firebase.auth().signInWithCredential(credential);
      } else {
        console.log({ cancelled: true });
      }
    } catch (e) {
      console.log({ error: true });
    }
  }


  public static async logout() {
    // await fetch(`https://graph.facebook.com/me?access_token=${AuthService.token}`);
    Firebase.auth().signOut();
  }

  /**
   * Register a subscription callback for changes of the currently authenticated user
   *
   * @param callback Called with the current authenticated user as first argument
   */
  public static subscribeAuthChange(callback : (user : firebase.User | null) => void) {
    Firebase.auth().onAuthStateChanged(callback);
  }
}
