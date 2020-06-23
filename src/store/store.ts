import { createStore } from 'redux';
import { reducer } from './reducer';
import { subscribeUserChange } from './subscribe';
import User from '../services/user';
import { UserType } from '../types/user';

const store = createStore(reducer);

store.subscribe(() => {
  const user = new User();
  user.init().then(() => {
    console.log("store changed");
    console.log(store.getState());
    user.updateUser(store.getState().user as UserType);
  });
});

export default store;
