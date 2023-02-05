import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { LineChart } from "./Charts/LineChart";
import { AiFillPlusCircle } from "react-icons/ai";
import React from "react";
import ApiService from "../../services/ApiService";
import { useParams } from "react-router-dom";
import { NewMeasurementButton } from "./NewMeasurementModal";

const categoryToExcersise: any = {
  Balance: ["Single Leg Balance", "Double Leg Balance"],
  "Range of Motion": ["Shoulder", "Elbow", "Wrist", "Hip", "Knee", "Ankle"],
  Power: ["Single Leg Power", "Double Leg Power"],
  Stability: ["Single Leg Stability", "Double Leg Stability"],
};

export const InjuryGraphs = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("Balance");
  const [selectedExcersise, setSelectedExcersise] =
    React.useState("Single Leg Balance");

  const [graphData, setGraphData] = React.useState<any>(null);

  const params = useParams();

  // Fetch data for graph for selected excersise
  React.useEffect(() => {
    fetchGraphData();
  }, [selectedExcersise]);

  const fetchGraphData = async () => {
    const endpoint = `players/${params.id}/measurements/${selectedExcersise}`;
    ApiService.get(endpoint).then((res: any) => {
      console.log(res.data);
      setGraphData(res.data);
    });
  };

  return (
    <>
      <Flex padding="1em" alignItems="end" width="100vw">
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
            {categoryToExcersise[selectedCategory].map((excersise: string) => (
              <option value={excersise}>{excersise}</option>
            ))}
          </Select>
        </Box>
        <NewMeasurementButton
          id={params.id as string}
          category={selectedCategory}
          exercise={selectedExcersise}
          callback={fetchGraphData}
        />
      </Flex>
      <Flex
        flexDirection="row-reverse"
        p="2em"
        position="absolute"
        right="0"
      ></Flex>
      <LineChart graphData={graphData} />
    </>
  );
};
