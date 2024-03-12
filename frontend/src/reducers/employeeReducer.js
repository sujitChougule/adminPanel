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
  EMPLOYEE_DETAILS_RESET,
  CLEAR_ERRORS,
  CREATE_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_RESET,
} from "../constants/employeeConstant";

// employee reducer
export const employeesReducer = (
  state = { employees: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        employees: [],
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    case GET_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const newEmployeeReducer = (
  state = { employee: {}, loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.employee,
        success: true, // Assuming success is always true upon successful creation
      };
    case CREATE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CREATE_EMPLOYEE_RESET:
      return {
        ...state,
        success: false,
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

// Reducer for delete and update

export const employeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_EMPLOYEE_FAIL:
    case UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_EMPLOYEE_RESET:
      return {
        ...state,
        isUpdated: false,
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

// employee DETAILS reducer
export const employeeDetailsReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        employee: {},
      };
    case EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.payload,
      };
    case EMPLOYEE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case EMPLOYEE_DETAILS_RESET:
      return {
        employee: {},
      };
    default:
      return state;
  }
};
