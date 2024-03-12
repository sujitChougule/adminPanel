import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillUnlock } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import "./LoginSignUp.scss";
// import Profile from "../images/profilePng.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../action/userAction";
// import { useAlert } from "react-alert";
// import Loader from "../layouts/Loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
    console.log("login form submitted");
  };
  const registerSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    dispatch(register({ name: name, email: email, password: password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      toast.success("Logged in successfully");
      navigate("/dashboard");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    //
    <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <HiOutlineMail />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
              />
            </div>
            <div className="loginPassword">
              <AiFillUnlock />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
              />
            </div>
            <Link to="/password/forgot">Forget Password ?</Link>
            <button type="submit" disabled={loading} className="loginBtn">
              {loading ? "Loading.." : "Login"}
            </button>
          </form>
          <form
            className="SignUpForm"
            ref={registerTab}
            encType="mutipart/form-data"
            onSubmit={registerSubmit}>
            <div className="SignUpName">
              <BiUser />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="SignUpEmail">
              <HiOutlineMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="SignUpPassword">
              <AiFillUnlock />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="signUpBtn">
              {loading ? "Loading.." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignUp;
