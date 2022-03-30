import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
} from "@mantine/core";
import styled from "styled-components";

// Components Import //
import { studentLogin } from "../actions/studentAction";

const Login = props => {
  const [type, setType] = useState("student");
  const form = useForm({
    initialValues: {
      studentID: "",
      email: "",
      password: "",
    },
  });

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

    dispatch(studentLogin());
  };

  return (
    <Container>
      <Paper
        radius="md"
        p="xl"
        withBorder
        {...props}
        style={{ height: "480px", width: "500px" }}
      >
        <Text size="xl" weight={500}>
          Welcome to SPIS, sign in as
        </Text>

        <Group grow mb="md" mt="md" style={{ margin: "20px 0" }}>
          <Button radius="sm" onClick={() => setType("student")}>
            Student
          </Button>
          <Button radius="sm" onClick={() => setType("staff")}>
            Staff
          </Button>
        </Group>

        <Divider
          label="Sign In"
          labelPosition="center"
          my="lg"
          style={{ margin: "40px 0" }}
        />

        <form onSubmit={form.onSubmit(e => e.preventDefault())}>
          <Group direction="column" grow>
            {type === "student" && (
              <TextInput
                required
                label="Student ID"
                placeholder="TP061195"
                value={form.values.studentID}
                onChange={event =>
                  form.setFieldValue("studentID", event.currentTarget.value)
                }
                error={form.errors.studentID && "Invalid Student ID"}
              />
            )}

            {type === "staff" && (
              <TextInput
                required
                label="Email"
                placeholder="eugene@staffemail.apu.edu.my"
                value={form.values.email}
                onChange={event =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid Email"}
              />
            )}

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={event =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
            />
          </Group>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="gray"
              // onClick={}
              size="xs"
            >
              "Don't have an account? Register"
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  place-items: center;
`;

export default Login;
