export const initialState = {
  searchParams: {},
  user: {},
  matches: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'Set_Search_Params':
      return {
        ...state,
        ...action.searchParams,
      };
    case 'Set_User':
      return {
        ...state,
        ...action.user,
      };
    case 'Set_Matches':
      return {
        ...state,
        ...{ matches: [...state.matches, ...action.matches] },
      };
    default:
      return state;
  }
}
