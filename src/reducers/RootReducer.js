import { combineReducers } from 'redux';
import loading from './LoadingReducer';
import error from './ErrorReducer';
import user from './UserReducer';
import login from './LoginReducer';
import role from './RoleReducer';
import users from './UsersAPIReducer';
import bales from './BalesReducer';
import createBaleModal from './CreateBaleModalReducer';
import editBaleModal from './EditBaleModalReducer';
import createPocketModal from './CreatePocketModalReducer';
import date from './GatherReducer';
import hour from './GatherReducer';
import kmsTraveled from './GatherReducer';
import pocketsCollected from './GatherReducer';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  login,
  role,
  users,
  bales,
  createBaleModal,
  editBaleModal,
  createPocketModal,
  date,
  hour,
  kmsTraveled,
  pocketsCollected,
});

export default rootReducer;
