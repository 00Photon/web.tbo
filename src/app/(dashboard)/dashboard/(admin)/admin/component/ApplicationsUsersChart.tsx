import { useState } from "react";

// * React-Chart Type Imports
import { Line } from "react-chartjs-2";

// * ChartJS Imports
import {
  Chart as Chartjs,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// * Utility Imports
import { formatDay, formatDate } from "@/@core/utils/format";

// * MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

Chartjs.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const SupText = styled("span")(({}) => ({
  color: "#335CFF",
}));

const SubText = styled("span")(({}) => ({
  color: "#AAAAAA",
  fontWeight: 400,
}));

const generateLabels = (range: string) => {
  let labels = [];
  let today = new Date();

  if (range === "weekly") {
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      labels.push(formatDay(date));
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(formatDate(date));
    }
  }
  return labels;
};

export const ApplicationUserChart = () => {
  const [intervals, setIntervals] = useState<string>("weekly");
  // Dummy Data
  const data = {
    labels: generateLabels(intervals),
    datasets: [
      {
        label: "Applications",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(230, 28, 49, 0.5)",
        borderRadius: 7,
      },
      {
        label: "Users",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        borderColor: "rgba(51, 92, 255, 0.5)",
        borderRadius: 7,
      },
    ],
  };
  // Bar Chart Options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        align: "end" as const,
      },
    },
  };

  return (
    <Paper sx={{ p: 3, width: "100%", my: 4 }}>
      <Typography sx={{ fontWeight: 600, color: "primary.main" }}>
        Total Users <SubText>vs</SubText> <SupText>Applications</SupText>
      </Typography>
      <Line options={options} data={data} />
    </Paper>
  );
};

export const JobApplicationChart = () => {
  const [intervals, setIntervals] = useState<string>("weekly");
  // Dummy Data
  const data = {
    labels: generateLabels(intervals),
    datasets: [
      {
        label: "Applications",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgba(230, 28, 49, 0.5)",
        borderRadius: 7,
      },
      {
        label: "Users",
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true,
        borderColor: "rgba(51, 92, 255, 0.5)",
        borderRadius: 7,
      },
    ],
  };
  // Bar Chart Options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        align: "end" as const,
      },
    },
  };
  return (
    <Paper
      sx={{
        p: 3,
        width: "100%",
        my: 4,
        background: (theme) => theme.palette.primary.light,
      }}
    >
      <Typography sx={{ fontWeight: 600, color: "#8E00B2" }}>
        Total Jobs Applied <SubText>vs</SubText>{" "}
        <SupText sx={{ color: "primary.main" }}>Applications Withdrawn</SupText>
      </Typography>
      <Line options={options} data={data} />
    </Paper>
  );
};
