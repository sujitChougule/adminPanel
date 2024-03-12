import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { userReducer } from "./reducers/userReducer";
import {
  employeeDetailsReducer,
  employeeReducer,
  employeesReducer,
  newEmployeeReducer,
} from "./reducers/employeeReducer";

const reducer = combineReducers({
  user: userReducer,
  employees: employeesReducer,
  newemployee: newEmployeeReducer,
  detailsemployee: employeeDetailsReducer,
  editemployee: employeeReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const server = "http://localhost:3000";
export default store;
