import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Icon,
  Flex,
  Button,
  Tooltip,
  CardFooter,
} from "@chakra-ui/react";
import React from "react";
import {
  BsCheckCircleFill,
  BsFillClockFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { ApiResponse } from "../../services/types";
import { NewAppointmentButton } from "../Injuries/NewAppointmentModal";

export const TodayAppointments = () => {
  const [appointments, setAppointments] = React.useState<any>([]);

  React.useEffect(() => {
    const endpoint = "players/appointments/today";
    ApiService.get(endpoint).then((res: ApiResponse) => {
      if (res.status === 200) {
        setAppointments(res.data.splice(0, 5));
      }
    });
  }, []);

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hours12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) < 12 || parseInt(hours) === 24 ? "AM" : "PM";
    return `${hours12}:${minutes} ${ampm}`;
  };

  const getConfirmation = () => {
    const statuses = ["Confirmed", "Cancelled", "Pending"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    if (randomStatus === "Confirmed") {
      return (
        <Tooltip label="Confirmed" aria-label="Confirmed" bg="green.500">
          <span>
            <Icon as={BsCheckCircleFill} color="green.500" />
          </span>
        </Tooltip>
      );
    } else if (randomStatus === "Cancelled") {
      return (
        <Tooltip label="Cancelled" aria-label="Cancelled" bg="red.500">
          <span>
            <Icon as={BsFillXCircleFill} color="red.500" />
          </span>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip label="Pending" aria-label="Pending" bg="yellow.500">
          <span>
            <Icon as={BsFillClockFill} color="yellow.500" />
          </span>
        </Tooltip>
      );
    }
  };

  const navigate = useNavigate();

  return (
    <Card
      borderWidth={"1px"}
      borderColor="gray.100"
      h="100%"
      backgroundColor="#FAFAFC"
      overflowY="auto"
    >
      <CardHeader>
        <Heading size="md">Today's Appointments</Heading>
      </CardHeader>

      <CardBody>
        <Stack spacing={4}>
          {appointments.length > 0 &&
            appointments.map((appointment: any) => {
              return (
                <Grid
                  templateColumns="1fr 2fr 1fr"
                  alignItems="center"
                  justifyItems="start"
                  borderBottomWidth={1}
                  borderColor="gray.200"
                  p="1"
                >
                  <Avatar
                    key={appointment.id}
                    name={appointment.player.name}
                    src={appointment.player.playerPhoto}
                    size="md"
                    backgroundColor="gray.300"
                  />
                  <Flex flexDir="column" alignItems="flex-start">
                    <Text
                      fontWeight="bold"
                      color="gray.800"
                      onClick={() =>
                        navigate(`/${appointment.player.id}/appointments`)
                      }
                      _hover={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {appointment.player.name}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {appointment.forTreatment.treatmentName}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    {getConfirmation()}
                    <Text ml="2" color="gray.600" fontSize="md">
                      {formatTime(appointment.time)}
                    </Text>
                  </Flex>
                </Grid>
              );
            })}
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          variant="link"
          colorScheme="black"
          onClick={() => navigate("/appointments")}
        >
          View All
        </Button>
      </CardFooter>
    </Card>
  );
};
