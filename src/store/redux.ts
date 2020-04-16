export const initialState = {
  user: {},
};

export function reducer(state = initialState, action) {
  switch (action) {
  case 'Set_User':
    return {
      ...state,
      ...action.user,
    };
  default:
    return state;
  }
}
