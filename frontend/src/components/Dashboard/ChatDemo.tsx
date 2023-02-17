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
import { ApiResponse, Player } from "../../services/types";
import { messages } from "./messages";

export const ChatDemo = () => {
  const [playerNames, setPlayerNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const endpoint = `players/random`;
    ApiService.get(endpoint).then((res: ApiResponse<string[]>) => {
      if (res.status === 200) {
        setPlayerNames(res.data);
      }
    });
  }, []);

  const getAvatarBgColor = () => {
    // Return random pastel color
    const colors = [
      "red.300",
      "orange.300",
      "yellow.300",
      "green.300",
      "teal.300",
      "blue.300",
      "cyan.300",
      "purple.300",
      "pink.300",
      "green.300",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card
      borderWidth={"1px"}
      borderColor="gray.100"
      h="100%"
      backgroundColor="#FAFAFC"
      overflowY="auto"
    >
      <CardHeader>
        <Heading size="md">Messages</Heading>
      </CardHeader>

      <CardBody>
        {playerNames.length > 0 &&
          playerNames.map((name: string) => {
            return (
              <HStack
                key={name}
                w="100%"
                borderBottomWidth="1px"
                borderColor="gray.200"
                p="2"
              >
                <Avatar
                  name={name}
                  size="md"
                  backgroundColor={getAvatarBgColor()}
                />
                <Flex flexDirection="column">
                  <Heading size="sm" color="gray.800">
                    {name}
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
