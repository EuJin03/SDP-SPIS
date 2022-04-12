import { createStyles } from "@mantine/core";
import React from "react";
import Header from "../components/Header";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
    height: "100vh",
  },
  container: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    marginBottom: theme.spacing.md,
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      fontSize: 28,
      textAlign: "left",
    },
  },

  description: {
    textAlign: "center",

    [theme.fn.smallerThan("sm")]: {
      textAlign: "left",
    },
  },
}));

const FAQ = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Header />
    </div>
  );
};

export default FAQ;
