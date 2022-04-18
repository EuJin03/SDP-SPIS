import React from "react";
import {
  createStyles,
  Image,
  Accordion,
  Grid,
  Col,
  Container,
  Title,
} from "@mantine/core";
import Header from "../components/Header";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
    height: "100vh",
    overflowY: "hidden",
  },

  container: {
    height: "100vh",
    display: "grid",
    placeItems: "center",
  },

  title: {
    marginBottom: theme.spacing.md,
    paddingLeft: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  item: {
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
  },
}));

const resourceFAQ =
  "Login to your account, go to the Resources tab. In there, choose the resource that you wish to download and it will open the document in a new window. You can choose to download the document in the new window.";
const forgotFAQ =
  "The forgot password feature is built using an email token token-based authentication method. However, the email provider service will charge for its service. Hence, if you are interested for a demo. Please reach out to TP061195@mail.apu.edu.my.";
const contactFAQ =
  "Please email to TP061195@mail.apu.edu.my for any further enquiries.";
const loginFAQ =
  "In order to register an account on the system, the user must acquire a formal APU registered email either as a student or lecturer.";
const profileFAQ =
  "Click on your name at the bottom left corner, click on your profile picture and upload your new picture. Your profile picture will be updated.";

const FAQ = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Header />
      <div className={classes.container}>
        <Container size="lg">
          <Grid id="faq-grid" gutter={50}>
            <Col span={12} md={6}>
              <Image
                src="https://res.cloudinary.com/eujin03/image/upload/v1650270621/image.b0c2306b_q02kiw.png"
                alt="Frequently Asked Questions"
              />
            </Col>
            <Col span={12} md={6}>
              <Title order={2} align="left" className={classes.title}>
                Frequently Asked Questions
              </Title>

              <Accordion iconPosition="right" initialItem={0}>
                <Accordion.Item
                  label="How do I get the login to the system?"
                  className={classes.item}
                >
                  {loginFAQ}
                </Accordion.Item>
                <Accordion.Item
                  label="Who can I contact to get help from?"
                  className={classes.item}
                >
                  {contactFAQ}
                </Accordion.Item>
                <Accordion.Item
                  label="What can I do if I forgot my password?"
                  className={classes.item}
                >
                  {forgotFAQ}
                </Accordion.Item>
                <Accordion.Item
                  label="I want to download the resources found in the website for offline usage. How do I do that?"
                  className={classes.item}
                >
                  {resourceFAQ}
                </Accordion.Item>
                <Accordion.Item
                  label="I want to change my profile picture, how do I do that?"
                  className={classes.item}
                >
                  {profileFAQ}
                </Accordion.Item>
              </Accordion>
            </Col>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default FAQ;
