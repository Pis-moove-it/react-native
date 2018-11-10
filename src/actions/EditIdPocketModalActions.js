import PocketController from '../controllers/PocketController';
import { setPockets } from './PocketActions';

export const actionTypes = {
  EDIT_POCKET_SERIAL: 'EDIT_POCKET_SERIAL',
  OPEN_EDIT_POCKET_SERIAL_MODAL: 'OPEN_EDIT_POCKET_SERIAL_MODAL',
  EDIT_POCKET_SERIAL_REQUEST: 'EDIT_POCKET_SERIAL_REQUEST',
  EDIT_POCKET_SERIAL_SUCCESS: 'EDIT_POCKET_SERIAL_SUCCESS',
  EDIT_POCKET_SERIAL_ERROR: 'EDIT_POCKET_SERIAL_ERROR',
  CLOSE_EDIT_POCKET_SERIAL_MODAL: 'CLOSE_EDIT_POCKET_SERIAL_MODAL',
};

const editRequest = () => ({
  type: actionTypes.EDIT_POCKET_SERIAL_REQUEST,
});

const editSuccess = pocketData => ({
  type: actionTypes.EDIT_POCKET_SERIAL_SUCCESS,
  pocketData,
});

const editError = error => ({
  type: actionTypes.EDIT_POCKET_SERIAL_ERROR,
  error,
});

const openModal = (pocket, serialNumber) => ({
  type: actionTypes.OPEN_EDIT_POCKET_SERIAL_MODAL,
  pocket,
  serialNumber,
});

export const openEditIdPocketModal = (pocket, serialNumber) => (dispatch) => {
  dispatch(editRequest());
  dispatch(openModal(pocket, serialNumber));
};

const closeModal = () => ({
  type: actionTypes.CLOSE_EDIT_POCKET_SERIAL_MODAL,
});

export const closeEditIdPocketModal = () => (dispatch) => {
  dispatch(closeModal());
};

export const editPocketSerialNumber = (token, pocket, serialNumber, pockets) => async (dispatch) => {
  dispatch(editRequest());
  try {
    const { pocketData } = await PocketController.editPocketSerialNumber(
      token,
      pocket,
      serialNumber,
    );

    const pocketsArray = [];
    pockets.map((element) => {
      if (element.id !== pocketData.id) pocketsArray.push(element);
      else pocketsArray.push(pocketData);
    });

    dispatch(setPockets(pocketsArray));
    dispatch(editSuccess(pocketData));
  } catch (error) {
    dispatch(editError(error.message));
  }
};
