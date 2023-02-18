import { Heading, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { ApiResponse, Exercise } from "../../services/types";

interface ExercisesSummaryProps {
  playerId: string;
}

export const ExercisesSummary = ({ playerId }: ExercisesSummaryProps) => {
  const [exercises, setExercises] = React.useState<Exercise[]>([]);
  const params = useParams();

  React.useEffect(() => {
    handleFetchResources();
  }, []);

  React.useEffect(() => {
    handleFetchResources();
  }, [params]);

  const handleFetchResources = async () => {
    const endpoint = `players/${playerId}/exercises`;
    ApiService.get(endpoint).then((res: ApiResponse<Exercise[]>) => {
      if (res.status === 200) {
        setExercises(res.data);
      }
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    });
  };

  return exercises.length > 0 ? (
    <>
      <Heading size="md" mb="2">
        Latest Exercises
      </Heading>
      <Table variant="simple" size="sm" borderColor="transparent">
        <Tbody>
          {exercises.map((exercise) => (
            <Tr key={exercise.id}>
              <Td border="0px" py="1" paddingStart="0">
                <Heading size="sm">{exercise.name}</Heading>
              </Td>
              <Td border="0px" py="1" paddingStart="0" isNumeric>
                {exercise.measurement}
              </Td>
              <Td border="0px" py="1" paddingStart="0" isNumeric>
                <Text fontSize="sm">{formatDate(exercise.date)}</Text>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  ) : (
    <Text>No exercises have been added for this player yet.</Text>
  );
};
