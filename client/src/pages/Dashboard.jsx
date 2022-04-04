import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudentDetails } from "../actions/studentAction";
import { getStaffDetails } from "../actions/staffAction";
import styled from "styled-components";
import { LoadingOverlay } from "@mantine/core";
import { Logout } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

const Dashboard = () => {
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo: regInfo } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo && !regInfo) {
      navigate("/login", { replace: true });
    }

    if (!user) {
      userInfo?.studentID
        ? dispatch(getStudentDetails())
        : dispatch(getStaffDetails());
    }
    error &&
      showNotification({
        title: error,
        message: "Could not load user details!",
        color: "red",
      });
  }, [dispatch, userInfo, user, navigate, error, regInfo]);

  return (
    <>
      <Wrapper>
        {loading && <LoadingOverlay visible={true} />}
        <ProfileContainer>
          <h1>I am dashboard</h1>
          <Logout />
        </ProfileContainer>
      </Wrapper>
    </>
  );
};

export default Dashboard;

const Wrapper = styled.div`
  padding: 30px 40px;
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #f1f1f1;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px;
  width: 100%;
  height: 20vh;
  border-radius: 13px;
  background-color: purple;
`;
