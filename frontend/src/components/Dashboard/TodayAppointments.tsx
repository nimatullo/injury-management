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
  GridItem,
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

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
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
                  templateColumns="repeat(4, 1fr)"
                  alignItems="center"
                  justifyItems="start"
                  borderBottomWidth={1}
                  borderColor="gray.200"
                  p="1"
                >
                  <GridItem>
                    <Avatar
                      key={appointment.id}
                      name={appointment.player.name}
                      src={appointment.player.playerPhoto}
                      size="md"
                      backgroundColor="gray.300"
                    />
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Flex flexDir="column" alignItems="flex-start">
                      <Text fontWeight="bold" color="gray.800">
                        {appointment.player.name}
                      </Text>
                      <Text color="gray.600" fontSize="sm">
                        {appointment.forTreatment.treatmentName}
                      </Text>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex alignItems="center">
                      {getConfirmation()}
                      <Text
                        whiteSpace="nowrap"
                        ml="2"
                        color="gray.600"
                        fontSize="md"
                      >
                        {formatTime(appointment.dateTime)}
                      </Text>
                    </Flex>
                  </GridItem>
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
