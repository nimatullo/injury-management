import { Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { ApiResponse, PlayerInformation } from "../../services/types";
import { NewAppointmentButton } from "../Injuries/NewAppointmentModal";
import { AppointmentsList } from "./AppointmentsList";

interface AppointmentsSummaryProps {
  player: PlayerInformation;
  injuries: any[];
}

export const AppointmentsSummary = ({
  player,
  injuries,
}: AppointmentsSummaryProps) => {
  const [upcomingAppointments, setUpcomingAppointments] = React.useState<any>(
    []
  );

  const navigate = useNavigate();

  React.useEffect(() => {
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

  return (
    <>
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
        {upcomingAppointments ? (
          <AppointmentsList appointments={upcomingAppointments} />
        ) : (
          <Text>Loading...</Text>
        )}
      </Flex>
      <NewAppointmentButton
        player={player}
        injuries={injuries}
        cb={fetchAppointments}
      />
    </>
  );
};
