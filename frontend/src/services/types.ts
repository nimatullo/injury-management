export interface ApiResponse {
  data: any;
  status: number;
}

export interface ApiOptions {
  headers: any;
  method: string;
  body?: any;
}

export interface ListItems {
  id: string;
  name: string;
}

export interface PlayerInformation {
  id: string;
  height: string;
  weight: string;
  number: string;
  position: string;
  name: string;
  playerPhoto: string;
}
