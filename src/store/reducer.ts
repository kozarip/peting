export const initialState = {
  searchParams: {},
  user: {},
  matches: [],
  chatIDs: [],
  activeMenu: 2,
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
      return {
        ...state,
        ...action.matches,
      };
    case 'Add_To_Matches':
      return {
        ...state,
        matches: [...state.matches, action.match],
      };
    case 'Remove_From_Matches':
      return {
        ...state,
        matches: state.matches.filter((oldMatch) => oldMatch.id !== action.match.id),
      };
    case 'clear_store':
      return initialState;
    default:
      return state;
  }
}
