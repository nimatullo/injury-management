const API_URL = "http://localhost:8000/";

interface ApiResponse {
  data: any;
  status: number;
}

interface ApiOptions {
  headers: any;
  method: string;
  body?: any;
}

export interface ListItems {
  id: string;
  name: string;
}

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
}

export default ApiService;
