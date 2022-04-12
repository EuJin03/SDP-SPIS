import React, { useEffect, useState } from "react";

import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
  Alert,
} from "@mantine/core";
import { AlertCircle, ArrowLeft, Check, Mail, X } from "tabler-icons-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { staffForgotPassword } from "../actions/staffAction";
import { studentForgotPassword } from "../actions/studentAction";
import { showNotification } from "@mantine/notifications";
import { USER_FORGOT_PASSWORD_RESET } from "../constants/userConstant";

const useStyles = createStyles(theme => ({
  wrapper: {
    height: "60vh",
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export const ForgotPassword = () => {
  const { classes } = useStyles();
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const userForgotPassword = useSelector(state => state.userForgotPassword);
  const { loading, success, error } = userForgotPassword;

  useEffect(() => {
    if (success) {
      showNotification({
        title: "Request sent",
        message: "An email with the reset token has been sent to your email",
        color: "green",
        icon: <Check />,
        disallowClose: true,
        autoClose: 1000 * 60,
      });
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    }

    if (error) {
      showNotification({
        title: "Email is not found",
        message: "Please check your email",
        color: "red",
        icon: <X />,
      });
      dispatch({ type: USER_FORGOT_PASSWORD_RESET });
    }
  }, [dispatch, error, success]);

  const forgotPasswordHandler = () => {
    let valid = false;
    const staffRegEx = /^[a-zA-Z0-9._%+-]+@staffemail.apu.edu.my$/;
    if (email.match(staffRegEx)) {
      valid = true;
      dispatch(staffForgotPassword(email));
    }

    const studentRegEx = /^TP[0-9]+@mail.apu.edu.my$/;
    if (email.match(studentRegEx)) {
      valid = true;
      dispatch(studentForgotPassword(email));
    }

    if (!valid) {
      showNotification({
        title: "Email is invalid",
        message: "Please check your email",
        color: "red",
        icon: <X />,
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <Container size={460} my={30}>
        <Alert
          mb="xl"
          icon={<AlertCircle size={16} />}
          title="I am too broke :("
          color="red"
        >
          {
            "I can't afford to pay for an Email Provider Service. However, this feature is actually developed. If you are interested, please contact me for a demo. "
          }
          <Anchor
            href="https://www.linkedin.com/in/eugene-tin-0603/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Mail size="12" />
          </Anchor>
        </Alert>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Your email"
            placeholder="eugene@staffemail.apu.edu.my"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5} component={Link} to="/login">
                  Back to login page
                </Box>
              </Center>
            </Anchor>
            <Button
              loading={loading}
              className={classes.control}
              onClick={() => forgotPasswordHandler()}
            >
              Reset password
            </Button>
          </Group>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
