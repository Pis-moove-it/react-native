import { actionTypes } from '../actions/GatherActions';

export const initialState = {
  date: false,
  km: 0,
  pocketsCollected: 0,
};

const gatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FINISH_TRAVEL:
      return {
        ...state,
        date: action.date,
        km: action.km,
        pocketsCollected: action.pocketsCollected,
      };
    default:
      return state;
  }
};

export default gatherReducer;
