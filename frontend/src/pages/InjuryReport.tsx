import { Box } from "@chakra-ui/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import ApiService from "../services/ApiService";
import { ApiResponse } from "../services/types";
import { InjuryGraphs } from "../components/Injuries/InjuryGraphs";
import { PlayerDetails } from "../components/Injuries/PlayerInformation";
import { NewAppointmentButton } from "../components/Injuries/NewAppointmentModal";

export const InjuryReport = () => {
  const [player, setPlayer] = React.useState<any>(null);

  React.useEffect(() => {
    let endpoint = `players/${params.id}`;
    ApiService.get(endpoint).then((res: ApiResponse) => {
      setPlayer(res.data);
    });
  }, []);

  const params = useParams();

  return (
    <Box mt="5" w="90%">
      <div>{player && <PlayerDetails player={player} />}</div>
      <InjuryGraphs />
    </Box>
  );
};
