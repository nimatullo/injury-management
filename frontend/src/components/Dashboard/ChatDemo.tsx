import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ApiService from "../../services/ApiService";
import { ApiResponse } from "../../services/types";
import { messages } from "./messages";

export const ChatDemo = () => {
  const [players, setPlayers] = React.useState<any>([]);

  React.useEffect(() => {
    const endpoint = `players/random`;
    ApiService.get(endpoint).then((res: ApiResponse) => {
      if (res.status === 200) {
        setPlayers(res.data);
      }
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
        <Heading size="md">Messages</Heading>
      </CardHeader>

      <CardBody>
        {players.length > 0 &&
          players.map((player: any) => {
            return (
              <HStack
                w="100%"
                borderBottomWidth="1px"
                borderColor="gray.300"
                p="2"
              >
                <Avatar
                  src={player.playerPhoto}
                  name={player.playerName}
                  size="md"
                  backgroundColor="gray.300"
                />
                <Flex flexDirection="column">
                  <Heading size="sm" color="gray.800">
                    {player.name}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {messages[Math.floor(Math.random() * messages.length)]}
                  </Text>
                </Flex>
              </HStack>
            );
          })}
      </CardBody>
    </Card>
  );
};
