import { createStore, combineReducers } from 'redux';
import { reducer } from './reducer';

const rootReducer = combineReducers({
  reducer,
});

const initialState = {};
const store = createStore(rootReducer, initialState);

export default store;
