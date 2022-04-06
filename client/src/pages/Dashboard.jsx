import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Logout } from "tabler-icons-react";
import { viewCourseNameAction } from "../actions/courseAction";

const Dashboard = () => {
  const userRegister = useSelector(state => state.userRegister);
  const { userInfo: regInfo } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.studentID) {
      dispatch(viewCourseNameAction([userInfo.course]));
    }
    if (userInfo && !userInfo?.studentID) {
      dispatch(viewCourseNameAction(userInfo.course));
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo && !regInfo) {
      navigate("/login", { replace: true });
    }
  }, [userInfo, navigate, regInfo]);

  return (
    <>
      <Wrapper>
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

//  const dispatch = useDispatch();

//  const userDetails = useSelector(state => state.userDetails);
//  const { loading, error, user } = userDetails;
//  useEffect(() => {
//    if (!user)
//      userInfo?.studentID
//        ? dispatch(getStudentDetails())
//        : dispatch(getStaffDetails());

//    error &&
//      showNotification({
//        title: error,
//        message: "Could not load user details!",
//        color: "red",
//      });
//  }, [user, dispatch, userInfo, error]);
//  {
//    loading && <LoadingOverlay visible={true} />;
//  }
