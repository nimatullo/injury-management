import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { Chart, AxisOptions } from "react-charts";

type RangeOfMotionData = {
  measurement: number;
  date: string;
};

type RangeOfMotionSeries = {
  label: string;
  data: RangeOfMotionData[];
  color: string;
};

const formatData = (graphData) => {
  // Create range of motion series with 30 days of data for just shoulder

  const rangeOfMotionData: RangeOfMotionSeries[] = [
    {
      label: "Measurements",
      data: graphData,
      color: "black",
    },
  ];

  return rangeOfMotionData;
};

export const LineChart = ({ graphData }) => {
  const primaryAxis = React.useMemo(
    (): AxisOptions<RangeOfMotionData> => ({
      getValue: (datum) => new Date(datum.date),
      tickCount: 8,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<RangeOfMotionData>[] => [
      {
        getValue: (datum) => Number(datum.measurement),
        tickCount: 10,
      },
    ],
    []
  );

  return (
    <Box height="500px" margin="1em" w="100%">
      {graphData && graphData.length > 0 ? (
        <Chart
          options={{
            data: formatData(graphData),
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
