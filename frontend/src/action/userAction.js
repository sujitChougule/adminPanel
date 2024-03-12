import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_ERROR,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/userConstants";
import axios from "axios";
import { server } from "../store";
// login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${server}/api/v1/login`,
      { email, password },
      config
    );
    const token = data.token;
    const setCookie = (name, value, days) => {
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + days * 24 * 60 * 60 * 1000
      );
      const expires = "expires=" + expirationDate.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };
    // Set the token in a cookie
    setCookie("token", token, 7);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

// Register

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${server}/api/v1/register`,
      userData,
      config
    );
    const token = data.token;
    const setCookie = (name, value, days) => {
      const expirationDate = new Date();
      expirationDate.setTime(
        expirationDate.getTime() + days * 24 * 60 * 60 * 1000
      );
      const expires = "expires=" + expirationDate.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    };
    // Set the token in a cookie
    setCookie("token", token, 7);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user || {} });
  } catch (error) {
    // console.error("Registration failed:", error);
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};

// load User

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`${server}/api/v1/me`, {
      withCredentials: true,
    });
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user || {} });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });
  }
};
// logout user

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${server}/api/v1/logout`, {
      withCredentials: true,
    });
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response?.data?.message || "Logout Failed",
    });
  }
};
