import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, X } from "tabler-icons-react";
import { viewCourseNameAction } from "../actions/courseAction";
import {
  LoadingOverlay,
  UnstyledButton,
  createStyles,
  Box,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { logout } from "../actions/studentAction";

const useStyles = createStyles(theme => ({
  header: {
    padding: "30px 40px",
    position: "relative",
    minHeight: "100vh",
    width: "100%",
  },

  profile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "30px",
    width: "100%",
    height: "20vh",
    borderRadius: "13px",
    backgroundColor: "purple",
  },
}));

const Dashboard = () => {
  const { classes, cx } = useStyles();

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo: regInfo } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const courseNames = useSelector(state => state.courseNames);
  const { loading, error: courseNameError } = courseNames;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo?.studentID) {
      dispatch(viewCourseNameAction([userInfo.course]));
    }
    if (userInfo && !userInfo?.studentID) {
      dispatch(viewCourseNameAction(userInfo.course));
    }

    if (courseNameError) {
      showNotification({
        autoClose: 4000,
        title: "Oops, something went wrong",
        message: "Please check your internet connections!",
        color: "red",
        icon: <X />,
      });
    }
  }, [courseNameError, dispatch, userInfo]);

  useEffect(() => {
    if (!userInfo && !regInfo) {
      navigate("/login", { replace: true });
    }
  }, [userInfo, navigate, regInfo]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Box className={classes.header}>
        {loading && <LoadingOverlay visible={true} />}
        <Box className={classes.profile}>
          <h1>I am dashboard</h1>
          <UnstyledButton onClick={logoutHandler}>
            <Logout size={28} color={"#339AF0"} />
          </UnstyledButton>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

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
