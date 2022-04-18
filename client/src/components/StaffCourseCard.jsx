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

const StaffCourseCard = () => {
  const { classes } = useStyles();

  const courseNames = useSelector(state => state.courseNames);
  const { courseInfo } = courseNames;

  const item =
    courseInfo &&
    courseInfo.map((course, index) => (
      <Box key={index} className={classes.item}>
        <Text weight={500}>{course.courseName}</Text>
        <Text color="dimmed" size="xs">
          {course.id}
        </Text>
      </Box>
    ));

  return (
    <Box>
      <Box>
        <Text size="lg" weight={600}>
          Assigned Courses
        </Text>
        <Divider my="sm" style={{ width: "100%" }} />
      </Box>
      <ScrollArea className={classes.content}>{item}</ScrollArea>
    </Box>
  );
};

export default StaffCourseCard;
