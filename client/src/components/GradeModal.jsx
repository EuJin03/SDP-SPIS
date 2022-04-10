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
  Textarea,
  NumberInput,
  Slider,
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
  User,
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

const GradeModal = ({ name, grade, comments, editToggle, setEditToggle }) => {
  const { classes } = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = useState(40);

  const updateResourceHandler = e => {
    e.preventDefault();
  };

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
          <form onSubmit={e => updateResourceHandler(e)}>
            <Group direction="column" grow mt="-md">
              <TextInput
                label="Student Name"
                icon={<User size={16} />}
                value={name}
              />
              <div className={classes.container}>
                <NumberInput
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
                label="Your comment"
                autosize
                minRows={2}
                maxRows={4}
                required
              />

              <Group position="right" mt="xl">
                <Button type="submit">Update</Button>
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
