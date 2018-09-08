const defaultState = {
	isLoggedIn: false,
	username: null,
};

export default function reducer(state = defaultState, action) {
	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, {
				isLoggedIn: true,
				username: action.username,
			});
		case 'LOGOUT':
			return Object.assign({}, state, {
				isLoggedIn: false,
				username: null,
			});
		default:
			return state;
	}
}
