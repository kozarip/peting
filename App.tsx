import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore' 
import MainScreen from './src/screens/mainScreen';
import store from './src/store/store';
import Firebase from './src/integrations/firebase';

const rrfProps = {
  firebase: Firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  createFirestoreInstance,
  dispatch: store.dispatch,
};

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <MainScreen />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}
