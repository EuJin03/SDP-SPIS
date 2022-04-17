import {
  Box,
  Center,
  createStyles,
  Divider,
  Group,
  RingProgress,
  Text,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";
import { Book } from "tabler-icons-react";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
  },
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },

  content: {
    width: "100%",
    height: "20vh",
    margin: "14px 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  todo: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #f1f1f1",
    padding: "6px 15px",
    borderRadius: "7px",
    marginBottom: "8px",
  },

  status: {
    width: "40px",
    height: "20px",
    margin: "4px",
    backgroundColor: "blue",
  },
}));

const AssignmentProgress = () => {
  const { classes } = useStyles();

  const assignmentView = useSelector(state => state.assignmentView);
  const { assignments } = assignmentView;

  const graded = assignments
    ? assignments.filter(ass => ass.grade !== 0).length
    : 0;
  const submitted = assignments
    ? assignments.filter(ass => ass.submission).length
    : 0;
  const total = assignments ? assignments.length : 0;
  const due = assignments
    ? assignments.filter(
        ass => !ass.submission && dayjs(new Date(ass.due)).diff(new Date()) <= 0
      ).length
    : 0;

  return (
    <Box className={classes.wrapper}>
      <Box>
        <Text size="xl" weight={600}>
          Assignment Progress
        </Text>
        <Divider my="sm" style={{ width: "100%" }} />
      </Box>
      <Group mt="xl" ml="xl">
        <RingProgress
          size={240}
          thickness={22}
          sections={[
            { value: Math.round((graded / total) * 100), color: "#339AF0" },
            {
              value: Math.round(((submitted - graded) / total) * 100),
              color: "#FD7E14",
            },
            {
              value: Math.round(((total - submitted) / total) * 100),
              color: "#F1F3F5",
            },
            {
              value: Math.round((due / total) * 100),
              color: "#F78080",
            },
          ]}
          label={
            <Center>
              <Book size={50} color="#339AF0" />
            </Center>
          }
        />

        <div>
          <Text color="dimmed" size="lg" transform="uppercase" weight={600}>
            Assignments Assigned
          </Text>
          <Box weight={700} size="xl">
            <Group>
              <Tooltip
                label={graded + " assignments with result"}
                withArrow
                color="cyan"
                transition="skew-up"
              >
                <Box
                  className={classes.status}
                  style={{ backgroundColor: "#339AF0" }}
                ></Box>
              </Tooltip>
              <Text color="dimmed" weight={500} size="sm" ml="-sm">
                Graded
              </Text>
            </Group>
            <Group>
              <Tooltip
                label={submitted + " assignments submitted"}
                withArrow
                color="cyan"
                transition="skew-up"
              >
                <Box
                  className={classes.status}
                  style={{ backgroundColor: "#FD7E14" }}
                ></Box>
              </Tooltip>
              <Text color="dimmed" weight={500} size="sm" ml="-sm">
                Submitted
              </Text>
            </Group>
            <Group>
              <Tooltip
                label={
                  total - submitted + " assignments pending for submission"
                }
                withArrow
                color="cyan"
                transition="skew-up"
              >
                <Box
                  className={classes.status}
                  style={{ backgroundColor: "#F1F3F5" }}
                ></Box>
              </Tooltip>
              <Text color="dimmed" weight={500} size="sm" ml="-sm">
                Pending
              </Text>
            </Group>
            <Group>
              <Tooltip
                label={due + " assignments not submitted before due"}
                withArrow
                color="cyan"
                transition="skew-up"
              >
                <Box
                  className={classes.status}
                  style={{ backgroundColor: "#F78080" }}
                ></Box>
              </Tooltip>
              <Text color="dimmed" weight={500} size="sm" ml="-sm">
                Overdue
              </Text>
            </Group>
          </Box>
        </div>
      </Group>
    </Box>
  );
};

export default AssignmentProgress;
