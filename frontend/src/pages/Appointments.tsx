import React from "react";
import { useParams } from "react-router-dom";
import { RangeChart } from "../components/Injuries/Charts/RangeChart";
import { RangeChart2 } from "../components/Injuries/Charts/RangeChart2";
import { PlayerDetails } from "../components/Injuries/PlayerInformation";
import ApiService from "../services/ApiService";
import { ApiResponse } from "../services/types";

export const Appointments = () => {
  const [player, setPlayer] = React.useState<any>(null);
  const [appointments, setAppointments] = React.useState<any>(null);

  const params = useParams();

  React.useEffect(() => {
    const endpoint = `players/${params.id}`;
    ApiService.get(endpoint).then((res: ApiResponse) => {
      setPlayer(res.data);
    });

    ApiService.get(`players/${params.id}/appointments`).then(
      (res: ApiResponse) => {
        if (res.status === 200) {
          setAppointments(
            res.data.map((a: any) => {
              const date = new Date(a.date);
              const time = a.time.split(":");
              date.setHours(parseInt(time[0]));
              date.setMinutes(parseInt(time[1]));
              a.date = date;
              return a;
            })
          );
        }
      }
    );
  }, []);

  return (
    <>
      {player && <PlayerDetails player={player} />}

      {appointments && <RangeChart2 playerId={player.id} />}
    </>
  );
};
