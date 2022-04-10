import {
  Button,
  createStyles,
  Divider,
  Group,
  Modal,
  Paper,
  Box,
  Text,
  TextInput,
  Textarea,
  NumberInput,
  Slider,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, User, Check } from "tabler-icons-react";
import {
  taskGradeAction,
  taskSubmissionAction,
} from "../actions/assignmentAction";
import { GRADE_TASK_RESET } from "../constants/assignmentConstant";
import { useSearchParams } from "react-router-dom";

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
  container: {
    position: "relative",
    marginTop: 10,
  },

  input: {
    height: "auto",
    paddingTop: 22,
    paddingBottom: 3,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  slider: {
    position: "absolute",
    width: "100%",
    bottom: -1,
  },

  thumb: {
    width: 16,
    height: 16,
  },

  track: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}));

const GradeModal = ({
  studentID,
  grade,
  comment,
  editToggle,
  setEditToggle,
}) => {
  const [search] = useSearchParams();
  const assignmentId = search.get("id");

  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(grade ? grade : 40);
  const [comm, setComm] = useState(comment ? comment : "");

  const updateGradeHandler = e => {
    e.preventDefault();
    dispatch(
      taskGradeAction({ grade: value, comments: comm }, studentID, assignmentId)
    );
  };

  const taskGrade = useSelector(state => state.taskGrade);
  const {
    error: updateError,
    success: updateSuccess,
    loading: updateLoading,
  } = taskGrade;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: GRADE_TASK_RESET });
      dispatch(taskSubmissionAction(assignmentId));
      setEditToggle(false, "", 1, "", "");
      showNotification({
        title: "Happy",
        message: "Submission has been updated successfully",
        color: "green",
        icon: <Check />,
      });
    }

    if (updateError) {
      showNotification({
        title: "Sad",
        message: "Submission is unable to update, please check your input",
        color: "red",
        icon: <X />,
      });
      dispatch({ type: GRADE_TASK_RESET });
    }
  }, [assignmentId, dispatch, setEditToggle, updateError, updateSuccess]);

  return (
    <Modal
      centered
      opened={editToggle}
      onClose={() => setEditToggle(false, "", "", "", "")}
      withCloseButton={false}
      closeOnClickOutside={false}
      size="700"
    >
      <Box className={classes.wrapper}>
        <Paper
          radius="md"
          mb="xl"
          p="xl"
          withBorder
          style={{
            width: "600px",
            border: "none",
          }}
        >
          <Text size="xl" weight={500}>
            Grade Student Task
          </Text>

          <Divider className={classes.divide} labelPosition="center" mt="lg" />
          <form onSubmit={e => updateGradeHandler(e)}>
            <Group direction="column" grow mt="-md">
              <TextInput
                label="Student ID"
                icon={<User size={16} />}
                value={studentID}
                onChange={() => {}}
              />
              <div className={classes.container}>
                <NumberInput
                  required
                  value={value}
                  onChange={setValue}
                  label="Grade"
                  placeholder="Grade"
                  step={1}
                  min={0}
                  max={100}
                  hideControls
                  classNames={{ input: classes.input, label: classes.label }}
                />
                <Slider
                  max={100}
                  step={1}
                  min={1}
                  label={null}
                  value={value}
                  onChange={setValue}
                  size={2}
                  radius={0}
                  className={classes.slider}
                  classNames={{ thumb: classes.thumb, track: classes.track }}
                />
              </div>
              <Textarea
                placeholder="Your comment"
                value={comm}
                onChange={event => setComm(event.currentTarget.value)}
                label="Comment"
                autosize
                minRows={2}
                maxRows={4}
                required
              />

              <Group position="right" mt="xl">
                <Button loading={updateLoading} type="submit">
                  Update
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditToggle(false, "", "", "", "");
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

export default GradeModal;
