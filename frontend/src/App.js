import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginSignUp from "./components/user/LoginSignUp";
import { Header } from "./components/header/Header";
import { useEffect } from "react";
import store from "./store";
import { useSelector } from "react-redux";

import { loadUser } from "./action/userAction";
import Dashboard from "./components/dashboard/Dashboard";
import { Employee } from "./components/Employee/Employee";
import CreateEmployee from "./components/Employee/CreateEmployee";
import UpdateEmployee from "./components/Employee/UpdateEmployee";
function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Router>
          <Header />
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/employee" element={<Employee />} />
            <Route exact path="/employee/create" element={<CreateEmployee />} />
            <Route
              exact
              path="employee/update/:id"
              element={<UpdateEmployee />}
            />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route exact path="/*" element={<LoginSignUp />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
