import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetails } from "../actions/studentAction";
import Login from "./Login";

const Dashboard = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      return <Login />;
    } else {
      if (!user) {
        dispatch(getStudentDetails("profile"));
      }
    }
  }, [dispatch, userInfo, user]);

  if (!userInfo) return <Login />;

  return (
    <>
      <h1>hello</h1>
    </>
  );
};

export default Dashboard;
