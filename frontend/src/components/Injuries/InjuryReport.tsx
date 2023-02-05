import { Box } from "@chakra-ui/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { ApiResponse } from "../../services/types";
import { InjuryGraphs } from "./InjuryGraphs";
import { PlayerDetails } from "./PlayerInformation";

export const InjuryReport = () => {
  const [player, setPlayer] = React.useState<any>(null);

  React.useEffect(() => {
    const endpoint = `players/${params.id}`;
    ApiService.get(endpoint).then((res: ApiResponse) => {
      setPlayer(res.data);
    });
  }, []);

  const params = useParams();

  return (
    <Box mt="5">
      <div>{player && <PlayerDetails player={player} />}</div>
      <InjuryGraphs />
    </Box>
  );
};
