import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import ApiService from "../../services/ApiService";
import moment from "moment";
import { TeamLogo } from "./TeamLogo";

export const UpcomingGame = () => {
  const [upcomingGame, setUpcomingGame] = React.useState<any>(null);
  React.useEffect(() => {
    ApiService.getUpcomingGame().then((data: any) => {
      setUpcomingGame(data);
    });
  }, []);

  const formatDate = (date: string) => {
    return moment(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <Card
        borderWidth={"1px"}
        borderColor="gray.100"
        h="100%"
        backgroundColor="#FAFAFC"
      >
        {upcomingGame ? (
          <>
            <CardHeader>
              <HStack alignItems="flex-end">
                <Heading size="md">Upcoming Game</Heading>
                <Text fontSize="sm" color="gray.500">
                  {moment(upcomingGame.gdte).format("MMM Do, YYYY")}
                </Text>
              </HStack>
            </CardHeader>
            <CardBody>
              <Flex alignItems="center" w="100%" justifyContent="space-evenly">
                <Stack textAlign="center">
                  <TeamLogo team={upcomingGame.v.ta} />
                  <Heading size="lg">{upcomingGame.v.ta}</Heading>
                </Stack>
                <Box textAlign="center">
                  <Text fontSize="sm">{formatDate(upcomingGame.gdte)}</Text>
                  <Heading>at</Heading>
                  <Text fontSize="sm">{upcomingGame.stt}</Text>
                  <Text>
                    <strong>{upcomingGame.an}</strong>
                  </Text>
                </Box>
                <Stack textAlign="center">
                  <TeamLogo team={upcomingGame.h.ta} />
                  <Heading size="lg">{upcomingGame.h.ta}</Heading>
                </Stack>
              </Flex>
            </CardBody>
          </>
        ) : (
          <Center h="100%">
            <Spinner />
          </Center>
        )}
      </Card>
    </>
  );
};
