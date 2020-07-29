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

export function setMatches(matches) {
  return {
    type: 'Set_Matches',
    matches: matches.matches,
  };
}

export function clearStore() {
  return {type: 'clear_store'}
}
