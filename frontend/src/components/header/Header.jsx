// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../action/userAction";
import React, { useState } from "react";

import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };
  return (
    <nav>
      <Link to="/" className="title">
        Admin Dashboard
      </Link>
      <h1>{user.name}</h1>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        <li>
          <Link to="/employee">Employee List</Link>
        </li>
        <li>
          <Link>
            <button onClick={() => logoutHandler()}>logout</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
