export const initialState = {
  searchParams: {},
};

export function reducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
  case 'Set_Search_Params':
    return {
      ...state,
      ...action.searchParams,
    };
  default:
    return state;
  }
}
