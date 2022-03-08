import React from "react";
import { Link } from "react-router-dom";

// Components Import //

import * as S from "./Login-styled";

const Login = () => {
  const submitHandler = event => {
    event.preventDefault();
  };

  return (
    <S.LoginPage>
      <S.Header>
        <Link to="/">
          <span>Student Performance Improvement System</span>
        </Link>
      </S.Header>
      <S.FormSection>
        <form onSubmit={submitHandler}>
          <span className="login-title">Login</span>
          <label className="input-title" htmlFor="text">
            APKey
          </label>
          <input type="APKey" name="APKey" placeholder="Ex: TP012345" />
          <label className="input-title" htmlFor="password">
            Password
          </label>
          <input type="password" name="password" placeholder="Password" />
          <S.Wrapper>
            <div>
              <input
                type="checkbox"
                id="remember-me-checkbox"
                name="remember-me"
                value=""
              />
              <label className="remember-me-label" htmlFor="remember-me">
                {" "}
                Remember Me
              </label>
            </div>
            <Link className="forgot-password" to="/credentials-reset">
              Forgot password?
            </Link>
          </S.Wrapper>
          <button className="btn-short">Log In</button>
        </form>
      </S.FormSection>
    </S.LoginPage>
  );
};

export default Login;
