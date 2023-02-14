export interface ApiResponse<T> {
  data: T | any;
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

export interface Player {
  id: string;
  name: string;
  position: string;
  number: number;
  realId: number;
  height: string;
  weight: string;
  playerPhoto: string;
}

export interface Appointments {
  id: string;
  dateTime: string;
  player: Player;
  playerId: string;
  forTreatment: Treatment;
  treatmentId: string;
  notes: string;
}

export interface Treatment {
  id: string;
  treatmentName: string;
  Appointment: Appointments[];
  injury: Injury;
  injuryId: string;
}

export interface Injury {
  id: string;
  injuryName: string;
  injuryDate: string;
  player: Player;
  playerId: string[];
  Treatment: Treatment[];
}

export interface Exercise {
  id: string;
  name: string;
  measurement: string;
  date: string;
  category: string;
  playerId: string;
}

export interface RecoveryTracking {
  player: {
    name: string;
    photo: string;
  };
  beforeAvg: number;
  afterAvg: number;
  recoveryPercentage: number;
}
