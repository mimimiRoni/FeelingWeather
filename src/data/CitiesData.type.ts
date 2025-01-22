export type CityData = {
  city: string;
  ward: string;
  pref: string;
  rep_lat: number;
  rep_lon: number;
};

export type CitiesDatabase = {
  [key: string]: CityData;
};
