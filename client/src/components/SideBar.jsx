import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Group,
  createStyles,
  Text,
  Image,
  UnstyledButton,
} from "@mantine/core";
import {
  Writing,
  Home,
  Books,
  Book,
  Message,
  Logout,
} from "tabler-icons-react";
import UserButton from "./UserButton";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../actions/studentAction";

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

const adminData = [
  { label: "Dashboard", icon: Home, url: "/" },
  {
    label: "Assignments",
    icon: Writing,
    url: "/assignments",
  },
  { label: "Resources", icon: Books, url: "/resources" },
  { label: "Course", icon: Book, url: "/course" },
  { label: "Messages", icon: Message, url: "/messages" },
];

const useStyles = createStyles(theme => ({
  navbar: {
    position: "sticky",
    top: 0,
    left: 0,
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

  headerBox: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  headerLeft: {
    userSelect: "none",
    display: "flex",
    alignItems: "flex-end",

    span: {
      marginLeft: "10px",
      fontSize: "32px",
      fontWeight: 600,
    },
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
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const [activeLink, setActiveLink] = useState("Dashboard");
  const { classes, cx } = useStyles();

  const links = (userInfo && userInfo.isAdmin ? adminData : studentData).map(
    link => (
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
    )
  );

  const location = useLocation().pathname;
  if (
    !userInfo ||
    location.includes("register") ||
    location.includes("login") ||
    location.includes("error") ||
    location.includes("forgot")
  )
    return null;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar
      height="100vh"
      width={{ sm: 300 }}
      p="md"
      className={`${classes.navbar}`}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart" className={classes.headerBox}>
          <div className={classes.headerLeft}>
            <Image
              src="https://res.cloudinary.com/eujin03/image/upload/v1648631401/jwidyk56h48txmok3cho.png"
              alt="SPIS logo"
              withPlaceholder
              width={40}
              height={40}
            />
            <span>SPIS</span>
          </div>
          <div className={classes.headerRight}>
            <UnstyledButton onClick={logoutHandler}>
              <Logout size={28} color={"#339AF0"} />
            </UnstyledButton>
          </div>
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
