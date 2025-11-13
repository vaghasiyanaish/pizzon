import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../Config/firebaseConfig";

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_PROFILE,
} from "./actionTypes";

// ---------------------- LOGIN ----------------------
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      id: userCredential.user.uid,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email: userCredential.user.email,
      isAdmin: email.toLowerCase() === "admin@amazon.com",
    };

    localStorage.setItem("userInfo", JSON.stringify(user));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message || "Login failed" });
  }
};

// ---------------------- LOGIN WITH GOOGLE ----------------------
export const loginWithGoogle = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    const email = userCredential.user.email;
    const user = {
      id: userCredential.user.uid,
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email,
      isAdmin: email.toLowerCase() === "admin@amazon.com",
    };

    localStorage.setItem("userInfo", JSON.stringify(user));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message || "Google login failed" });
  }
};

// ---------------------- REGISTER ----------------------
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
      id: userCredential.user.uid,
      name,
      email: userCredential.user.email,
      isAdmin: false,
    };

    localStorage.setItem("userInfo", JSON.stringify(user));

    dispatch({ type: USER_REGISTER_SUCCESS, payload: user });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: user }); // Auto-login
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message || "Registration failed",
    });
  }
};

// ---------------------- LOGOUT ----------------------
export const logout = (navigate) => async (dispatch) => {
  try {
    await signOut(auth);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishlistItems");

    dispatch({ type: USER_LOGOUT });

    // ✅ Redirect to Sign In page after logout
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


// ---------------------- UPDATE PROFILE ----------------------
export const updateProfile = (userData) => async (dispatch, getState) => {
  try {
    const {
      auth: { userInfo },
    } = getState();

    const updatedUser = { ...userInfo, ...userData };
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));

    dispatch({ type: USER_UPDATE_PROFILE, payload: updatedUser });
  } catch (error) {
    console.error("Profile update failed:", error);
  }
};
