import { Box, Flex, FormLabel, Select } from "@chakra-ui/react";
import React from "react";
import ApiService from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { NewMeasurementButton } from "./NewMeasurementModal";
import { ApiResponse, Exercise } from "../../services/types";
import { LineChartWGradient } from "../Charts/LineChartWGradient";

const categoryToExcersise: any = {
  Balance: ["Single Leg Balance", "Double Leg Balance"],
  "Range of Motion": ["Shoulder", "Elbow", "Wrist", "Hip", "Knee", "Ankle"],
  Power: ["Single Leg Power", "Double Leg Power"],
  Stability: ["Single Leg Stability", "Double Leg Stability"],
};

export const InjuryGraphs = ({ cb }: { cb: () => void }) => {
  const [selectedCategory, setSelectedCategory] = React.useState("Balance");
  const [selectedExcersise, setSelectedExcersise] =
    React.useState("Single Leg Balance");

  const [graphData, setGraphData] = React.useState<Exercise[]>([]);
  const [lastExerciseDate, setLastExerciseDate] = React.useState<Date>();

  const params = useParams();

  React.useEffect(() => {
    fetchGraphData();
  }, [selectedExcersise]);

  React.useEffect(() => {
    fetchGraphData();
  }, [params]);

  const fetchGraphData = async () => {
    const endpoint = `players/${params.id}/measurements/${selectedExcersise}`;
    ApiService.get(endpoint).then((res: ApiResponse<Exercise[]>) => {
      setGraphData(res.data);
      if (res.data.length > 0) {
        setLastExerciseDate(new Date(res.data[res.data.length - 1].date));
      }
    });
  };

  return (
    <>
      <Flex padding="1em" alignItems="end" w="100%">
        <Box mx="5">
          <FormLabel>Category</FormLabel>
          <Select
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedExcersise(categoryToExcersise[e.target.value][0]);
            }}
          >
            <option value="Balance">Balance</option>
            <option value="Range of Motion">Range of Motion</option>
            <option value="Power">Power</option>
            <option value="Stability">Stability</option>
          </Select>
        </Box>

        <Box>
          <FormLabel>Excersise</FormLabel>
          <Select onChange={(e) => setSelectedExcersise(e.target.value)}>
            {categoryToExcersise[selectedCategory].map((exercise: string) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </Select>
        </Box>
        <NewMeasurementButton
          id={params.id as string}
          category={selectedCategory}
          exercise={selectedExcersise}
          callback={() => {
            fetchGraphData();
            cb();
          }}
          lastExerciseDate={lastExerciseDate}
        />
      </Flex>
      <Flex
        flexDirection="row-reverse"
        p="2em"
        position="absolute"
        right="0"
      ></Flex>
      <LineChartWGradient exercise={selectedExcersise} graphData={graphData} />
    </>
  );
};
