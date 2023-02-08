import { ApiResponse, ApiOptions, ListItems } from "./types";

const API_URL = "http://localhost:8000/";

class ApiService {
  private static async fetchData(
    path: string,
    method: string,
    body?: any
  ): Promise<ApiResponse> {
    try {
      const options: ApiOptions = {
        headers: { "Content-Type": "application/json" },
        method,
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(API_URL + path, options);
      const data = await response.json();
      return { data, status: response.status };
    } catch (error: any) {
      return { data: error, status: error.status };
    }
  }

  public static async get(path: string): Promise<ApiResponse> {
    return this.fetchData(path, "GET");
  }

  public static async post(path: string, body: any): Promise<ApiResponse> {
    return this.fetchData(path, "POST", body);
  }

  public static async put(path: string, body: any): Promise<ApiResponse> {
    return this.fetchData(path, "PUT", body);
  }

  public static async delete(path: string): Promise<ApiResponse> {
    return this.fetchData(path, "DELETE");
  }

  public static async getPlayers(): Promise<ListItems[]> {
    return this.get("players").then((response) => {
      if (response.status === 200) {
        return response.data.map((player: any) => {
          return {
            id: player.id,
            name: player.name,
          };
        });
      }
    });
  }

  public static async getInjuries(): Promise<string[]> {
    return this.get("injuries").then((response) => {
      if (response.status === 200) {
        return response.data.map((injury: any) => injury.injuryName);
      }
    });
  }

  public static async submitInjuryReport(
    injuryReport: any
  ): Promise<ApiResponse> {
    return this.post("players/add-injury", injuryReport);
  }

  public static async getInjuredPlayers(): Promise<any> {
    return this.get("players/injured").then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    });
  }

  public static async getInjuriesForPlayer(id: string): Promise<any> {
    return this.get("injuries/" + id).then((response) => {
      if (response.status === 200) {
        return response.data.injuries;
      }
    });
  }

  public static async getAppointmentsForTimeline(
    playerId: string
  ): Promise<any> {
    return ApiService.get(`players/${playerId}/appointments/all`).then(
      (response) => {
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
      }
    );
  }

  public static async getUpcomingGame(): Promise<any> {
    const endpoint =
      "https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2022/league/00_full_schedule.json";

    const todayDate = new Date();
    // Get the next Brooklyn Nets game
    return fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const games = data.lscd[1].mscd.g;
        const nextGame = games.find((game: any) => {
          const gameDate = new Date(game.gdte);
          return (
            gameDate.getTime() >= todayDate.getTime() &&
            (game.h.ta === "BKN" || game.v.ta === "BKN")
          );
        });
        return nextGame;
      });
  }
}

export default ApiService;
