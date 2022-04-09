import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ActionIcon,
  Box,
  createStyles,
  LoadingOverlay,
  NativeSelect,
  Text,
} from "@mantine/core";
import { FilePlus, Hash, X } from "tabler-icons-react";
import { usePrevious } from "../hooks/usePrevious";
import { showNotification } from "@mantine/notifications";
import {
  taskListAction,
  assignmentViewAction,
} from "../actions/assignmentAction";
import { TaskList } from "../components/TaskList";

const useStyles = createStyles(theme => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    position: "relative",
  },
  header: {
    flex: "0.16",
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Resource = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const courseNames = useSelector(state => state.courseNames);
  const { courseInfo } = courseNames;

  const [course, setCourse] = useState(courseInfo[0].id);
  const prevCourse = usePrevious(course);

  const taskList = useSelector(state => state.taskList);
  const { loading: taskLoading, error: taskError, tasks } = taskList;

  const assignmentView = useSelector(state => state.assignmentView);
  const {
    loading: assignmentLoading,
    error: assignmentError,
    assignments,
  } = assignmentView;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    }

    if (userInfo && !courseInfo) {
      navigate("/", { replace: true });
    }

    if (course.length !== 0 && prevCourse !== course) {
      if (userInfo?.studentID) {
        dispatch(assignmentViewAction());
      } else {
        dispatch(taskListAction(course));
      }
    }
  }, [course, courseInfo, dispatch, navigate, prevCourse, tasks, userInfo]);

  // asg soon
  // const resourceDelete = useSelector(state => state.resourceDelete);
  // const { success: successRemove } = resourceDelete;

  // const resourceUpdate = useSelector(state => state.resourceUpdate);
  // const { success: successEdit } = resourceUpdate;

  useEffect(() => {
    taskError &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Assignment cannot be found",
        color: "red",
        icon: <X />,
      });
  }, [course, taskError]);

  const data = courseInfo.map(v => ({
    value: v.id,
    label: v.courseName,
  }));

  // const resourceCreate = useSelector(state => state.resourceCreate);
  // const {
  //   success: createSuccess,
  //   loading: createLoading,
  //   error: createError,
  // } = resourceCreate;

  // useEffect(() => {
  //   if (createSuccess) {
  //     dispatch({ type: CREATE_RESOURCE_RESET });
  //     showNotification({
  //       title: "Happy",
  //       message: "Resource has been created successfully",
  //       color: "green",
  //       icon: <Check />,
  //     });
  //   }

  //   if (createError) {
  //     dispatch({ type: CREATE_RESOURCE_RESET });
  //     showNotification({
  //       title: "Sad",
  //       message: "Resource cannot be created",
  //       color: "red",
  //       icon: <X />,
  //     });
  //   }
  // }, [createError, createSuccess, dispatch, navigate]);
  console.log(assignments);

  return (
    <>
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
            Assignments
          </Text>
          <Box className={classes.rightHeader}>
            {userInfo?.studentID ? null : (
              <ActionIcon
                mr="md"
                component={Link}
                to={`/assignments/${course}/create`}
              >
                <FilePlus size="26" color="#427AEB" />
              </ActionIcon>
            )}
            <NativeSelect
              placeholder="Select a course"
              data={data}
              value={course}
              onChange={e => setCourse(e.currentTarget.value)}
              icon={<Hash size={14} />}
            />
          </Box>
        </Box>
        {taskLoading && course.length === 0 && (
          <LoadingOverlay visible={true} />
        )}

        {tasks && tasks.length !== 0 && (
          <TaskList
            key={tasks}
            data={tasks}
            staff={userInfo?.studentID ? null : userInfo.email}
          />
        )}

        {assignments && assignments.length !== 0 && (
          <TaskList
            key={assignments}
            data={assignments}
            staff={userInfo?.studentID ? null : userInfo.email}
          />
        )}
      </Box>
    </>
  );
};

export default Resource;
