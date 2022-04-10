import {
  Alert,
  Anchor,
  Button,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Box,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Ballpen,
  Book,
  Book2,
  Check,
  ExternalLink,
  Trash,
  Link as LinkIcon,
  X,
  CalendarEvent,
} from "tabler-icons-react";
import {
  taskDetailsAction,
  taskListAction,
  taskUpdateAction,
} from "../actions/assignmentAction";
import { UPDATE_TASK_RESET } from "../constants/assignmentConstant";
import { UPLOAD_FILE_RESET } from "../constants/uploadConstant";
import { usePrevious } from "../hooks/usePrevious";
import { DropZone } from "./DropZone";

const useStyles = createStyles(theme => ({
  wrapper: {
    minHeight: "520px",
    position: "relative",
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

  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
}));

const TaskEditModal = ({ taskId, editToggle, setEditToggle }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const prevTaskId = usePrevious(taskId);

  const taskDetails = useSelector(state => state.taskDetails);
  const { task, loading, error } = taskDetails;

  const fileUpload = useSelector(state => state.fileUpload);
  const { file, success, error: fileError } = fileUpload;

  const [topicName, setTopicName] = useState("");
  const [topicURL, setTopicURL] = useState("");
  const [filePath, setFilePath] = useState("");
  const [due, setDue] = useState("");

  useEffect(() => {
    if (prevTaskId !== taskId) {
      dispatch(taskDetailsAction(taskId));
    }

    if (task?.course) {
      setTopicName(task.topicName);
      setTopicURL(task.topicURL);
      setDue(new Date(task.due));
    }
  }, [dispatch, prevTaskId, task, taskId]);

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

  const taskUpdate = useSelector(state => state.taskUpdate);
  const {
    error: updateError,
    success: updateSuccess,
    loading: updateLoading,
  } = taskUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_TASK_RESET });
      dispatch(taskListAction(task.course));
      setEditToggle(false, "");
      setTopicName("");
      setTopicURL("");
      setDue(new Date());
      showNotification({
        title: "Happy",
        message: "Resource has been updated successfully",
        color: "green",
        icon: <Check />,
      });
    }

    if (updateError) {
      showNotification({
        title: "Sad",
        message: "Resource is unable to update, please check your input",
        color: "red",
        icon: <X />,
      });
    }
  }, [dispatch, setEditToggle, task.course, updateError, updateSuccess]);

  const removeTopicURL = () => {
    setTimeout(() => setTopicURL(""), 500);
  };

  const updateResourceHandler = e => {
    e.preventDefault();
    if (topicURL !== "" && topicName !== "" && due !== null && due !== "") {
      dispatch(
        taskUpdateAction(
          {
            course: task.course,
            subject: task.subject,
            due: due.toISOString(),
            topicName,
            topicURL,
          },
          taskId
        )
      );
    }
  };

  return (
    <Modal
      centered
      opened={editToggle}
      onClose={() => setEditToggle(false, "")}
      withCloseButton={false}
      closeOnClickOutside={false}
      style={{
        minHeight: "520px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
      size="700"
    >
      <Box className={classes.wrapper}>
        {loading && <LoadingOverlay visible={true} />}
        {updateLoading && <LoadingOverlay visible={true} />}
        {error && (
          <Alert icon={<AlertCircle size={16} />} title="Uh Oh!" color="red">
            Resource details could not load for some reason!
          </Alert>
        )}
        {updateError && (
          <Alert icon={<AlertCircle size={16} />} title="Uh Oh!" color="red">
            Resource could not update for some reason!
          </Alert>
        )}
        <Paper
          radius="md"
          mb="xl"
          p="xl"
          withBorder
          style={{
            minHeight: "320px",
            width: "800px",
            border: "none",
          }}
        >
          <Text size="xl" weight={500}>
            Edit Resource Details
          </Text>

          <Divider className={classes.divide} labelPosition="center" mt="lg" />
          <form onSubmit={e => updateResourceHandler(e)}>
            <Group direction="column" grow mt="-md">
              <Group position="apart" grow="1">
                <TextInput
                  label="Course Name"
                  icon={<Book2 size={16} />}
                  value={task?.course ? task.courseName : ""}
                  disabled
                />
                <TextInput
                  label="Subject Name"
                  icon={<Book size={16} />}
                  value={task?.course ? task.subjectName : ""}
                  disabled
                />
              </Group>
              <DatePicker
                label="Due Date"
                icon={<CalendarEvent size={16} />}
                value={due}
                onChange={e => setDue(e)}
                required
                excludeDate={date => date <= new Date()}
                onFocus={false}
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
                      <Box className={classes.box}>
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
              <Group position="right" mt="xl" my="-xl">
                <Button loading={updateLoading} type="submit">
                  Update
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditToggle(false, "");
                    setTopicName("");
                    setTopicURL("");
                  }}
                  type="button"
                >
                  Cancel
                </Button>
              </Group>
            </Group>
          </form>
        </Paper>
      </Box>
    </Modal>
  );
};

export default TaskEditModal;
