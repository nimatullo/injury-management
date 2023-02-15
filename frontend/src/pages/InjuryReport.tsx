import { Box } from "@chakra-ui/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import ApiService from "../services/ApiService";
import { ApiResponse, Player } from "../services/types";
import { InjuryGraphs } from "../components/Injuries/InjuryGraphs";
import { PlayerDetails } from "../components/Injuries/PlayerInformation";

export const InjuryReport = () => {
  const params = useParams();
  const [player, setPlayer] = React.useState<Player | null>(null);

  React.useEffect(() => {
    fetchPlayerInfo();
  }, []);

  React.useEffect(() => {
    fetchPlayerInfo();
  }, [params]);

  const fetchPlayerInfo = async () => {
    let endpoint = `players/${params.id}`;
    ApiService.get(endpoint).then((res: ApiResponse<Player>) => {
      setPlayer(res.data);
    });
  };

  return (
    <Box mt="5" w="90%">
      <div>{player && <PlayerDetails player={player} />}</div>
      <InjuryGraphs cb={fetchPlayerInfo} />
    </Box>
  );
};
