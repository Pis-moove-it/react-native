import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import login from './LoginReducer';
import role from './RoleReducer';
import users from './UsersAPIReducer';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  login,
  role,
  users,
});

export default rootReducer;
