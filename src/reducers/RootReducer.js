import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import role from './RoleReducer';
import data from './APIReducer'

const rootReducer = combineReducers({
	loading,
	error,
	user,
	role,
	data
});

export default rootReducer;
