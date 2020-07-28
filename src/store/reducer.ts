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
    default:
      return state;
  }
}

const mergeOnlyOneMatchObj = (stateMatches, newMatch) => {
  const stateMatchesWithoutTheNewOne = stateMatches.filter((match) => (
    match.cognitoUserName !== newMatch.cognitoUserName));
  //console.log(match.cognitoUserName, newMatch.cognitoUserName);
  return { matches: [...stateMatchesWithoutTheNewOne, ...[newMatch]] };
};
