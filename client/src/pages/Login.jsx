import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components Import //
import { Header } from "./Login-styled";
import { studentLogin } from "../actions/studentAction";
import { staffLogin } from "../actions/staffAction";

const Login = () => {
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = event => {
    event.preventDefault();

    dispatch(staffLogin(studentID, password));
  };

  return (
    <>
      <div>
        {error && <h1>You fucked</h1>}
        {loading && <h1>You are loading</h1>}
        <h1>Hello</h1>
        <form>
          <label>Email</label>
          <input
            type="text"
            value={studentID}
            onChange={e => setStudentID(e.target.value)}
            placeholder="Email"
          ></input>
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></input>
        </form>
        <button onClick={submitHandler}>Login</button>
      </div>
    </>
  );
};

export default Login;
