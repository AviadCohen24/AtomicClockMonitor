export type ClockStatus = {
  Date: string;
  Time: string;
  GPS: string;
  Lat: string;
  Lng: string;
  NumOfSat: string;
};

export const INITIAL_STATUS: ClockStatus = {
  Date: '',
  Time: '',
  GPS: '',
  Lat: '',
  Lng: '',
  NumOfSat: '',
};
