import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Assignments Count by each Course",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
        beginAtZero: true,
      },
    },
  },
};

const StaffBarChart = () => {
  const dashboardTask = useSelector(state => state.dashboardTask);
  const { tasks } = dashboardTask;

  const courses = [];
  tasks && tasks.forEach(task => courses.push(task.courseName));

  const courseCounts = courses.reduce((prev, cur) => {
    prev[cur] = (prev[cur] || 0) + 1;
    return prev;
  }, {});

  const labels = [...new Set(courses)];
  console.log(courseCounts);

  const data = {
    labels,
    datasets: [
      {
        label: "Assignments assigned",
        data: courseCounts,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ padding: "20px" }} />;
};

export default StaffBarChart;
