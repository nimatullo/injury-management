import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { Chart, AxisOptions } from "react-charts";
import { Exercise } from "../../services/types";

type RangeOfMotionData = {
  measurement: number;
  date: string;
};

type RangeOfMotionSeries = {
  label: string;
  data: RangeOfMotionData[];
  color: string;
};

interface LineChartProps {
  graphData: Exercise[];
}

const formatData = (graphData: RangeOfMotionData[]) => {
  const rangeOfMotionData: RangeOfMotionSeries[] = [
    {
      label: "Measurements",
      data: graphData,
      color: "black",
    },
  ];

  return rangeOfMotionData;
};

export const LineChart = ({ graphData }: LineChartProps) => {
  const primaryAxis = React.useMemo(
    (): AxisOptions<RangeOfMotionData> => ({
      getValue: (datum) => new Date(datum.date),
      tickCount: 8,
      min: new Date(graphData[0].date),
      max: new Date(graphData[graphData.length - 1].date),
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RangeOfMotionData>[] => [
      {
        getValue: (datum) => Number(datum.measurement),
        tickCount: 10,
        elementType: "area",
      },
    ],
    []
  );

  return (
    <Box height="500px" margin="1em" w="100%">
      {graphData && graphData.length > 0 ? (
        <Chart
          options={{
            data: formatData(graphData as any),
            primaryAxis,
            secondaryAxes,
            interactionMode: "closest",
            tooltip: false,
            getSeriesStyle: (series) => ({
              color: "black",
              strokeWidth: 4,
            }),
          }}
        />
      ) : (
        <Center>
          <Text color="gray.700">No data to display</Text>
        </Center>
      )}
    </Box>
  );
};
