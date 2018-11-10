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
import gather from './GatherReducer';
import collectionId from './GatherReducer';
import editPocketModal from './EditIdPocketModalReducer';
import editWeightPocketModal from './EditWeightPocketModalReducer';
import pockets from './PocketReducer';
import changeIsleState from './ChangeIsleStateModalReducer';

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
  gather,
  editPocketModal,
  editWeightPocketModal,
  collectionId,
  changeIsleState,
});

export default rootReducer;
