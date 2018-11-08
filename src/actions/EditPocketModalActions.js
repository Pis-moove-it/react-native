import PocketController from '../controllers/PocketController';

export const actionTypes = {
  EDIT_POCKET: 'EDIT_POCKET',
  OPEN_EDIT_POCKET_MODAL: 'OPEN_EDIT_POCKET_MODAL',
  EDIT_POCKET_REQUEST: 'EDIT_POCKET_REQUEST',
  EDIT_POCKET_SUCCESS: 'EDIT_POCKET_SUCCESS',
  EDIT_POCKET_ERROR: 'EDIT_POCKET_ERROR',
  CLOSE_EDIT_POCKET_MODAL: 'CLOSE_EDIT_POCKET_MODAL',
};

const editRequest = () => ({
  type: actionTypes.EDIT_POCKET_REQUEST,
});

const editSuccess = pocketData => ({
  type: actionTypes.EDIT_POCKET_SUCCESS,
  pocketData,
});

const editError = error => ({
  type: actionTypes.EDIT_POCKET_ERROR,
  error,
});

const openModal = (pocket, serialNumber, weight, hasWeight) => ({
  type: actionTypes.OPEN_EDIT_POCKET_MODAL,
  pocket,
  serialNumber,
  weight,
  hasWeight,
});

export const openEditPocketModal = (pocket, serialNumber, weight, hasWeight) => (dispatch) => {
  dispatch(editRequest());
  dispatch(openModal(pocket, serialNumber, weight, hasWeight));
};

const closeModal = () => ({
  type: actionTypes.CLOSE_EDIT_POCKET_MODAL,
});

export const closeEditPocketModal = () => (dispatch) => {
  dispatch(closeModal());
};

export const editPocket = (token, pocket, serialNumber, weight, hasWeight) => async (dispatch) => {
  dispatch(editRequest());
  try {
    let { pocketData } = await PocketController.editPocketSerialNumber(token, pocket, serialNumber);

    if (hasWeight) {
      pocketData = await PocketController.editPocketWeight(token, pocket, weight);
    } else {
      pocketData = await PocketController.addPocketWeight(token, pocket, weight);
    }

    dispatch(editSuccess(pocketData));
    dispatch(closeModal());
  } catch (error) {
    dispatch(editError(error.message));
  }
};
