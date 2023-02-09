import React from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import ApiService from "../../services/ApiService";
import * as logos from "react-nba-logos";
import moment from "moment";

const Logos = {
  ATL: logos.ATL,
  BOS: logos.BOS,
  BKN: logos.BKN,
  CHA: logos.CHA,
  CHI: logos.CHI,
  CLE: logos.CLE,
  DAL: logos.DAL,
  DEN: logos.DEN,
  DET: logos.DET,
  GSW: logos.GSW,
  HOU: logos.HOU,
  IND: logos.IND,
  LAC: logos.LAC,
  LAL: logos.LAL,
  MEM: logos.MEM,
  MIA: logos.MIA,
  MIL: logos.MIL,
  MIN: logos.MIN,
  NOP: logos.NOP,
  NYK: logos.NYK,
  OKC: logos.OKC,
  ORL: logos.ORL,
  PHI: logos.PHI,
  PHX: logos.PHX,
  POR: logos.POR,
  SAC: logos.SAC,
  SAS: logos.SAS,
  TOR: logos.TOR,
  UTA: logos.UTA,
  WAS: logos.WAS,
};

export const UpcomingGame = () => {
  const [upcomingGame, setUpcomingGame] = React.useState<any>(null);
  React.useEffect(() => {
    ApiService.getUpcomingGame().then((data: any) => {
      console.log(data);
      setUpcomingGame(data);
    });
  }, []);

  const getLogo = (team: string) => {
    const Logo = Logos[team];
    return <Logo />;
  };

  const formatDate = (date: string) => {
    return moment(date).format("MM/DD/YYYY");
  };

  return (
    <>
      {upcomingGame && (
        <Card
          borderWidth={"1px"}
          borderColor="gray.100"
          h="100%"
          backgroundColor="#FAFAFC"
        >
          <CardHeader>
            <HStack alignItems="flex-end">
              <Heading size="md">Upcoming Game</Heading>
              <Text fontSize="sm" color="gray.500">
                {moment(upcomingGame.gdte).format("MMM do, YYYY")}
              </Text>
            </HStack>
          </CardHeader>
          <CardBody>
            <Flex alignItems="center" w="100%" justifyContent="space-evenly">
              <Stack textAlign="center">
                {getLogo(upcomingGame.v.ta)}
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
                {getLogo(upcomingGame.h.ta)}
                <Heading size="lg">{upcomingGame.h.ta}</Heading>
              </Stack>
            </Flex>
          </CardBody>
        </Card>
      )}
    </>
  );
};
