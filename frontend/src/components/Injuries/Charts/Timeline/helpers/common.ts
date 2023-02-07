import ApiService from "../../../../../services/ApiService";

export const fetchEpg = async (playerId: string) => {
  return ApiService.get(`players/${playerId}/appointments`).then((response) => {
    if (response.status === 200) {
      return response.data.map((a: any, index: number) => {
        const start = new Date(a.date);
        start.setHours(parseInt(a.time.split(":")[0]));
        start.setMinutes(parseInt(a.time.split(":")[1]));

        const end = new Date(a.date);
        end.setHours(parseInt(a.time.split(":")[0]) + 1);
        end.setMinutes(parseInt(a.time.split(":")[1]));

        return {
          id: a.id,
          title: a.forTreatment.treatmentName,
          since: start.toISOString(),
          till: end.toISOString(),
          channelUuid: "1",
        };
      });
    }
  });
};
