import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import login from './LoginReducer';
import role from './RoleReducer';
import users from './UsersAPIReducer';
import createBaleModal from './CreateBaleModalReducer';
import editBaleModal from './EditBaleModalReducer';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  login,
  role,
  users,
  createBaleModal,
  editBaleModal,
});

export default rootReducer;
