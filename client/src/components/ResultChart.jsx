import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { assignmentViewAction } from "../actions/assignmentAction";
import { X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { LoadingOverlay } from "@mantine/core";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    title: {
      display: true,
      text: "Average Score by Subjects",
    },
  },
  responsive: true,
  scales: {
    x: {
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const ResultChart = () => {
  const dispatch = useDispatch();
  const assignmentView = useSelector(state => state.assignmentView);
  const { assignments, error, loading } = assignmentView;

  useEffect(() => {
    dispatch(assignmentViewAction());

    error &&
      showNotification({
        autoClose: 4000,
        title: "Sad",
        message: "Assignment cannot be found",
        color: "red",
        icon: <X />,
      });
  }, [dispatch, error]);

  const subjectName = [];
  assignments && assignments.forEach(a => subjectName.push(a.subjectName));

  const labels = [...new Set(subjectName)];

  const data = {
    labels,
    datasets: [
      {
        label: "Average Score",
        data: labels.map(label => {
          let counter = 0;
          let total = 0;
          assignments.forEach(a => {
            if (a.subjectName === label && a.grade !== 0) {
              counter += 1;
              total += a.grade;
            }
          });
          const avg = Math.round(total / counter);
          return avg ? avg : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {loading ? (
        <LoadingOverlay visible={true} />
      ) : (
        <Bar style={{ paddingBottom: "30px" }} options={options} data={data} />
      )}
    </>
  );
};

export default ResultChart;
