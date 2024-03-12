import React from "react";
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Welcome to dashboard {user.name}</h1>
    </div>
  );
};

export default Dashboard;
