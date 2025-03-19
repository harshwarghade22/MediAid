import { CLEAR_ERRORS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/projectConstant";

// Initialize auth state based on token presence
// But DON'T immediately assume authenticated just because token exists
const token = localStorage.getItem('token');

const initialState = {
    user: null,
    loading: token ? true : false, // Start loading if token exists, to validate it
    isAuthenticated: false, // Don't assume authenticated until token validated with server
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
          error: null,
        };
  
      case REGISTER_FAIL:
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case LOGOUT:
        // Clear localStorage token on logout
        localStorage.removeItem('token');
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: null
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };