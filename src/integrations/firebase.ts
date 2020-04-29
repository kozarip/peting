import firebase from 'firebase';
import 'firebase/firestore';
import { config } from '../configs/index';

firebase.initializeApp(config.firebase);
firebase.firestore();

const Firebase = firebase;
export default Firebase;
