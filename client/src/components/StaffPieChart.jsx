import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Box, createStyles } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { dashboardTaskAction } from "../actions/assignmentAction";

ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = createStyles(theme => ({
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "340px",
    position: "relative",
  },
}));

export const options = {
  indexAxis: "y",
  plugins: {
    title: {
      display: true,
      text: "Number of Students in each Course",
    },
  },
  responsive: true,
};

const StaffPieChart = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const dashboardTask = useSelector(state => state.dashboardTask);
  const { tasks } = dashboardTask;

  useEffect(() => {
    dispatch(dashboardTaskAction());
  }, [dispatch]);

  console.log(tasks);
  const totalStudentsPerCourse = [];
  const key = "courseName";
  tasks &&
    tasks.forEach(task =>
      totalStudentsPerCourse.push({
        courseName: task.courseName,
        students: task.studentAssigned,
      })
    );

  const labels = [
    ...new Map(totalStudentsPerCourse.map(item => [item[key], item])).values(),
  ];

  const data = {
    labels: labels.map(label => label.courseName),
    datasets: [
      {
        label: "Number of Students in each Course",
        data: labels.map(label => label.students),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.content}>
        <Pie data={data} options={options} style={{ paddingBottom: "38px" }} />
      </Box>
    </Box>
  );
};

export default StaffPieChart;
