import { Button, Group, Stepper } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MailOpened, ShieldCheck, UserCheck } from "tabler-icons-react";
import { studentRegister } from "../actions/studentAction";
import {
  AccountDetails,
  PersonalDetails,
  RegisterForm,
} from "../components/RegisterForm";

const Register = props => {
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
      course: "620efc959828b44e6e912d86",
    },
    validate: {
      studentID: value => /^TP[0-9]{6}/.test(value),
      email: value => /apu.edu.my$/.test(value),
      password: value => value.length >= 6,
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector(state => state.userRegister);
  const { error, userInfo: test } = userRegister;

  useEffect(() => {
    if (userInfo) navigate("/", { replace: true });
  });

  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <Container>
      <form
        id="register"
        onSubmit={form.onSubmit(
          values => console.log(values)
          // dispatch(
          //   studentRegister(
          //     values.fname,
          //     values.lname,
          //     values.email,
          //     values.password,
          //     values.confirmPassword,
          //     values.gender,
          //     values.dob,
          //     values.course
          //   )
          // )
        )}
      >
        <Stepper active={active} onStepClick={setActive} breakpoint="sm">
          <Stepper.Step
            icon={<MailOpened size={18} />}
            mb="lg"
            label="First step"
            description="Create an account"
          >
            <AccountDetails type={type} setType={setType} form={form} />
          </Stepper.Step>
          <Stepper.Step
            icon={<UserCheck size={18} />}
            mb="lg"
            label="Second step"
            description="Personal Details"
          >
            {" "}
            <PersonalDetails form={form} />
          </Stepper.Step>
          <Stepper.Step
            icon={<ShieldCheck size={18} />}
            mb="lg"
            label="Final step"
            description="Select Course"
          >
            <RegisterForm form={form} />
          </Stepper.Step>
        </Stepper>
      </form>

      <Group position="center">
        {active === 0 ? null : (
          <Button type="button" size="md" variant="default" onClick={prevStep}>
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
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Register;
