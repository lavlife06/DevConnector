import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/signup', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const error = err.response.data.errors; // This errors will come from backend that we setted as errors.array

    if (error) {
      error.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
