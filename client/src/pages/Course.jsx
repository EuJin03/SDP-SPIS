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
  X,
} from "tabler-icons-react";
import { useDispatch, useSelector } from "react-redux";
import {
  courseCreateAction,
  courseListAction,
  courseUpdateAction,
} from "../actions/courseAction";
import {
  CREATE_COURSE_RESET,
  UPDATE_COURSE_RESET,
} from "../constants/courseConstant";

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
  const [create, setCreate] = useState("");
  const [subject, setSubject] = useState("");
  const [toggle, setToggle] = useState({ id: "", status: false });
  const [toggleCreate, setToggleCreate] = useState(false);
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

  const items = courses?.courseList ? (
    courses.courseList.map(item => (
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
              onClick={() => {
                setToggle({ id: item._id, status: true });
                setCourse(item.courseName);
              }}
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
  ) : loading ? (
    <LoadingOverlay visible={true} />
  ) : null;

  const courseUpdate = useSelector(state => state.courseUpdate);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = courseUpdate;

  useEffect(() => {
    if (updateSuccess) {
      setToggle({ id: "", status: false });
      setCourse("");
      setSubject("");
      showNotification({
        title: "Happy",
        message: "Course has been updated successfully",
        color: "green",
        icon: <Check />,
      });
      dispatch({ type: UPDATE_COURSE_RESET });
      dispatch(courseListAction());
    }

    if (updateError) {
      setToggle({ id: "", status: false });
      setCourse("");
      setSubject("");
      showNotification({
        title: "Course cannot be updated",
        message: "Course might already existed",
        color: "red",
        icon: <X />,
      });
      dispatch({ type: UPDATE_COURSE_RESET });
    }
  }, [dispatch, updateError, updateSuccess]);

  const updateCourseHandler = () => {
    if (course !== "" && subject === "") {
      dispatch(
        courseUpdateAction(toggle.id, {
          courseName:
            course.substring(0, 1).toUpperCase() + course.substring(1),
        })
      );
      setAdd(add ? !add : add);
    }

    if (course !== "" && subject !== "") {
      if (subject.length < 5) {
        showNotification({
          title: "Subject name length must be greater than 5",
          message: "Please recheck your subject name",
          color: "red",
          icon: <X />,
        });
      } else {
        dispatch(
          courseUpdateAction(toggle.id, {
            courseName:
              course.substring(0, 1).toUpperCase() + course.substring(1),
            subjectName:
              subject.substring(0, 1).toUpperCase() + subject.substring(1),
          })
        );
        setAdd(add ? !add : add);
      }
    }
  };

  const courseCreate = useSelector(state => state.courseCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = courseCreate;

  useEffect(() => {
    if (createSuccess) {
      setToggleCreate(false);
      setCreate("");
      showNotification({
        title: "Happy",
        message: "Course has been updated successfully",
        color: "green",
        icon: <Check />,
      });
      dispatch({ type: CREATE_COURSE_RESET });
      dispatch(courseListAction());
    }

    if (createError) {
      setToggleCreate(false);
      setCreate("");
      showNotification({
        title: "Course cannot be created",
        message: "Course might already existed",
        color: "red",
        icon: <X />,
      });
      dispatch({ type: CREATE_COURSE_RESET });
    }
  }, [createError, createSuccess, dispatch]);

  const createCourseHandler = () => {
    if (create.length < 5) {
      showNotification({
        title: "Course name length must be greater than 5",
        message: "Please recheck your course name",
        color: "red",
        icon: <X />,
      });
    } else {
      dispatch(
        courseCreateAction({
          courseName:
            create.substring(0, 1).toUpperCase() + create.substring(1),
        })
      );
    }
  };

  return (
    <>
      <Modal
        centered
        opened={toggleCreate}
        onClose={() => {
          setToggleCreate(false);
          setCreate("");
        }}
        withCloseButton={false}
        closeOnClickOutside={false}
        size="800"
      >
        <Box>
          <Group direction="column" grow>
            <Box>
              <Text>Create a Course</Text>
              <Divider mt="md" style={{ width: "100%" }} />
            </Box>

            <Box style={{ height: 180, width: 400 }}>
              <Group direction="column" grow>
                <TextInput
                  description="Cannot delete course after creation"
                  label="Course Name"
                  required
                  value={create}
                  placeholder="Software Development Project"
                  onChange={e => setCreate(e.target.value)}
                  icon={<Book size={16} />}
                />
              </Group>
            </Box>
          </Group>
          <Group position="right">
            <Button
              loading={createLoading}
              onClick={() => createCourseHandler()}
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setToggleCreate(false);
                setCreate("");
              }}
            >
              Cancel
            </Button>
          </Group>
        </Box>
      </Modal>
      <Modal
        centered
        opened={toggle.status}
        onClose={() => {
          setToggle({ status: false, id: "" });
          setCourse("");
          setSubject("");
          setAdd(add ? !add : add);
        }}
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
                  placeholder="Software Development Project"
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
                      setSubject("");
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
                    placeholder="Only one subject can be added at a time"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    icon={<Book2 size={16} />}
                  />
                )}
              </Group>
            </Box>
          </Group>
          <Group position="right">
            <Button
              loading={updateLoading}
              onClick={() => updateCourseHandler()}
            >
              Confirm
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setToggle({ status: false, id: "" });
                setCourse("");
                setSubject("");
                setAdd(add ? !add : add);
              }}
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
            <ActionIcon mr="md" onClick={() => setToggleCreate(true)}>
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
