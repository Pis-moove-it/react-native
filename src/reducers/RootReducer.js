import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import data from './APIReducer'

const rootReducer = combineReducers({
	loading,
	error,
	user,
	data,
});

export default rootReducer;
