import {
  Box,
  Divider,
  Heading,
  Text,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import Calendar from "react-calendar";
import "../../assets/Calendar.css";
import ApiService from "../../services/ApiService";
import { ApiResponse, Appointments } from "../../services/types";
import { NewAppointmentButton } from "../Injuries/NewAppointmentModal";

interface CalendarViewProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  timelineFetchCallback: () => void;
}

interface GroupedAppointments {
  [date: string]: Appointments[];
}

export const CalendarView = ({
  date,
  setDate,
  timelineFetchCallback,
}: CalendarViewProps) => {
  const [allAppointments, setAllAppointments] =
    React.useState<GroupedAppointments>({});

  React.useEffect(() => {
    handleFetchAppointments();
  }, []);

  const handleFetchAppointments = async () => {
    const endpoint = "appointments";
    ApiService.get(endpoint).then((res: ApiResponse<GroupedAppointments>) => {
      setAllAppointments(res.data);
      timelineFetchCallback();
    });
  };

  const formatDate = (date: string) => {
    return moment(date, "YYYY-MM-DD").format("MMM D");
  };

  const formatTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box p="1em">
      <Calendar locale="en-US" onChange={setDate} value={date} />
      <NewAppointmentButton cb={handleFetchAppointments} />
      <Box overflowY="auto">
        {allAppointments &&
          Object.keys(allAppointments).map((date) => (
            <Box key={date}>
              <Heading size="sm">{formatDate(date)}</Heading>
              <Divider />
              <UnorderedList p="2" spacing="1">
                {allAppointments[date].map((appointment: Appointments) => (
                  <ListItem>
                    <Text color="gray.900">{appointment.player.name}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {appointment.forTreatment.treatmentName}
                    </Text>
                    <Text fontSize="sm" color="green.500">
                      {formatTime(appointment.dateTime)}
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
