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
import travelImage from './GatherReducer';
import kmsTraveled from './GatherReducer';
import pocketsCollected from './GatherReducer';
import gather from './GatherReducer';
import editPocketModal from './EditIdPocketModalReducer';
import editWeightPocketModal from './EditWeightPocketModalReducer';
import pockets from './PocketReducer';

const rootReducer = combineReducers({
  loading,
  error,
  user,
  login,
  role,
  users,
  bales,
  pockets,
  createBaleModal,
  editBaleModal,
  createPocketModal,
  date,
  hour,
  travelImage,
  kmsTraveled,
  pocketsCollected,
  editPocketModal,
  editWeightPocketModal,
  gather,
});

export default rootReducer;
