export function setLogedInUser(logedInUser) {
  return {
    type: 'Set_LogedIn_User',
    logedInUser,
  };
}
