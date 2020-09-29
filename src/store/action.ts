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
    matches: { matches },
  };
}

export function addMatch(match) {
  return {
    type: 'Add_To_Matches',
    match,
  };
}

export function deleteMatch(match) {
  return {
    type: 'Remove_From_Matches',
    match,
  };
}

export function clearStore() {
  return { type: 'clear_store' };
}

export function setActiveMenuId(activeMenu) {
  return {
    type: 'Set_Active_Menu_Id',
    activeMenu: { activeMenu },
  };
}

export function setChatIds(chatIDs) {
  return {
    type: 'Set_Chat_IDs',
    chatIDs,
  };
}
