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
  Tooltip,
} from "@mantine/core";
import { Check, FilePlus, Hash, X } from "tabler-icons-react";
import { usePrevious } from "../hooks/usePrevious";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  taskListAction,
  assignmentViewAction,
} from "../actions/assignmentAction";
import { TaskList } from "../components/TaskList";
import {
  ASSIGN_TASK_RESET,
  CREATE_TASK_RESET,
} from "../constants/assignmentConstant";

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

const Assignment = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const courseNames = useSelector(state => state.courseNames);
  const { courseInfo } = courseNames;

  const [course, setCourse] = useState(courseInfo[0].id);
  const prevCourse = usePrevious(course);

  /** TASKLIST TASKLIST TASKLIST TASKLIST TASKLIST TASKLIST TASKLIST */
  const taskList = useSelector(state => state.taskList);
  const { loading: taskLoading, error: taskError, tasks } = taskList;

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
  /** TASKLIST TASKLIST TASKLIST TASKLIST TASKLIST TASKLIST TASKLIST */

  const assignmentView = useSelector(state => state.assignmentView);
  let {
    loading: assignmentLoading,
    error: assignmentError,
    assignments,
  } = assignmentView;

  useEffect(() => {
    assignmentError &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Assignment cannot be found",
        color: "red",
        icon: <X />,
      });
  }, [assignmentError]);

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

  const data = courseInfo.map(v => ({
    value: v.id,
    label: v.courseName,
  }));

  /** DELETE DELETE DELETE DELETE DELETE DELETE DELETE */
  const taskDelete = useSelector(state => state.taskDelete);
  const { success: successDelete, error: errorDelete } = taskDelete;

  useEffect(() => {
    if (successDelete) {
      showNotification({
        autoClose: 4000,
        title: "Happy",
        message: "Assignment has been removed successfully",
        color: "green",
        icon: <Check />,
      });
      dispatch(taskListAction(course));
    }

    errorDelete &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Assignment cannot be removed",
        color: "red",
        icon: <X />,
      });
  }, [course, dispatch, errorDelete, successDelete]);
  /** DELETE DELETE DELETE DELETE DELETE DELETE DELETE */

  /** ASSIGN ASSIGN ASSIGN ASSIGN ASSIGN ASSIGN ASSIGN */
  const taskAssign = useSelector(state => state.taskAssign);
  const { success: successAssign, error: errorAssign, loading } = taskAssign;

  useEffect(() => {
    if (loading) {
      showNotification({
        id: "task-assign",
        loading: loading,
        title: "Assigning task to students",
        message: "Please be patient",
        autoClose: false,
        disallowClose: true,
      });
    }
    if (successAssign) {
      updateNotification({
        id: "task-assign",
        autoClose: 2000,
        title: "Happy",
        message: "Assignment has been assigned to new students",
        color: "green",
        icon: <Check />,
      });
      dispatch(taskListAction(course));
      dispatch({ type: ASSIGN_TASK_RESET });
    }

    errorAssign &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Assignment is either due or something is wrong",
        color: "red",
        icon: <X />,
      });
  }, [course, dispatch, errorAssign, loading, successAssign]);
  /** ASSIGN ASSIGN ASSIGN ASSIGN ASSIGN ASSIGN ASSIGN */

  /** UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE */
  const taskUpdate = useSelector(state => state.taskUpdate);
  const { success: successEdit } = taskUpdate;

  useEffect(() => {
    successEdit && dispatch(taskListAction(course));
  }, [course, dispatch, successEdit]);
  /** UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE UPDATE */

  /** CREATE CREATE CREATE CREATE CREATE CREATE CREATE CREATE */
  const taskCreate = useSelector(state => state.taskCreate);
  const { loading: createLoading, success: createSuccess } = taskCreate;

  useEffect(() => {
    if (createSuccess) {
      dispatch(taskListAction(course));
      dispatch({ type: CREATE_TASK_RESET });
    }
  }, [course, createSuccess, dispatch]);

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
              <Tooltip
                label="Create"
                withArrow
                position="left"
                placement="center"
                color="indigo"
                transition="slide-left"
              >
                <ActionIcon
                  mr="md"
                  component={Link}
                  to={`/assignments/${course}/create`}
                >
                  <FilePlus size="26" color="#427AEB" />
                </ActionIcon>
              </Tooltip>
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
        {taskLoading && <LoadingOverlay visible={true} />}
        {assignmentLoading && <LoadingOverlay visible={true} />}
        {createLoading && <LoadingOverlay visible={true} />}

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

export default Assignment;
