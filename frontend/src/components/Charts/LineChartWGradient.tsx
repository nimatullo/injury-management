import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartArea,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Box, Center, Text } from "@chakra-ui/react";
import moment from "moment";
import { Exercise } from "../../services/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type LineChartWGradientProps = {
  graphData: Exercise[];
  exercise: string;
};

export const LineChartWGradient = ({
  graphData,
  exercise,
}: LineChartWGradientProps) => {
  const createGradient = (
    ctx: CanvasRenderingContext2D,
    area: ChartArea
  ): CanvasGradient | null => {
    if (!area) return null;
    const gradient = ctx.createLinearGradient(0, 0, 0, area.bottom);
    gradient.addColorStop(0, "rgba(57, 57, 57, 0.8)");
    gradient.addColorStop(0.75, "rgba(57, 57, 57, 0.1)");
    return gradient;
  };

  const formatData = (): any => {
    return {
      labels: graphData.map((data) => moment(data.date).format("MMM Do")),
      datasets: [
        {
          label: "Measurements",
          data: graphData.map((data) => Number(data.measurement)),
          fill: true,
          lineTension: 0.4,
          radius: 3,
          borderWidth: 4,
          borderColor: "#1d1d1d",
          backgroundColor: (ctx: any) =>
            createGradient(ctx.chart.ctx, ctx.chart.chartArea),
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      title: {
        display: true,
        text: `Performance on ${exercise}`,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Measurement",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date Evaluated",
        },
      },
    },
  };

  return (
    <Box height="500px" margin="1em" w="100%">
      {graphData && graphData.length > 0 ? (
        <Line data={formatData()} options={options} />
      ) : (
        <Center>
          <Text color="gray.700">No data to display</Text>
        </Center>
      )}
    </Box>
  );
};
