import { createStore, combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { reducer } from './petingReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  reducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState);

export default store;
