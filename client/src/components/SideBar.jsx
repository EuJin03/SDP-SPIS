import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Group, createStyles, Text } from "@mantine/core";
import { Writing, Home, Books, Message } from "tabler-icons-react";
import UserButton from "./UserButton";
import { Link } from "react-router-dom";

const studentData = [
  { label: "Dashboard", icon: Home, url: "/" },
  {
    label: "Assignments",
    icon: Writing,
    url: "/assignments",
  },
  { label: "Resources", icon: Books, url: "/resources" },
  { label: "Messages", icon: Message, url: "/messages" },
];

const useStyles = createStyles(theme => ({
  navbar: {
    padding: "16px 0 0 !important",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
  },

  header: {
    padding: "0 16px 16px",
    marginLeft: "2px",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  link: {
    padding: "20px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    height: 64,
    lineHeight: "44px",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },

    span: {
      marginLeft: "10px",
    },
  },

  linkActive: {
    "&, &:hover": {
      borderLeftColor:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
      color: theme.white,
    },
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const SideBar = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [activeLink, setActiveLink] = useState("Dashboard");
  const { classes, cx } = useStyles();

  const links = studentData.map(link => (
    <Text
      className={cx(classes.link, {
        [classes.linkActive]: activeLink === link.label,
      })}
      component={Link}
      to={link.url}
      onClick={() => {
        setActiveLink(link.label);
      }}
      key={link.label}
    >
      <link.icon />
      <span>{link.label}</span>
    </Text>
  ));

  if (!userInfo) return null;

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={`${classes.navbar}`}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <h1>Tuition System</h1>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links}>
        <div>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image={userInfo?.image !== "" ? userInfo?.image : null}
          name={userInfo?.lname + " " + userInfo?.fname}
          email={userInfo?.email || ""}
        />
      </Navbar.Section>
    </Navbar>
  );
};

export default SideBar;
