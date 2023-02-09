import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { RangeChart } from "../components/Charts/RangeChart";
import { PlayerDetails } from "../components/Injuries/PlayerInformation";
import ApiService from "../services/ApiService";
import { ApiResponse } from "../services/types";

export const Appointments = () => {
  const [player, setPlayer] = React.useState<any>(null);

  const params = useParams();

  React.useEffect(() => {
    const endpoint = `players/${params.id}`;
    ApiService.get(endpoint).then((res: ApiResponse) => {
      setPlayer(res.data);
    });
  }, []);

  return (
    player && (
      <>
        <PlayerDetails player={player} isExtended={true} />

        <RangeChart playerId={player.id} />
      </>
    )
  );
};
