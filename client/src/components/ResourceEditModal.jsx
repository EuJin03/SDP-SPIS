import {
  Alert,
  Button,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  Modal,
  Paper,
  Text,
  Anchor,
  Box,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
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
  Link as LinkIcon,
  Trash,
  X,
} from "tabler-icons-react";
import {
  resourceDetailsAction,
  resourceListAction,
  resourceUpdateAction,
} from "../actions/resourceAction";
import { UPDATE_RESOURCE_RESET } from "../constants/resourceConstant";
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

const ResourceEditModal = ({ resourceId, editToggle, setEditToggle }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const prevResourceId = usePrevious(resourceId);

  const resourceDetails = useSelector(state => state.resourceDetails);
  const { resource, loading, error } = resourceDetails;

  const fileUpload = useSelector(state => state.fileUpload);
  const { file, success, error: fileError } = fileUpload;

  const [topicName, setTopicName] = useState("");
  const [topicURL, setTopicURL] = useState("");
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (!resource?.course) {
      dispatch(resourceDetailsAction(resourceId));
    }

    if (prevResourceId !== resourceId) {
      dispatch(resourceDetailsAction(resourceId));
    }

    if (resource?.course) {
      setTopicName(resource.topicName);
      setTopicURL(resource.topicURL);
    }
  }, [dispatch, prevResourceId, resource, resourceId]);

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

  const resourceUpdate = useSelector(state => state.resourceUpdate);
  const {
    error: updateError,
    success: updateSuccess,
    loading: updateLoading,
  } = resourceUpdate;

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_RESOURCE_RESET });
      dispatch(resourceListAction(resource.course));
      setEditToggle(false, "");
      setTopicName("");
      setTopicURL("");
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
  }, [
    dispatch,
    navigate,
    resource.course,
    setEditToggle,
    updateError,
    updateSuccess,
  ]);

  const removeTopicURL = () => {
    setTimeout(() => setTopicURL(""), 500);
  };

  const updateResourceHandler = () => {
    if (topicURL !== "" && topicName !== "") {
      dispatch(
        resourceUpdateAction(
          {
            course: resource.course,
            subject: resource.subject,
            topicName,
            topicURL,
          },
          resourceId
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
        minHeight: "500px",
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
            minHeight: "520px",
            width: "800px",
            border: "none",
          }}
        >
          <Text size="xl" weight={500}>
            Edit Resource Details
          </Text>

          <Divider className={classes.divide} labelPosition="center" mt="lg" />
          <form onSubmit={() => updateResourceHandler()}>
            <Group direction="column" grow mt="-md">
              <TextInput
                label="Course Name"
                icon={<Book2 size={16} />}
                value={resource?.course ? resource.courseName : ""}
                disabled
              />
              <TextInput
                label="Subject Name"
                icon={<Book size={16} />}
                value={resource?.course ? resource.subjectName : ""}
                disabled
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
              <Group position="right" mt="xl">
                <Button type="submit">Update</Button>
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

export default ResourceEditModal;
