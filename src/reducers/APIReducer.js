import { actionTypes } from '../actions/APIActions';

const initialState = {
    data: [],
    isFetching: false,
    error: false
};


export default data = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.API_REQUEST:
			return {
                ...state,
                data: [],
                isFetching: true
			};
		case actionTypes.API_ERROR:
			return {
				...state,
                error: true,
                isFetching: false
			};
		case actionTypes.REQUEST_SUCCESS:
			return {
                ...state,
                data: action.data,
                isFetching: false,
                error: false
            }
		default:
			return state;
	}
};