export function setGlobalSearchParams(searchParams) {
  return {
    type: 'Set_Search_Params',
    searchParams,
  };
}

export function setUser(user) {
  return {
    type: 'Set_User',
    user,
  };
}
