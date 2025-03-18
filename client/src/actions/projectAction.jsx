import axios from 'axios';
import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/projectConstant";



// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Replace with your API endpoint
    const { data } = await axios.post(
      'http://localhost:5000/api/auth/register',
      userData,
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Replace with your API endpoint
    const { data } = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem('token', data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user
export const logout = () => async (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};