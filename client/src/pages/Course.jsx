import {
  ActionIcon,
  Box,
  Button,
  Card,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  ScrollArea,
  Switch,
  Text,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Book,
  Book2,
  Check,
  Edit,
  FilePlus,
  SquareMinus,
  SquarePlus,
} from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { courseListAction } from "../actions/courseAction";

const useStyles = createStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    position: "relative",
  },
  header: {
    flex: "0.16",
    width: "70%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  rightHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "33px",
  },

  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: "20px",
  },

  item: {
    "& + &": {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },
  },

  content: {
    width: "70%",
    flex: "0.84",
  },

  cardHeader: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
}));

const Course = () => {
  const { classes } = useStyles();
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [toggle, setToggle] = useState({ id: "", status: false });
  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();

  const courseList = useSelector(state => state.courseList);
  const { loading, courses, error } = courseList;

  useEffect(() => {
    if (!courses.courseList) {
      dispatch(courseListAction());
    }

    if (error) {
      showNotification({
        title: "Sad",
        message: "Courses cannot be found",
        color: "green",
        icon: <Check />,
      });
    }
  }, [courses.courseList, dispatch, error]);

  const items = courses?.courseList
    ? courses.courseList.map(item => (
        <Card
          key={item._id}
          withBorder
          radius="md"
          p="xl"
          className={classes.card}
        >
          <Box className={classes.cardHeader}>
            <Box>
              <Text size="lg" className={classes.title} weight={500}>
                {item.courseName}
              </Text>
              <Text size="xs" color="dimmed" mt={3} mb="sm">
                {item._id}
              </Text>
            </Box>
            <Box>
              <ActionIcon
                onClick={() => setToggle({ id: item._id, status: true })}
              >
                <Edit size="20" />
              </ActionIcon>
            </Box>
          </Box>

          <Divider mb="sm" label="Subjects" labelPosition="center" />
          {item.subjects.map(subItem => (
            <Group
              key={subItem._id}
              position="apart"
              className={classes.item}
              noWrap
              spacing="xl"
            >
              <div>
                <Text>{subItem.subjectName}</Text>
                <Text size="xs" color="dimmed">
                  {subItem._id}
                </Text>
              </div>
            </Group>
          ))}
        </Card>
      ))
    : null;

  return (
    <>
      {loading && <LoadingOverlay visible={true} />}
      <Modal
        centered
        opened={toggle.status}
        onClose={() => setToggle({ status: false, id: "" })}
        withCloseButton={false}
        closeOnClickOutside={false}
        size="800"
      >
        <Box>
          <Group direction="column" grow>
            <Box>
              <Text>Edit Course Details</Text>
              <Divider my="md" style={{ width: "100%" }} />
            </Box>
            <Box style={{ height: 260, width: 500 }}>
              <Group direction="column" grow>
                <TextInput
                  label="Course Name"
                  required
                  value={course}
                  onChange={e => setCourse(e.target.value)}
                  icon={<Book size={16} />}
                />
                <Group position="left" align="center">
                  <Text size="sm" weight={400} mr="-sm">
                    Add Subject
                  </Text>
                  <ActionIcon
                    onClick={() => {
                      setAdd(!add);
                    }}
                  >
                    {!add ? (
                      <SquarePlus color="#2786D9" size="16" />
                    ) : (
                      <SquareMinus color="#2786D9" size="16" />
                    )}
                  </ActionIcon>
                </Group>
                {add && (
                  <TextInput
                    label="Subject Name"
                    required
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    icon={<Book2 size={16} />}
                  />
                )}
              </Group>
            </Box>
          </Group>
          <Group position="right">
            <Button onClick={() => {}}>Confirm</Button>
            <Button
              variant="outline"
              onClick={() => setToggle({ status: false, id: "" })}
            >
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
      <Box className={classes.wrapper}>
        <Box className={classes.header}>
          <Text
            component="span"
            align="center"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            weight={700}
            style={{ fontFamily: "Greycliff CF, sans-serif", fontSize: "26px" }}
          >
            Course
          </Text>
          <Box className={classes.rightHeader}>
            <Text weight={600} size="lg" color="#1C7ED6" mr="sm">
              Create
            </Text>
            <ActionIcon
              mr="md"
              component={Link}
              to={`/assignments/${course}/create`}
            >
              <FilePlus size="26" color="#427AEB" />
            </ActionIcon>
          </Box>
        </Box>
        <Divider
          label="Course Details"
          labelPosition="center"
          style={{ width: "80%" }}
          my="lg"
        />
        <Group position="left" style={{ width: "69%" }} mb="lg">
          <Text size="sm" color="red" position="left">
            *All field inputs are extremely sensitive, every action is
            irreversible
          </Text>
        </Group>
        <ScrollArea className={classes.content}>{items}</ScrollArea>
      </Box>
    </>
  );
};

export default Course;
