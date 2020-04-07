import firebase from 'firebase';
import { config } from '../configs/index';

firebase.initializeApp(config.firebase);

const Firebase = firebase;
export default Firebase;
