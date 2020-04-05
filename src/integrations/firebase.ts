import firebase from 'firebase';
import { config } from '../configs/index';

firebase.initializeApp(config.firebase);

export const Firebase = firebase;
