import { Box, createStyles, Divider, ScrollArea, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
  },
  content: {
    marginTop: "10px",
    width: "100%",
    height: "26vh",
    margin: "14px 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  item: {
    height: "60px",
    margin: "10px 0",
    borderRadius: "9px",
    width: "100%",
    padding: "6px 16px",
    border: "1px solid #f1f1f1",
  },
}));

const CourseCard = () => {
  const { classes } = useStyles();

  const assignmentView = useSelector(state => state.assignmentView);
  const { assignments } = assignmentView;

  const staffName = [];
  const key = "staffEmail";
  assignments &&
    assignments.forEach(ass =>
      staffName.push({ staffName: ass.staffName, staffEmail: ass.staffEmail })
    );

  const labels = [
    ...new Map(staffName.map(item => [item[key], item])).values(),
  ];

  const item = labels ? (
    labels.map((ass, index) => (
      <Box key={index} className={classes.item}>
        <Text weight={500}>{ass.staffName}</Text>
        <Text color="dimmed" size="xs">
          {ass.staffEmail}
        </Text>
      </Box>
    ))
  ) : (
    <h1>No lecturer yet</h1>
  );

  return (
    <>
      <Box className={classes.wrapper}>
        <Box>
          <Text size="xl" weight={600}>
            Programme Lecturers
          </Text>
          <Divider my="sm" style={{ width: "100%" }} />
        </Box>
        <ScrollArea className={classes.content}>{item}</ScrollArea>
      </Box>
    </>
  );
};

export default CourseCard;
