import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import login from './LoginReducer';
import role from './RoleReducer';
import data from './APIReducer';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  login,
  role,
  data,
});

export default rootReducer;
