export const initialState = {
  searchParams: {},
  user: {},
  matches: [],
  chatIDs: [],
  activeMenu: 2,
};

export function reducer(state = initialState, action) {
  console.log(action);
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
    case 'Set_Chat_IDs':
      return {
        ...state,
        ...action.chatIDs,
      };
    case 'Set_Active_Menu_Id':
      return {
        ...state,
        ...action.activeMenu,
      };
    case 'Set_Matches':
      if (action.matches.length === 1) {
        return {
          ...state,
          ...mergeOnlyOneMatchObj(state.matches, action.matches[0]),
        };
      }
      return {
        ...state,
        ...{ matches: [...state.matches, ...action.matches] },
      };
    case 'clear_store':
      return initialState;
    default:
      return state;
  }
}

const mergeOnlyOneMatchObj = (stateMatches, newMatch) => {
  const stateMatchesWithoutTheNewOne = stateMatches.filter((match) => (
    match.cognitoUserName !== newMatch.cognitoUserName));
  return { matches: [...stateMatchesWithoutTheNewOne, ...[newMatch]] };
};
