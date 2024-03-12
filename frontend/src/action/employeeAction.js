import axios from "axios";
import {
  GET_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_FAIL,
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/employeeConstant";
import { server } from "../store";

// action for get all employee
export const getEmployee = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: GET_EMPLOYEE_REQUEST,
    });
    const { data } = await axios.get(
      `${server}/api/v1/employees?keyword=${keyword}`
    );

    dispatch({
      type: GET_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EMPLOYEE_FAIL,
      error: error,
    });
  }
};

// action for CREATE employee

export const createEmployee = (employeeData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_EMPLOYEE_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "Application/json",
      },
    };
    console.log(employeeData);
    const { data } = await axios.post(
      `${server}/api/v1/employee/new`,
      employeeData,
      config
    );
    dispatch({
      type: CREATE_EMPLOYEE_SUCCESS,
      employee: data.item,
      success: data.success,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    dispatch({
      type: CREATE_EMPLOYEE_FAIL,
      error: error.response ? error.response.data.message : error.message, // Check if error has a response object and use its data.message if available
    });
  }
};

// action for get all employee
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_EMPLOYEE_REQUEST,
    });
    const { data } = await axios.delete(`${server}/api/v1/employee/${id}`);
    console.log(data);
    dispatch({
      type: DELETE_EMPLOYEE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: error.message,
    });
  }
};

// action for CREATE employee
export const updateEmployee =
  (employeeData, employeeId) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_EMPLOYEE_REQUEST,
      });
      const config = {
        headers: {
          "Content-type": "Application/json",
        },
      };

      const { data } = await axios.put(
        `${server}/api/v1/employee/${employeeId}`,
        employeeData,
        config
      );
      dispatch({
        type: UPDATE_EMPLOYEE_SUCCESS,
        payload: data.success,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload: error.message,
      });
    }
  };

// action for get employee details
export const employeeDetails = (employeeId) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${server}/api/v1/employee/${employeeId}`);
    dispatch({
      type: EMPLOYEE_DETAILS_SUCCESS,
      payload: data.item,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

// action for clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
