import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE
} from './actionTypes'

// ---------------------- LOGIN ----------------------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    // Simulated async login (you can later replace with Firebase call)
    setTimeout(() => {
      if (email.trim() && password.trim()) {
        const nameFromEmail = email.split('@')[0]
        const user = {
          id: 1,
          name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
          email,
          isAdmin: email.toLowerCase() === 'admin@amazon.com'
        }

        localStorage.setItem('userInfo', JSON.stringify(user))

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: user
        })
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: 'Invalid email or password'
        })
      }
    }, 1000)
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.message || 'Login failed'
    })
  }
}

// ---------------------- REGISTER ----------------------
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST })

    setTimeout(() => {
      if (name.trim() && email.trim() && password.trim()) {
        const user = {
          id: Date.now(),
          name,
          email,
          isAdmin: false
        }

        localStorage.setItem('userInfo', JSON.stringify(user))

        // Auto-login after register
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: user
        })

        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: user
        })
      } else {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: 'Please fill all fields properly'
        })
      }
    }, 1000)
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message || 'Registration failed'
    })
  }
}

// ---------------------- LOGOUT ----------------------
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('wishlistItems')

  dispatch({ type: USER_LOGOUT })
}

// ---------------------- UPDATE PROFILE ----------------------
export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    const {
      auth: { userInfo }
    } = getState()

    const updatedUser = { ...userInfo, ...userData }
    localStorage.setItem('userInfo', JSON.stringify(updatedUser))

    dispatch({
      type: USER_UPDATE_PROFILE,
      payload: updatedUser
    })
  } catch (error) {
    console.error('Profile update failed:', error)
  }
}
