import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import React from "react";
import ApiService from "../../services/ApiService";
import { PlayerInformation } from "../../services/types";
import { BsCheckCircleFill, BsFillCalendarPlusFill } from "react-icons/bs";

interface PlayerInformationProps {
  player: PlayerInformation;
}

export const PlayerDetails = ({ player }: PlayerInformationProps) => {
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
      <Grid gridTemplateColumns="1fr 2fr 2fr 2fr">
        {/* Player Information */}
        <Image
          src={player.playerPhoto}
          alt={player.name}
          boxSize="150px"
          objectFit="cover"
          borderRadius="full"
          mr="5"
          backgroundColor={"gray.300"}
          shadow="md"
        />
        <Box ml="5">
          <Heading size="lg" my="2">
            {player.name}
          </Heading>
          <Heading size="md" my="2">
            #{player.number} | {player.position}
          </Heading>
          <Text size="md">Weight: {player.weight} lbs</Text>
          <Text size="md">Height: {player.height}</Text>
        </Box>

        {/* Current Injuries */}
        <Box ml="5">
          <VStack>
            {currentInjuries && (
              <Box>
                <Heading size="md" my="2">
                  {currentInjuries.length} Injuries
                </Heading>
                {currentInjuries.map((injury: any) => {
                  return (
                    <HStack>
                      <Text key={injury.id}>{injury.injuryName}</Text>
                      <Badge colorScheme="red" mr="2">
                        {daysAgo(injury.injuryDate)} days ago
                      </Badge>
                    </HStack>
                  );
                })}
              </Box>
            )}
          </VStack>
        </Box>

        {/* Next Appointment */}
        <Box ml="5">
          <Heading size="md" my="2">
            Next Appointments
          </Heading>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="sm">Fluid Removal</Heading>
            <Text color="gray.700">10/22/2023</Text>
            <HStack>
              <Icon as={BsCheckCircleFill} color="green.500" />
              <Text>10:00 AM</Text>
            </HStack>
          </Flex>
          <Button
            mt="2"
            size="sm"
            leftIcon={<BsFillCalendarPlusFill />}
            colorScheme="black"
          >
            Schedule
          </Button>
        </Box>
      </Grid>
    </Center>
  );
};
