/* eslint-disable */
import { createStore } from 'redux';
import { reducer } from './reducer';
import User from '../services/user';
import { UserType } from '../types/user';

const store = createStore(reducer);

let currentUserValue = {};

store.subscribe( () => {
  const previousValue = { ...currentUserValue };
  currentUserValue = store.getState().user as UserType;
  if (
    !deepEqual(previousValue, currentUserValue)
  ) {
    console.log("User saved to store");
    const user = new User();
    user.init().then(() => {
      user.updateUser(currentUserValue as UserType);
    });
  }
});

function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2) && !(Array.isArray(val1) && Array.isArray(val2));
    const areArrays = Array.isArray(val1) && Array.isArray(val2)
    if (areArrays) {
      if (val1.length !== val2.length) {
        return false;
      }
      for (let i = 0; i < val1.length; i++){
        if (!deepEqual(val1[i], val2[i])) {
          return false;
        }
      }
    }
    if (
      areObjects && !deepEqual(val1, val2)
      || !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}


export default store;
