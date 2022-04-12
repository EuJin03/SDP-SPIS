import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Anchor,
  LoadingOverlay,
} from "@mantine/core";
import styled from "styled-components";

// Components Import //
import { studentLogin } from "../actions/studentAction";
import { staffLogin } from "../actions/staffAction";
import { Lock, User } from "tabler-icons-react";
import { Header } from "../components/Header";

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
  }, [navigate, redirect, userInfo, error]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Header />
      <Container>
        {loading && <LoadingOverlay visible={true} />}
        <Paper
          radius="md"
          p="xl"
          withBorder
          {...props}
          style={{
            height: "480px",
            width: "500px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          <Text size="xl" weight={500}>
            Welcome to SPIS, sign in as
          </Text>

          <Group grow mb="md" mt="md" style={{ margin: "20px 0" }}>
            <Button
              variant={type === "student" ? "light" : "outline"}
              radius="sm"
              onClick={() => {
                setType("student");
                form.setFieldValue("password", "");
              }}
            >
              Student
            </Button>
            <Button
              variant={type === "staff" ? "light" : "outline"}
              radius="sm"
              onClick={() => {
                setType("staff");
                form.setFieldValue("password", "");
              }}
            >
              Staff
            </Button>
          </Group>

          <Divider
            label={`Sign In as ${upperFirst(type)}`}
            labelPosition="center"
            my="lg"
            style={{ margin: "40px 0" }}
          />

          <form
            onSubmit={form.onSubmit(values => {
              type === "student" &&
                dispatch(studentLogin(values.studentID, values.password));

              type === "staff" &&
                dispatch(staffLogin(values.email, values.password));
            })}
          >
            <Group direction="column" grow>
              {type === "student" && (
                <TextInput
                  required
                  label="Student ID"
                  icon={<User size={16} />}
                  placeholder="TP061195"
                  value={form.values.studentID.toUpperCase()}
                  onChange={event =>
                    form.setFieldValue("studentID", event.currentTarget.value)
                  }
                />
              )}

              {type === "staff" && (
                <TextInput
                  required
                  label="Email"
                  icon={<User size={16} />}
                  placeholder="eugene@staffemail.apu.edu.my"
                  value={form.values.email}
                  onChange={event =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                />
              )}

              <Group position="apart" mb="-xs">
                <Text
                  component="label"
                  htmlFor="your-password"
                  size="sm"
                  weight={500}
                >
                  Password
                </Text>

                <Anchor
                  component={Link}
                  to="/forgot-password"
                  tabIndex={1}
                  sx={theme => ({
                    paddingTop: 2,
                    color:
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 4 : 6
                      ],
                    fontWeight: 500,
                    fontSize: theme.fontSizes.xs,
                  })}
                >
                  Forgot your password?
                </Anchor>
              </Group>
              <PasswordInput
                required
                icon={<Lock size={16} />}
                placeholder="Your password"
                error={error ? "Password incorrect" : null}
                value={form.values.password}
                onChange={event =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
              />
            </Group>

            <Group position="apart" mt="xl">
              <Anchor
                component={Link}
                to={redirect ? `/register?redirect=${redirect}` : `/register`}
                tabIndex={1}
                type="button"
                sx={theme => ({
                  paddingTop: 18,
                  color:
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ],
                  fontWeight: 500,
                  fontSize: theme.fontSizes.xs,
                })}
              >
                Don't have an account? Register
              </Anchor>
              <Button type="submit">Sign In</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  height: 90vh;
  width: 100%;
  display: grid;
  place-items: center;
`;

export default Login;
