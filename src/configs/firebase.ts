// @ts-ignore
// prettier-ignore
// eslint-disable-next-line object-curly-newline
import { FIREBASE_PROJECT_ID, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_STORAGE_BUCKET } from 'react-native-dotenv';

const firebase = Object.freeze({
  projectId: (FIREBASE_PROJECT_ID as string) || '',
  apiKey: (FIREBASE_API_KEY as string) || '',
  authDomain: (FIREBASE_AUTH_DOMAIN as string) || '',
  databaseURL: (FIREBASE_DATABASE_URL as string) || '',
  storageBucket: (FIREBASE_STORAGE_BUCKET as string) || '',
});

export default firebase;
