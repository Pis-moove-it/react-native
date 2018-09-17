//import UserController from '../controllers/UserController';

export const actionTypes = {
	ROLE_SELECTION: 'ROLE_SELECTION',
	ROLE_LOGOUT: 'ROLE_LOGOUT',
};

const roleSelected = role => ({
	type: actionTypes.ROLE_SELECTION,
	role,
})

export const selectRole = selectedRole => (dispatch) => {
	dispatch(roleSelected(selectedRole));
	/*dispatch(loginRequest());
	try {
		const user = await UserController.login(email, password);
		dispatch(loginSuccess(user));
	} catch (error) {
		dispatch(loginError(error.message));
	}*/
};

const roleLogout = () => ({
	type: actionTypes.ROLE_LOGOUT,
})

export const changeRole = () => (dispatch) => {
	dispatch(roleLogout());
};

