import React from "react";
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
} from "@mantine/core";
import {
  Book2,
  Books,
  ChartInfographic,
  Notes,
  User,
} from "tabler-icons-react";
import Header from "../components/Header";
import Meta from "../components/Meta";

export function Feature({ icon: Icon, title, description }) {
  const theme = useMantineTheme();
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: 20, height: 20 }} />
      </ThemeIcon>
      <Text style={{ marginTop: theme.spacing.sm, marginBottom: 7 }}>
        {title}
      </Text>
      <Text size="sm" color="dimmed" style={{ lineHeight: 1.6 }}>
        {description}
      </Text>
    </div>
  );
}

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
    height: "100vh",
    overflowY: "hidden",
  },
  container: {
    display: "grid",
    placeItems: "center",
    width: "100%",
    height: "86vh",
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

const data = [
  {
    icon: ChartInfographic,
    title: "Detailed Graphs",
    description:
      "Help users in their academic with the detailed graphs that are available in the website. With detailed information on their academic performance, students and lecturers can analyze their academic performance.",
  },
  {
    icon: Book2,
    title: "Assignments",
    description:
      "SPIS allows lecturer to assign tasks for students and specify due date.Improve the lecture process as the tasks can hand out virtually and grade upon submissions. Students are able to benefit as they able to hand in softcopy and view grades online.",
  },
  {
    icon: Books,
    title: "Resources",
    description:
      "SPIS allow lecturer to archieve their lecture notes and study material on the library that SPIS are prepared for everyone. Lecturers are able to upload materials accordingly. Meanwhile, students are able to access either for revision or additional knowledge.",
  },
  {
    icon: User,
    title: "Profile customization",
    description:
      "SPIS allow users to customize their profile on a certain extends. Such as profile images, account activity, course changes, edit password, and more in the future.",
  },
  {
    icon: Notes,
    title: "Reminder",
    description:
      "Help users to remember the tasks that already assigned by using Reminder. Reminder can be used to mark down due dates. It help students and lecturer to manage their activity and time.",
  },
];

const title = "STUDENT PERFORMANCE IMPROVEMENT SYSTEM";
const description =
  "Student Performance Improvement System (SPIS) is a web-based platform that is built using NodeJS and ReactJS. SPIS provides lecturers the ability to assign tasks and resources to students meanwhile monitoring their performance based on grades.";

export function Features() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const features = data.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <div className={classes.wrapper}>
      <Meta
        title="Welcome to SPIS | Features"
        description="Features in SPIS Tuition System"
      />
      <Header />
      <div className={classes.container}>
        <Container>
          <Title className={classes.title}>{title}</Title>

          <Container size={560} p={0}>
            <Text size="sm" className={classes.description}>
              {description}
            </Text>
          </Container>

          <SimpleGrid
            mt={60}
            cols={3}
            spacing={theme.spacing.xl * 2}
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "xl" },
              { maxWidth: 755, cols: 1, spacing: "xl" },
            ]}
          >
            {features}
          </SimpleGrid>
        </Container>
      </div>
    </div>
  );
}

export default Features;
