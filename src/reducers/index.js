import {combineReducers} from 'redux';
import authorisation from './authorisation';

const rootReducer = combineReducers({
	authorisation,
});

export default rootReducer;
