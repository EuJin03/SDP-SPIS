import React from "react";
import { Link } from "react-router-dom";

// Components Import //

import { Header } from "./Login-styled";

const Login = () => {
  const submitHandler = event => {
    event.preventDefault();
  };

  return (
    <>
      <Header>hello world</Header>
    </>
  );
};

export default Login;
