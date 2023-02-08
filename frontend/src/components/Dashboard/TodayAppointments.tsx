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
} from "@chakra-ui/react";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
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

  const navigate = useNavigate();

  return (
    <Card
      borderWidth={"1px"}
      borderColor="gray.100"
      h="100%"
      backgroundColor="#FAFAFC"
      position="relative"
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
                  borderColor="gray.300"
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
                    <Text fontWeight="bold" color="gray.800">
                      {appointment.player.name}
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                      {appointment.forTreatment.treatmentName}
                    </Text>
                  </Flex>
                  <Flex alignItems="center">
                    {Math.random() > 0.5 ? (
                      <Icon as={BsCheckCircleFill} color="green.500" />
                    ) : (
                      <Icon as={MdCancel} color="red.500" />
                    )}
                    <Text ml="2" color="gray.600" fontSize="md">
                      {formatTime(appointment.time)}
                    </Text>
                  </Flex>
                </Grid>
              );
            })}
        </Stack>

        <Flex mt="4" position="absolute" bottom="0" py="1em">
          <Button
            variant="link"
            colorScheme="black"
            onClick={() => navigate("/appointments")}
          >
            View All
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};
