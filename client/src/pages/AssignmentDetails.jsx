import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Center,
  createStyles,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  RingProgress,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { taskSubmissionAction } from "../actions/assignmentAction";
import { usePrevious } from "../hooks/usePrevious";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { User, X } from "tabler-icons-react";
import { GradeList } from "../components/GradeList";

const useStyles = createStyles(theme => ({
  wrapper: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
  },

  content: {
    height: "100vh",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  test: {
    width: "84%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const AssignmentDetails = () => {
  const { classes } = useStyles();

  const [search] = useSearchParams();
  const assignmentId = search.get("id");
  const students = search.get("students");

  const dispatch = useDispatch();

  const taskSubmission = useSelector(state => state.taskSubmission);
  const { loading, error, submissions } = taskSubmission;

  const prevAssignmentId = usePrevious(assignmentId);

  useEffect(() => {
    if (!submissions?.topicName || prevAssignmentId !== assignmentId) {
      dispatch(taskSubmissionAction(assignmentId));
    }

    error &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Assignment Details cannot be found",
        color: "red",
        icon: <X />,
      });
  }, [assignmentId, dispatch, error, prevAssignmentId, submissions]);

  return (
    <>
      <Box className={classes.wrapper}>
        {loading && <LoadingOverlay visible={true} />}
        {submissions?.topicName && (
          <>
            <Group
              mt="xl"
              position="apart"
              direction="column"
              style={{ width: "80%" }}
              align="center"
            >
              <Box className={classes.test}>
                <Text
                  component="span"
                  align="center"
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                  weight={700}
                  style={{
                    fontFamily: "Greycliff CF, sans-serif",
                    fontSize: "26px",
                  }}
                >
                  Assignment Details
                </Text>
                <Button
                  component={Link}
                  to="/assignments"
                  variant="outline"
                  size="xs"
                >
                  Return
                </Button>
              </Box>
              <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <Paper withBorder radius="md" p="xs">
                  <Box p="md">
                    <Text
                      color="dimmed"
                      size="xs"
                      transform="uppercase"
                      weight={700}
                    >
                      Topic Name
                    </Text>
                    <Text weight={700} size="xl">
                      {submissions.topicName}
                    </Text>
                  </Box>
                </Paper>
                <Paper withBorder radius="md" p="xs">
                  <Box p="md">
                    <Text
                      color="dimmed"
                      size="xs"
                      transform="uppercase"
                      weight={700}
                    >
                      Due Date
                    </Text>
                    <Text weight={700} size="xl">
                      {dayjs(submissions.due).format("MMM D, YYYY h:mm A")}
                    </Text>
                  </Box>
                </Paper>
                <Paper withBorder radius="md" p="xs">
                  <Group>
                    <RingProgress
                      size={80}
                      roundCaps
                      thickness={8}
                      sections={[
                        {
                          value: (submissions.students.length / students) * 100,
                          color: "green",
                        },
                      ]}
                      label={
                        <Center>
                          <User size={22} />
                        </Center>
                      }
                    />

                    <div>
                      <Text
                        color="dimmed"
                        size="xs"
                        transform="uppercase"
                        weight={700}
                      >
                        Students
                      </Text>
                      <Text weight={700} size="xl">
                        {submissions.students.length +
                          "/" +
                          students +
                          " submitted"}
                      </Text>
                    </div>
                  </Group>
                </Paper>
              </SimpleGrid>
            </Group>

            <Divider
              style={{ width: "80%" }}
              size="xs"
              label={`Students`}
              labelPosition="center"
              mt="lg"
            />

            <Box className={classes.content}>
              {submissions?.students && (
                <GradeList data={submissions.students} />
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default AssignmentDetails;
