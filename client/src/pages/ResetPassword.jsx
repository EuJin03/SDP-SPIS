import {
  Button,
  createStyles,
  Divider,
  Group,
  Paper,
  TextInput,
  Title,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Check, X } from "tabler-icons-react";
import { staffResetPassword } from "../actions/staffAction";
import { studentResetPassword } from "../actions/studentAction";

const useStyles = createStyles(theme => ({
  wrapper: {
    height: "60vh",
    width: "100%",
    display: "grid",
    placeItems: "center",
  },

  container: {
    height: "400px",
    width: "400px",
  },
  title: {
    fontSize: 26,
    fontWeight: 700,
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

const ResetPassword = () => {
  const { token, user } = useParams();
  const { classes } = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userResetPassword = useSelector(state => state.userResetPassword);
  const { loading, success, error } = userResetPassword;

  useEffect(() => {
    if (success) {
      showNotification({
        title: "Password has been reset",
        message: "Please login again",
        color: "green",
        icon: <Check />,
      });
      navigate("/login", { replace: true });
    }

    if (error) {
      showNotification({
        title: "Password input invalid",
        message: "Please check your password syntax",
        color: "red",
        icon: <X />,
      });
    }
  }, [dispatch, error, navigate, success]);

  const resetPasswordHandler = () => {
    if (password !== "" && confirmPassword !== "") {
      if (user === "student") {
        dispatch(studentResetPassword(token, password, confirmPassword));
      }

      if (user === "staff") {
        dispatch(staffResetPassword(token, password, confirmPassword));
      }
    } else {
      showNotification({
        title: "Password Invalid",
        message: "Please check your input",
        color: "red",
        icon: <X />,
      });
    }
  };
  return (
    <div className={classes.wrapper}>
      <Paper
        withBorder
        shadow="md"
        p={30}
        radius="md"
        mt="xl"
        className={classes.container}
      >
        <Title className={classes.title} align="center">
          Password Reset
        </Title>
        <Divider my="lg" label="Reset" labelPosition="center" />

        <Group grow direction="column">
          <TextInput
            label="New Password"
            placeholder="New Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <TextInput
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            loading={loading}
            mt="md"
            variant="outline"
            onClick={() => resetPasswordHandler()}
          >
            Reset
          </Button>
        </Group>
      </Paper>
    </div>
  );
};

export default ResetPassword;
