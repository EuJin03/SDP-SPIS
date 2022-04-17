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
  Avatar,
  Text,
  Grid,
  Modal,
  Divider,
  Group,
  Button,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { logout } from "../actions/studentAction";
import Reminder from "../components/Reminder";
import ResultChart from "../components/ResultChart";
import AssignmentProgress from "../components/AssignmentProgress";
import CourseCard from "../components/CourseCard";
import StaffCourseCard from "../components/StaffCourseCard";
import StaffPieChart from "../components/StaffPieChart";

const useStyles = createStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 40px",
    position: "relative",
    minHeight: "100vh",
    width: "100%",
  },

  profile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    width: "100%",
    borderRadius: "13px",
    border: "2px solid #f1f1f1",
    flex: "0.1",
  },

  profileCard: {
    display: "flex",
    flex: "0.98",
    alignItems: "center",
  },
  profileAvatar: {
    borderRadius: "50%",
    border: "4px solid #339AF0",
    marginRight: "20px",
  },

  logout: {
    flex: "0.02",
    padding: 8,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    transition: "all 0.3s ease",

    "&:hover": {
      backgroundColor: "#f1f1f1",
    },
  },

  container: {
    flex: "0.9",
    marginTop: "18px",
    width: "100%",
  },

  col: {
    margin: "14px",
    border: "1px solid #f1f1f1",
    borderRadius: "13px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    padding: "26px 30px",
    minHeight: "37vh",
    maxHeight: "37vh",
    overflow: "hidden",
  },
}));

const Dashboard = () => {
  const { classes } = useStyles();
  const [remove, setRemove] = useState(false);

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo: regInfo } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const courseNames = useSelector(state => state.courseNames);
  const { loading, error: courseNameError, courseInfo } = courseNames;

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
      <Modal
        opened={remove}
        onClose={() => setRemove(false)}
        title="Are you sure to logout?"
        centered
        size="xs"
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Divider my="lg" />
        <Group position="right">
          <Button size="xs" onClick={() => logoutHandler()}>
            Confirm
          </Button>
          <Button onClick={() => setRemove(false)} size="xs" variant="outline">
            Cancel
          </Button>
        </Group>
      </Modal>
      <Box className={classes.wrapper}>
        {loading && <LoadingOverlay visible={true} />}
        {userInfo && courseInfo && (
          <>
            <Box className={classes.profile}>
              <Box className={classes.profileCard}>
                <Avatar
                  className={classes.profileAvatar}
                  src={userInfo.image}
                  size="xl"
                />
                <Box>
                  <Text size="lg" weight={500} color="#339AF0">
                    {userInfo.lname.concat(" ", userInfo.fname).toUpperCase()}
                  </Text>
                  {userInfo?.studentID ? (
                    <Text color="dimmed" size="sm">
                      {userInfo.studentID} | {courseInfo[0]?.courseName}
                    </Text>
                  ) : (
                    <Text color="dimmed" size="sm">
                      {userInfo.email}
                    </Text>
                  )}
                </Box>
              </Box>
              <UnstyledButton
                className={classes.logout}
                onClick={() => setRemove(true)}
              >
                <Logout className={classes.logoutIcon} color="red" />
              </UnstyledButton>
            </Box>
            <Grid grow="true" columns={12} className={classes.container}>
              <Grid.Col md={4} className={classes.col}>
                {userInfo?.studentID ? (
                  <AssignmentProgress />
                ) : (
                  <StaffPieChart />
                )}
              </Grid.Col>
              <Grid.Col md={4} className={classes.col}>
                {userInfo?.studentID ? <ResultChart /> : <h1>idk</h1>}
              </Grid.Col>
              <Grid.Col md={4} className={classes.col}>
                {userInfo?.studentID ? <CourseCard /> : <StaffCourseCard />}
              </Grid.Col>
              <Grid.Col md={4} className={classes.col}>
                <Reminder />
              </Grid.Col>
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
