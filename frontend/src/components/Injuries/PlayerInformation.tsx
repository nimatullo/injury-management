import {
  Badge,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import ApiService from "../../services/ApiService";
import { PlayerInformation } from "../../services/types";
import { AppointmentsSummary } from "../Appointments/AppointmentsSummary";

export interface PlayerInformationProps {
  player: PlayerInformation;
  isExtended?: boolean;
}

const recoveredInjuries = ["Ankle", "Back", "Calf"];

export const PlayerDetails = ({
  player,
  isExtended,
}: PlayerInformationProps) => {
  const [currentInjuries, setCurrentInjuries] = React.useState<any>([]);

  React.useEffect(() => {
    ApiService.getInjuriesForPlayer(player.id).then((data: any) => {
      setCurrentInjuries(data);
    });
  }, []);

  const daysAgo = (date: string) => {
    const today = new Date();
    const injuryDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - injuryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Center p="5" borderBottomWidth={"1px"} borderBottomColor="gray.200">
      <Grid gridTemplateColumns="1fr 1fr 1fr">
        {/* Player Information */}
        <Flex ml="5">
          <Image
            src={player.playerPhoto}
            alt={player.name}
            boxSize="150px"
            objectFit="cover"
            borderRadius="full"
            mr="5"
            backgroundColor="gray.100"
            shadow="md"
          />
          <Flex flexDir="column">
            <Heading size="lg" my="2">
              {player.name}
            </Heading>
            <Heading size="md" my="2">
              #{player.number} | {player.position}
            </Heading>
            <Text size="md">Weight: {player.weight} lbs</Text>
            <Text size="md">Height: {player.height}</Text>
          </Flex>
        </Flex>

        {/* Current Injuries */}
        <GridItem ml="5">
          <VStack>
            {currentInjuries && (
              <Box>
                <Heading size="md" my="2">
                  {currentInjuries.length} Injuries
                </Heading>
                {currentInjuries.map((injury: any) => {
                  return (
                    <HStack key={injury.id}>
                      <Text>{injury.injuryName}</Text>
                      <Badge colorScheme="red" mr="2">
                        {daysAgo(injury.injuryDate)} days ago
                      </Badge>
                    </HStack>
                  );
                })}
                <Text>
                  {
                    recoveredInjuries[
                      Math.floor(Math.random() * recoveredInjuries.length)
                    ]
                  }
                  <Badge colorScheme="green" ml="2">
                    Recovered
                  </Badge>
                </Text>
              </Box>
            )}
          </VStack>
        </GridItem>

        {/* Next Appointment */}
        <GridItem
          ml="5"
          backgroundColor="#1d1d1d"
          color="whiteAlpha.900"
          borderRadius="md"
          p="1em"
          boxShadow="md"
        >
          <AppointmentsSummary
            isExtended={isExtended}
            player={player}
            injuries={currentInjuries}
          />
        </GridItem>
      </Grid>
    </Center>
  );
};
