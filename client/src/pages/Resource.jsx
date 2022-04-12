import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resourceListAction } from "../actions/resourceAction";
import {
  ActionIcon,
  Box,
  createStyles,
  LoadingOverlay,
  NativeSelect,
  Text,
} from "@mantine/core";
import { Check, FilePlus, Hash, X } from "tabler-icons-react";
import { ResourceList } from "../components/ResourceList";
import { usePrevious } from "../hooks/usePrevious";
import { showNotification } from "@mantine/notifications";
import { CREATE_RESOURCE_RESET } from "../constants/resourceConstant";

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

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    }

    if (userInfo && !courseInfo) {
      navigate("/", { replace: true });
    }
  }, [courseInfo, navigate, userInfo]);

  const [course, setCourse] = useState(courseInfo[0].id);
  const prevCourse = usePrevious(course);

  const resourceList = useSelector(state => state.resourceList);
  const { loading, error, resources } = resourceList;

  const resourceDelete = useSelector(state => state.resourceDelete);
  const { success: successRemove, error: errorRemove } = resourceDelete;

  const resourceUpdate = useSelector(state => state.resourceUpdate);
  const { success: successEdit } = resourceUpdate;

  useEffect(() => {
    if (successRemove) {
      showNotification({
        autoClose: 4000,
        title: "Happy",
        message: "Resource has been removed successfully",
        color: "green",
        icon: <Check />,
      });
      dispatch(resourceListAction(course));
    }

    if (successEdit) {
      dispatch(resourceListAction(course));
    }

    error &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Resource cannot be found",
        color: "red",
        icon: <X />,
      });

    errorRemove &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Resource cannot be removed",
        color: "red",
        icon: <X />,
      });

    if (course.length !== 0 && prevCourse !== course) {
      dispatch(resourceListAction(course));
    }
  }, [
    course,
    dispatch,
    error,
    errorRemove,
    prevCourse,
    successEdit,
    successRemove,
  ]);

  const data = courseInfo.map(v => ({
    value: v.id,
    label: v.courseName,
  }));

  const resourceCreate = useSelector(state => state.resourceCreate);
  const {
    success: createSuccess,
    loading: createLoading,
    error: createError,
  } = resourceCreate;

  useEffect(() => {
    if (createSuccess) {
      dispatch(resourceListAction(course));
      dispatch({ type: CREATE_RESOURCE_RESET });
      showNotification({
        title: "Happy",
        message: "Resource has been created successfully",
        color: "green",
        icon: <Check />,
      });
    }

    if (createError) {
      dispatch({ type: CREATE_RESOURCE_RESET });
      showNotification({
        title: "Sad",
        message: "Resource cannot be created",
        color: "red",
        icon: <X />,
      });
    }
  }, [course, createError, createSuccess, dispatch, navigate]);

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
            Resources
          </Text>
          <Box className={classes.rightHeader}>
            {userInfo?.studentID ? null : (
              <ActionIcon
                mr="md"
                component={Link}
                to={`/resources/${course}/create`}
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
        {loading ? <LoadingOverlay visible={true} /> : null}
        {createLoading && <LoadingOverlay visible={true} />}

        {resources.length !== 0 && (
          <ResourceList
            key={resources}
            data={resources}
            staff={userInfo?.studentID ? null : userInfo.email}
          />
        )}

        {resources.length === 0 && <ResourceList data={[]} staff={null} />}
      </Box>
    </>
  );
};

export default Resource;
