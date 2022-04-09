import {
  ActionIcon,
  Alert,
  Anchor,
  Box,
  Button,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  NativeSelect,
  Paper,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Link as LinkIcon,
  AlertCircle,
  Ballpen,
  Book,
  Book2,
  X,
  ExternalLink,
  Trash,
  Check,
} from "tabler-icons-react";
import { courseDetailsAction } from "../actions/courseAction";
import { resourceCreateAction } from "../actions/resourceAction";
import { DropZone } from "../components/DropZone";
import { usePrevious } from "../hooks/usePrevious";
import { UPLOAD_FILE_RESET } from "../constants/uploadConstant";

const useStyles = createStyles(theme => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    position: "relative",
    padding: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  header: {
    width: "80%",
  },
  divide: {
    margin: "38px 0",
  },

  resourceLink: {
    border: "1px solid #CED4DA",
    padding: "6.5px",
    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
  },

  anchor: {
    display: "flex",
    alignItems: "center",
  },

  test: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const ResourceCreate = () => {
  const { courseId } = useParams();
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [subject, setSubject] = useState("");
  const [topicName, setTopicName] = useState("");
  const [topicURL, setTopicURL] = useState("");
  const [filePath, setFilePath] = useState("");

  const prevCourse = usePrevious(courseId);

  const navigate = useNavigate();

  const courseDetails = useSelector(state => state.courseDetails);
  const {
    course: { course },
    loading,
    error,
  } = courseDetails;

  const fileUpload = useSelector(state => state.fileUpload);
  const { file, success, error: fileError } = fileUpload;

  useEffect(() => {
    if (courseId && !course?.courseName) {
      dispatch(courseDetailsAction(courseId));
    }
    if (courseId !== prevCourse) {
      dispatch(courseDetailsAction(courseId));
    }

    if (!courseId) {
      navigate("/", { replace: true });
    }

    if (course?.courseName && subject === "") {
      setSubject(course.subjects[0]._id);
    }
  }, [course, courseId, dispatch, navigate, prevCourse, subject]);

  useEffect(() => {
    if (success) {
      if (file) {
        setTopicURL(file.url);
        setFilePath(file.filepath);
        dispatch({ type: UPLOAD_FILE_RESET });
        showNotification({
          title: "Happy",
          message: "File has been uploaded successfully",
          color: "green",
          icon: <Check />,
        });
      }
    }

    if (fileError) {
      showNotification({
        title: "Sad",
        message: "File is not uploaded. Please try again later",
        color: "red",
        icon: <X />,
      });
    }
  }, [dispatch, file, fileError, success]);

  const removeTopicURL = () => {
    setTimeout(() => setTopicURL(""), 500);
  };

  const createResourceHandler = e => {
    dispatch(
      resourceCreateAction({ course: courseId, subject, topicName, topicURL })
    );
    navigate("/resources", { replace: true });
  };

  return (
    <>
      <Box className={classes.wrapper}>
        {loading && <LoadingOverlay visible={true} />}
        {error && (
          <Alert icon={<AlertCircle size={16} />} title="Uh Oh!" color="red">
            Resource details could not load for some reason!
          </Alert>
        )}
        {course?.courseName && (
          <Paper
            radius="md"
            mb="xl"
            p="xl"
            withBorder
            style={{
              minHeight: "520px",
              width: "800px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <Text size="xl" weight={500}>
              Create Resource
            </Text>

            <Divider
              className={classes.divide}
              labelPosition="center"
              mt="lg"
            />
            <form onSubmit={() => createResourceHandler()}>
              <Group direction="column" grow mt="-md">
                <TextInput
                  label="Course Name"
                  icon={<Book2 size={16} />}
                  value={course.courseName}
                  onChange={() => {}}
                  disabled
                />
                <NativeSelect
                  data={course.subjects.map(v => ({
                    value: v._id,
                    label: v.subjectName,
                  }))}
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  label="Subject Name"
                  icon={<Book size={16} />}
                />
                <TextInput
                  required
                  label="Topic Name"
                  icon={<Ballpen size={16} />}
                  placeholder="Topic Name"
                  value={topicName}
                  onChange={event => setTopicName(event.target.value)}
                />

                <Box>
                  {topicURL !== "" ? (
                    <>
                      <Text mb="sm" size="sm" weight={500}>
                        Topic Link
                      </Text>
                      <Box className={classes.resourceLink}>
                        <LinkIcon color="#ADB5BD" size="16" />
                        <Box className={classes.test}>
                          <Anchor
                            className={classes.anchor}
                            underline={false}
                            ml="md"
                            size="sm"
                            weight={500}
                            href={topicURL}
                          >
                            {filePath !== "" ? filePath : "Resource"}
                            <ExternalLink
                              style={{ marginLeft: "8px" }}
                              size="16"
                            />
                          </Anchor>
                          <UnstyledButton onClick={() => removeTopicURL()}>
                            <Trash color="red" size={14} />
                          </UnstyledButton>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Text mb="sm" size="sm" weight={500}>
                        Upload file
                      </Text>
                      <DropZone />
                    </>
                  )}
                </Box>
                <Group position="right" mt="xl">
                  <Button type="submit" disabled={topicURL ? false : true}>
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    component={Link}
                    to={"/resources"}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Group>
              </Group>
            </form>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default ResourceCreate;
