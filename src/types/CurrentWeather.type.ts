export interface CurrentWeather {
  weather: Weather;
  main: Main;
  wind: Wind;
  dt: Date;
  sys: Sys;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

export interface Sys {
  sunrise: Date;
  sunset: Date;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}
