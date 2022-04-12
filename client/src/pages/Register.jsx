import { Anchor, Button, createStyles, Group, Stepper } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  CircleX,
  MailOpened,
  ShieldCheck,
  UserCheck,
  X,
} from "tabler-icons-react";
import { courseListAction } from "../actions/courseAction";
import { staffRegister } from "../actions/staffAction";
import { studentRegister } from "../actions/studentAction";
import {
  AccountDetails,
  PersonalDetails,
  RegisterForm,
} from "../components/RegisterForm";
import { showNotification } from "@mantine/notifications";
import Header from "../components/Header";

const Container = styled.div`
  height: 92vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const useStyles = createStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  container: {
    height: "92vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
}));

const Register = () => {
  const { classes } = useStyles();
  const [type, setType] = useState("student");
  const [active, setActive] = useState(0);
  const nextStep = e => {
    setActive(current => (current < 3 ? current + 1 : current));
    e.preventDefault();
  };
  const prevStep = e => {
    e.preventDefault();
    setActive(current => (current > 0 ? current - 1 : current));
  };

  const form = useForm({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      dob: new Date(),
      gender: "",
      course: type === "student" ? "" : [],
    },
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const userRegister = useSelector(state => state.userRegister);
  const { error, loading, userInfo: regInfo } = userRegister;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const courseList = useSelector(state => state.courseList);
  const { error: courseErr, courses } = courseList;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (regInfo || userInfo) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, userInfo, redirect, location, regInfo]);

  useEffect(() => {
    if (courses?.length === 0) dispatch(courseListAction());
  }, [courses, courseErr, dispatch]);

  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.container}>
        <form
          id="register"
          onSubmit={form.onSubmit(values => {
            type === "student"
              ? dispatch(
                  studentRegister(
                    values.fname,
                    values.lname,
                    values.email,
                    values.password,
                    values.confirmPassword,
                    values.gender,
                    values.dob.toISOString(),
                    values.course
                  )
                )
              : dispatch(
                  staffRegister(
                    values.fname,
                    values.lname,
                    values.email,
                    values.password,
                    values.confirmPassword,
                    values.gender,
                    values.dob.toISOString(),
                    values.course
                  )
                );
            error &&
              showNotification({
                autoClose: 4000,
                title: "Oops, something went wrong",
                message: "Please check your registration details!",
                color: "red",
                icon: <X />,
              });
          })}
        >
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              icon={<MailOpened size={18} />}
              mb="lg"
              label="First step"
              description="Create an account"
              color={
                error?.includes("email") ||
                error?.includes("Password") ||
                error?.includes("Exist") ||
                error?.includes("Empty")
                  ? "red"
                  : null
              }
              completedIcon={
                error?.includes("email") ||
                error?.includes("Password") ||
                error?.includes("Exist") ? (
                  <CircleX />
                ) : null
              }
            >
              <AccountDetails
                type={type}
                setType={setType}
                form={form}
                error={error}
              />
            </Stepper.Step>
            <Stepper.Step
              icon={<UserCheck size={18} />}
              mb="lg"
              label="Second step"
              description="Personal Details"
              color={
                error?.includes("name") ||
                error?.includes("Gender") ||
                !form.values.dob
                  ? "red"
                  : null
              }
              completedIcon={
                error?.includes("name") ||
                error?.includes("Gender") ||
                !form.values.dob ? (
                  <CircleX />
                ) : null
              }
            >
              {" "}
              <PersonalDetails form={form} error={error} />
            </Stepper.Step>
            <Stepper.Step
              icon={<ShieldCheck size={18} />}
              mb="lg"
              label="Final step"
              description="Select Course"
            >
              <RegisterForm
                form={form}
                type={type}
                courses={courses}
                loading={loading}
              />
            </Stepper.Step>
          </Stepper>
        </form>

        <Group position="center">
          {active === 0 ? null : (
            <Button
              type="button"
              size="md"
              variant="default"
              onClick={prevStep}
            >
              Back
            </Button>
          )}
          {active === 2 ? (
            <Button form="register" size="md" type="submit">
              Register
            </Button>
          ) : (
            <Button size="md" type="button" onClick={nextStep}>
              Next step
            </Button>
          )}
        </Group>
      </div>
    </div>
  );
};

export default Register;
