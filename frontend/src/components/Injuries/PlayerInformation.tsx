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
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import ApiService from "../../services/ApiService";
import { ApiResponse, PlayerInformation } from "../../services/types";
import { BsCheckCircleFill, BsFillCalendarPlusFill } from "react-icons/bs";
import { NewAppointmentButton } from "./NewAppointmentModal";
import { useNavigate } from "react-router-dom";

interface PlayerInformationProps {
  player: PlayerInformation;
}

export const PlayerDetails = ({ player }: PlayerInformationProps) => {
  const [currentInjuries, setCurrentInjuries] = React.useState<any>([]);
  const [upcomingAppointments, setUpcomingAppointments] = React.useState<any>(
    []
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    ApiService.getInjuriesForPlayer(player.id).then((data: any) => {
      setCurrentInjuries(data);
    });

    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    ApiService.get(`players/${player.id}/appointments`).then(
      (res: ApiResponse) => {
        if (res.status === 200) {
          setUpcomingAppointments(res.data);
        }
      }
    );
  };

  const convert24to12 = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hours12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 || parseInt(hours) === 24 ? "AM" : "PM";
    return `${hours12}:${minutes} ${ampm}`;
  };

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
        <Flex
          ml="5"
          // backgroundColor="#1d1d1d"
          // color="white"
          // borderRadius="md"
          // p="1em"
          // boxShadow="md"
        >
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
          <Heading
            size="md"
            my="2"
            onClick={() => navigate(`/${player.id}/appointments`)}
            _hover={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Next Appointments
          </Heading>
          <Flex flexDir="column">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment: any) => {
                return (
                  <Flex justifyContent="space-between" alignItems="center">
                    <Heading size="sm">
                      {appointment.forTreatment.treatmentName}
                    </Heading>
                    <Text>
                      {new Date(appointment.date).toLocaleDateString()}
                    </Text>
                    <HStack>
                      <Text>{convert24to12(appointment.time)}</Text>
                      <Icon as={BsCheckCircleFill} color="green.500" />
                    </HStack>
                  </Flex>
                );
              })
            ) : (
              <Text>No upcoming appointments</Text>
            )}
          </Flex>
          <NewAppointmentButton
            player={player}
            injuries={currentInjuries}
            cb={fetchAppointments}
          />
        </GridItem>
      </Grid>
    </Center>
  );
};
