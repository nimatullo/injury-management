import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";

export const TeamInjurySummary = (props: any) => {
  const [injuredPlayers, setInjuredPlayers] = React.useState<any>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    ApiService.getInjuredPlayers().then((data: any) => {
      setInjuredPlayers(data);
    });
  }, []);

  return (
    <Card
      borderWidth={"1px"}
      borderColor="gray.100"
      h="100%"
      backgroundColor="#FAFAFC"
    >
      <CardHeader>
        <Heading size="md">Latest Injuries</Heading>
      </CardHeader>

      <CardBody>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Player</Th>
                <Th>Injury</Th>
                <Th isNumeric>Injury Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {injuredPlayers.length > 0 &&
                injuredPlayers.map((player: any) => {
                  return (
                    <Tr
                      key={player.id}
                      _hover={{
                        background: "gray.100",
                        cursor: "pointer",
                        borderRadius: "md",
                      }}
                      onClick={() => {
                        navigate(player.id + "/injury-report");
                      }}
                    >
                      <Td>
                        <Wrap>
                          <WrapItem>
                            <Avatar
                              background={"gray.300"}
                              size="md"
                              name={player.name}
                              src={player.playerPhoto}
                            />
                          </WrapItem>
                        </Wrap>
                      </Td>
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
