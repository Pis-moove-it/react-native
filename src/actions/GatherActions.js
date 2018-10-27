export const actionTypes = {
  FINISH_TRAVEL: 'FINISH_TRAVEL',
};

const travelFinished = (date, km, pocketsCollected) => ({
  type: actionTypes.FINISH_TRAVEL,
  date,
  km,
  pocketsCollected,
});

export const finishTravel = (date, km, pocketsCollected) => (dispatch) => {
  dispatch(travelFinished(date, km, pocketsCollected));
};
