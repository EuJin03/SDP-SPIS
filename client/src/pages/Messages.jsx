import React from "react";
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
    height: "100vh",
    display: "grid",
    placeItems: "center",
  },
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export const Messages = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A <span className={classes.highlight}>modern</span> React App
            </Title>
            <Text color="dimmed" mt="md">
              Messaging component might not be able to craft within the short
              assignment time frame. Please accept my sincere apology! <br />
              However, please enjoy your stay within the app that I built with
              my groupmates.
            </Text>

            <Group mt={30}>
              <Button
                component={Link}
                to="/"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Dashboard
              </Button>
              <Button
                component="a"
                href="https://github.com/EuJin03/SDP-SPIS"
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>
            </Group>
          </div>
          <Image
            src="https://res.cloudinary.com/eujin03/image/upload/v1649719081/image_wkp8qz.png"
            withPlaceholder
            className={classes.image}
          />
        </div>
      </Container>
    </div>
  );
};

export default Messages;
