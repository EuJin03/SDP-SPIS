import React from "react";
import {
  createStyles,
  Header as HeaderComponent,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  UnstyledButton,
  ActionIcon,
  Image,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { BrandGithub, ChevronDown } from "tabler-icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles(theme => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },

  headerLeft: {
    display: "flex",
    alignItems: "flex-end",

    span: {
      marginLeft: "10px",
      fontSize: "28px",
      fontWeight: 500,
      fontFamily: "cursive",
    },
  },
}));

const links = [
  { link: "/features", label: "Features" },
  { link: "/about", label: "About Us" },
  { link: "/faq", label: "FAQ" },
];

export function Header() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  const items = links.map(link => {
    const menuItems = link.links?.map(item => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <UnstyledButton
              component={Link}
              to={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <ChevronDown size={12} />
              </Center>
            </UnstyledButton>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <UnstyledButton
        key={link.label}
        component={Link}
        to={link.link}
        className={classes.link}
      >
        {link.label}
      </UnstyledButton>
    );
  });

  return (
    <HeaderComponent height={56} style={{ width: "100%" }}>
      <Container>
        <div className={classes.inner}>
          <UnstyledButton
            component={Link}
            to="/login"
            className={classes.headerLeft}
          >
            <Image
              src="https://res.cloudinary.com/eujin03/image/upload/v1648631401/jwidyk56h48txmok3cho.png"
              alt="SPIS logo"
              withPlaceholder
              width={40}
              height={40}
            />
            <span>SPIS</span>
          </UnstyledButton>
          <Group spacing={5} className={classes.links}>
            {items}
            <ActionIcon
              mr="-xl"
              component="a"
              href="https://github.com/EuJin03/SDP-SPIS"
              rel="noopener noreferrer"
              target="_blank"
              variant="filled"
              size="sm"
              color="gray"
            >
              <BrandGithub size="16" />
            </ActionIcon>
          </Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
        </div>
      </Container>
    </HeaderComponent>
  );
}

export default Header;
