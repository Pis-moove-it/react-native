import createBaleModalReducer, { initialState } from '../../reducers/CreateBaleModalReducer';
import { actionTypes } from '../../actions/CreateBaleModalActions';

describe('create bale modal reducer', () => {
  it('should return the same state', () => {
    expect(createBaleModalReducer(initialState, { users: [], type: 'not_an_action' })).toEqual(initialState);
  });

  it('should a state with isVisible in false', () => {
    expect(createBaleModalReducer(initialState, {type: actionTypes.CLOSE_CREATE_BALE_MODAL, isVisible: false })).toEqual({
      createBaleModalIsOpen: false,
    });
  });

  it('should a state with isVisible in true', () => {
    expect(createBaleModalReducer(initialState, {type: actionTypes.OPEN_CREATE_BALE_MODAL, isVisible: true })).toEqual({
      createBaleModalIsOpen: true,
    });
  });
});
