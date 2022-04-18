import { createStyles, Paper, Text, ThemeIcon } from "@mantine/core";
import React from "react";
import { Books, ColorSwatch, Users } from "tabler-icons-react";
import Header from "../components/Header";
import Meta from "../components/Meta";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
    height: "100vh",
  },

  container: {
    marginTop: "40px",
    width: "100%",
    display: "grid",
    placeItems: "center",
  },
  card: {
    position: "relative",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,
    width: "80%",
    marginBottom: "40px",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
}));

const About = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Meta title="Welcome to SPIS | About Us" description="About Us" />
      <Header />
      <div className={classes.container}>
        <Text
          style={{ fontSize: "40px", marginBottom: "20px" }}
          weight={700}
          variant="gradient"
          gradient={{ from: "#EA536C", to: "#FC7B1B", deg: 45 }}
        >
          About Us
        </Text>
        <Paper withBorder radius="md" className={classes.card}>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ deg: 0, from: "pink", to: "orange" }}
          >
            <Users size={28} />
          </ThemeIcon>
          <Text size="xl" weight={500} mt="md">
            Who We Are
          </Text>
          <Text size="sm" mt="sm" color="dimmed">
            We are a team of lecturers who wish to develop a platform for
            students to have a closer look at their own academic performance.
            The problem with current systems are that they do not show students'
            grades in detail, hindering the students' efforts to further improve
            themselves academically.
          </Text>
        </Paper>
        <Paper withBorder radius="md" className={classes.card}>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ deg: 0, from: "pink", to: "orange" }}
          >
            <Books size={28} />
          </ThemeIcon>
          <Text size="xl" weight={500} mt="md">
            What We Do
          </Text>
          <Text size="sm" mt="sm" color="dimmed">
            With SPIS, we aim to provide a more detailed look into a student's
            academic journey, providing insights into their performance in each
            of the topics that they are studying. By giving them this mush
            insight and feedback, students now know where they are lacking and
            can work harder to improve.
          </Text>
        </Paper>
        <Paper withBorder radius="md" className={classes.card}>
          <ThemeIcon
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ deg: 0, from: "pink", to: "orange" }}
          >
            <ColorSwatch size={28} />
          </ThemeIcon>
          <Text size="xl" weight={500} mt="md">
            What We Hope to Become
          </Text>
          <Text size="sm" mt="sm" color="dimmed">
            Although the system currently have the capability to display the
            student's current progress, we hope to take it one step further and
            provide students with all the materials that they need in their
            academic journey. We aim to become a centralized repository of
            verified academic resources where students can find all the
            necessary materials in one place. Moreover, we also plan to use
            artificial intelligence to help predict student's future performance
            based on the grades and marks they achieve in the tasks given to
            them via the system. With this prediction capability, students can
            benchmark themselves against the system's calculations and work
            harder to meet or surpass those expectations.
          </Text>
        </Paper>
      </div>
    </div>
  );
};

export default About;
