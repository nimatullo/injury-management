import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as React from "react";
import ApiService from "../../services/ApiService";

export const TeamInjurySummary = (props: any) => {
  const [injuredPlayers, setInjuredPlayers] = React.useState<any>([]);

  React.useEffect(() => {
    ApiService.getInjuredPlayers().then((data: any) => {
      setInjuredPlayers(data);
    });
  }, []);

  return (
    <Card borderWidth={"1px"} borderColor="gray.100">
      <CardHeader>
        <Heading size="md">Latest Injuries</Heading>
      </CardHeader>

      <CardBody>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Player</Th>
                <Th>Injury</Th>
                <Th isNumeric>Injury Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {injuredPlayers.map((player: any) => {
                return (
                  <Tr key={player.id}>
                    <Td>{player.name}</Td>
                    <Td>{player.injuries[0].injuryName}</Td>
                    <Td isNumeric>
                      {new Date(
                        player.injuries[0].injuryDate
                      ).toLocaleDateString()}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
};
