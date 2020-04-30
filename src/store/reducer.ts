export const initialState = {
  logedInUser: {},
};

export function reducer(state = initialState, action) {
  switch (action.type) {
  case 'Set_LogedIn_User':
    return {
      ...state,
      ...action.logedInUser,
    };
  default:
    return state;
  }
}
