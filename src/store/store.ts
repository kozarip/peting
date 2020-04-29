import { createStore, combineReducers } from 'redux';
import { firebaseReducer, FirebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer } from './petingReducer';


interface Profile {
  name: string
  email: string
}

// with only Profile type
interface RootState {
  firebase: FirebaseReducer.Reducer<Profile>
}


const rootReducer = combineReducers<RootState>({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  reducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState);

export default store;
