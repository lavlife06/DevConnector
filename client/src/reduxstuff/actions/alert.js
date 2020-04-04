import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

// We can use => dispatch => because of thunk middleware
export const setAlert = (msg, alertType) => (dispatch) => {
  const id = uuid.v5();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
