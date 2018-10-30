import GatherController from '../controllers/GatherController';

export const actionTypes = {
  START_COLLECTION: 'START_COLLECTION',
  START_COLLECTION_REQUEST: 'START_COLLECTION_REQUEST',
  START_COLLECTION_SUCCESS: 'START_COLLECTION_SUCCESS',
  START_COLLECTION_ERROR: 'START_COLLECTION_ERROR',
  ADD_POCKET_REQUEST: 'ADD_POCKET_REQUEST',
  ADD_POCKET_SUCCESS: 'ADD_POCKET_SUCCESS',
};

const startCollectionRequest = () => ({
  type: actionTypes.START_COLLECTION_REQUEST,
});

const startCollectionSuccess = identifier => ({
  type: actionTypes.START_COLLECTION_SUCCESS,
  identifier,
});

const startCollectionError = error => ({
  type: actionTypes.START_COLLECTION_ERROR,
  error,
});

const addPocketRequest = () => ({
  type: actionTypes.ADD_POCKET_REQUEST,
});

const addPocketSuccess = () => ({
  type: actionTypes.ADD_POCKET_SUCCESS,
});

const addPocketError = error => ({
  type: actionTypes.START_COLLECTION_ERROR,
  error,
});

export const startCollection = token => async (dispatch) => {
  dispatch(startCollectionRequest());
  try {
    const { identifier } = await GatherController.startCollection(token);
    dispatch(startCollectionSuccess(identifier));
  } catch (error) {
    dispatch(startCollectionError(error.message));
  }
};

export const addPocketToCollection = (
  token,
  routeId,
  collectionId,
  pocketsArray,
) => async (dispatch) => {
  dispatch(addPocketRequest());
  try {
    await GatherController.addPocketToCollection(token, routeId, collectionId, pocketsArray);
    dispatch(addPocketSuccess());
  } catch (error) {
    dispatch(addPocketError(error.message));
  }
};
