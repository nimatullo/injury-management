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
  isExtended?: boolean;
}

export const AppointmentsSummary = ({
  player,
  injuries,
  isExtended,
}: AppointmentsSummaryProps) => {
  const [upcomingAppointments, setUpcomingAppointments] = React.useState<any>(
    []
  );

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchAppointments();
    console.log("isExtended", isExtended);
  }, []);

  const fetchAppointments = async () => {
    let endpoint = `players/${player.id}/appointments`;
    if (isExtended) {
      endpoint += "/all";
    }

    ApiService.get(endpoint).then((res: ApiResponse) => {
      if (res.status === 200) {
        if (isExtended) {
          setUpcomingAppointments({
            appointments: res.data,
          });
        } else {
          setUpcomingAppointments(res.data);
        }
      }
    });
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
          <AppointmentsList
            appointments={upcomingAppointments}
            isExtended={isExtended}
          />
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
