export const actionTypes = {
  OPEN_EDIT_WEIGHT_POCKET_MODAL: 'OPEN_EDIT_WEIGHT_POCKET_MODAL',
  CLOSE_EDIT_WEIGHT_POCKET_MODAL: 'CLOSE_EDIT_WEIGHT_POCKET_MODAL',
};

const openEditWeightPocketModalType = pocketHasWeight => ({
  type: actionTypes.OPEN_EDIT_WEIGHT_POCKET_MODAL,
  isVisible: true,
  pocketHasWeight,
});

export const openEditWeightPocketModal = pocketHasWeight => (dispatch) => {
  dispatch(openEditWeightPocketModalType(pocketHasWeight));
};

const closeEditWeightPocketModalType = () => ({
  type: actionTypes.CLOSE_EDIT_WEIGHT_POCKET_MODAL,
  isVisible: false,
});

export const closeEditWeightPocketModal = () => (dispatch) => {
  dispatch(closeEditWeightPocketModalType());
};
