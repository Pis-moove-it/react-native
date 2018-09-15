import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import role from './RoleReducer';

const rootReducer = combineReducers({
	loading,
	error,
	user,
	role
});

export default rootReducer;
