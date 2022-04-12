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
  Anchor,
  LoadingOverlay,
  Alert,
  UnstyledButton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Check,
  Link,
  ExternalLink,
  AlertCircle,
  Trash,
} from "tabler-icons-react";
import {
  assignmentDetailsAction,
  assignmentSubmitAction,
  assignmentViewAction,
} from "../actions/assignmentAction";
import { SUBMIT_ASSIGNMENT_RESET } from "../constants/assignmentConstant";
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

const SubmitModal = ({ submissionId, comment, editToggle, setEditToggle }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const prevSubmissionId = usePrevious(submissionId);

  const assignmentDetails = useSelector(state => state.assignmentDetails);
  const {
    assignment,
    loading: assLoading,
    error: assError,
  } = assignmentDetails;

  const fileUpload = useSelector(state => state.fileUpload);
  const { file, success, error: fileError } = fileUpload;

  const [submissionURL, setSubmissionURL] = useState("");
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (prevSubmissionId !== submissionId) {
      dispatch(assignmentDetailsAction(submissionId));
    }

    if (assignment?.submissionFile) {
      setSubmissionURL(assignment.submissionFile);
    }
  }, [assignment?.submissionFile, dispatch, prevSubmissionId, submissionId]);

  useEffect(() => {
    if (success) {
      if (file) {
        setSubmissionURL(file.url);
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
    setTimeout(() => setSubmissionURL(""), 500);
  };

  const assignmentSubmit = useSelector(state => state.assignmentSubmit);
  const {
    error: submitError,
    success: submitSuccess,
    loading: submitLoading,
  } = assignmentSubmit;

  useEffect(() => {
    if (submitSuccess) {
      dispatch({ type: SUBMIT_ASSIGNMENT_RESET });
      dispatch(assignmentViewAction());
      setEditToggle(false, "");
      setSubmissionURL("");
      showNotification({
        title: "Happy",
        message: "Submission has been uploaded successfully",
        color: "green",
        icon: <Check />,
      });
    }

    if (submitError) {
      showNotification({
        title: "Sad",
        message: "Submission is unable to upload, please check your input",
        color: "red",
        icon: <X />,
      });
    }
  }, [dispatch, setEditToggle, submitError, submitSuccess]);

  const updateFileSubmission = e => {
    dispatch(assignmentSubmitAction(submissionId, submissionURL));
  };

  return (
    <Modal
      centered
      opened={editToggle}
      onClose={() => setEditToggle(false, "")}
      withCloseButton={false}
      closeOnClickOutside={false}
      size="700"
    >
      <Box className={classes.wrapper}>
        {assLoading && <LoadingOverlay visible={true} />}
        {submitLoading && <LoadingOverlay visible={true} />}
        {assError && (
          <Alert icon={<AlertCircle size={16} />} title="Uh Oh!" color="red">
            Assignment submission could not load for some reason!
          </Alert>
        )}
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
            Assignment Submission
          </Text>

          <Divider className={classes.divide} labelPosition="center" mt="lg" />
          <form onSubmit={e => updateFileSubmission(e)}>
            <Group direction="column" grow mt="-md">
              <Box>
                {submissionURL !== "" ? (
                  <>
                    <Text mb="sm" size="sm" weight={500}>
                      Topic Link{" "}
                      <Text size="xs" weight={400}>
                        *Can only submit once
                      </Text>
                    </Text>

                    <Box className={classes.resourceLink}>
                      <Link color="#ADB5BD" size="16" />
                      <Box className={classes.box}>
                        <Anchor
                          className={classes.anchor}
                          underline={false}
                          ml="md"
                          size="sm"
                          weight={500}
                          href={submissionURL}
                        >
                          {filePath !== "" ? filePath : "Submission"}
                          <ExternalLink
                            style={{ marginLeft: "8px" }}
                            size="16"
                          />
                        </Anchor>
                        {assignment?.submission ? null : (
                          <UnstyledButton onClick={() => removeTopicURL()}>
                            <Trash color="red" size={14} />
                          </UnstyledButton>
                        )}
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
                {comment !== "" && (
                  <Textarea
                    mt="xl"
                    value={comment}
                    label="Lecturer's Remark: "
                    required
                    minRows={2}
                    maxRows={5}
                  />
                )}
              </Box>
              <Group position="right" mt="xl">
                {assignment?.submission ? null : (
                  <Button loading={submitLoading} type="submit">
                    Submit
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditToggle(false, "");
                    setSubmissionURL("");
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

export default SubmitModal;
