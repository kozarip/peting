export const initialState = {
  isLoadingActive: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
  case 'Set_Is_Loading_Active':
    return {
      ...state,
      ...action.isLoadingActive,
    };
  default:
    return state;
  }
}
