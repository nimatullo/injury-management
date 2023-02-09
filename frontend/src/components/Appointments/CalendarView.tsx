import {
  Box,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
  Card,
  Grid,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Calendar from "react-calendar";
import "../../assets/Calendar.css";
import ApiService from "../../services/ApiService";
import { ApiResponse } from "../../services/types";

export const CalendarView = ({ date, setDate }) => {
  const [allAppointments, setAllAppointments] = React.useState<any[]>([]);

  React.useEffect(() => {
    const endpoint = "appointments";
    ApiService.get(endpoint).then((res: ApiResponse) => {
      setAllAppointments(res.data);
    });
  }, []);

  const formatDate = (date: string) => {
    return moment(date, "YYYY-MM-DD").format("MMMM, Do");
  };

  const formatTime = (time: string) => {
    return moment(time, "HH:mm:ss").format("h:mm A");
  };

  return (
    <Box p="1em">
      <Calendar onChange={setDate} value={date} />
      <hr
        style={{
          margin: "1em",
          borderColor: "#E2E8F0",
        }}
      />
      <Box overflowY="auto">
        {Object.keys(allAppointments).map((date: string) => (
          <Box>
            <Heading size="sm">{formatDate(date)}</Heading>
            <Divider />
            <UnorderedList p="2">
              {allAppointments[date].map((appointment: any) => (
                <ListItem>
                  <Text fontWeight="semibold" color="gray.700">
                    {appointment.player.name}
                  </Text>
                  <Text fontSize="sm" color="gray.700">
                    {appointment.forTreatment.treatmentName} at{" "}
                    <strong>{formatTime(appointment.time)}</strong>
                  </Text>
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
