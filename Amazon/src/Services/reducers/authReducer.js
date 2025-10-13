import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE,
} from '../actions/actionTypes'

// Get userInfo from localStorage if exists
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    // Login & Register request
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }

    // Login & Register success
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      localStorage.setItem('userInfo', JSON.stringify(action.payload)) // save to localStorage
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null
      }

    // Login & Register fail
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userInfo: null
      }

    // Update profile
    case USER_UPDATE_PROFILE:
      const updatedUser = { ...state.userInfo, ...action.payload }
      localStorage.setItem('userInfo', JSON.stringify(updatedUser)) // update localStorage
      return {
        ...state,
        userInfo: updatedUser
      }

    // Logout
    case USER_LOGOUT:
      localStorage.removeItem('userInfo') // remove from localStorage
      return {
        ...state,
        userInfo: null,
        error: null
      }

    default:
      return state
  }
}

export default authReducer
