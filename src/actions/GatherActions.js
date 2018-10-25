import GatherController from '../controllers/GatherController';

export const actionTypes = {
  START_COLLECTION_REQUEST: 'START_COLLECTION_REQUEST',
  START_COLLECTION_ERROR: 'START_COLLECTION_ERROR',
  START_COLLECTION_REQUEST_SUCCESS: 'START_COLLECTION_REQUEST_SUCCESS',
};

const startCollection = () => ({
  type: actionTypes.START_COLLECTION_REQUEST,
});

const startCollectionError = error => ({
  type: actionTypes.START_COLLECTION_ERROR,
  error,
});

const startCollectionSuccess = collectionId => ({
  type: actionTypes.START_COLLECTION_REQUEST_SUCCESS,
  collectionId,
});

export const fetchStartCollection = token => async (dispatch) => {
  dispatch(startCollection());
  try {
    const { userData } = await GatherController.startCollection(token);
    dispatch(startCollectionSuccess(userData.id));
  } catch (error) {
    dispatch(startCollectionError(error.message));
  }
};
