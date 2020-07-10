import { createStore } from 'redux';
import { reducer } from './reducer';
import User from '../services/user';

const store = createStore(reducer);

store.subscribe(() => {
  const user = new User();
  user.init().then(() => {
    console.log("store changed");
    user.updateUser(store.getState().user as UserType);
  });
});

export default store;
