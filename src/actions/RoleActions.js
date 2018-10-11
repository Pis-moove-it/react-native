export const actionTypes = {
  ROLE_SELECTION: 'ROLE_SELECTION',
  ROLE_LOGOUT: 'ROLE_LOGOUT',
};

const roleSelected = role => ({
  type: actionTypes.ROLE_SELECTION,
  role,
});

export const selectRole = selectedRole => (dispatch) => {
  dispatch(roleSelected(selectedRole));
};

const roleLogout = () => ({
  type: actionTypes.ROLE_LOGOUT,
});

export const changeRole = () => (dispatch) => {
  console.log('role should change');
  dispatch(roleLogout());
};
