import {
  Box,
  createStyles,
  Divider,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewAllStaffAction } from "../actions/staffAction";
import { StaffList } from "../components/StaffList";

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
}));

const StaffManagement = () => {
  const { classes } = useStyles();

  const dispatch = useDispatch();

  const allStaff = useSelector(state => state.allStaff);
  const { loading, staffs, error } = allStaff;

  useEffect(() => {
    if (staffs) {
      if (staffs.length === 0) {
        dispatch(viewAllStaffAction());
      }
    }
  }, [dispatch, staffs]);

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
            Staff Management
          </Text>
        </Box>

        {staffs && staffs.length !== 0 ? (
          <StaffList data={staffs} />
        ) : loading ? (
          <LoadingOverlay visible={true} />
        ) : null}
      </Box>
    </>
  );
};

export default StaffManagement;
