import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE,
} from '../actions/actionTypes';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };

    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userInfo: null,
      };

      case USER_UPDATE_PROFILE: {
      const updatedUser = { ...state.userInfo, ...action.payload };
      localStorage.setItem('userInfo', JSON.stringify(updatedUser));
      return {
        ...state,
        userInfo: updatedUser,
      };
    }
    
    case USER_LOGOUT:
      localStorage.removeItem('userInfo');
      return {
        ...state,
        userInfo: null,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
