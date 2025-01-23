export interface CurrentWeather {
  weather: Weather[];
  main: Main;
  wind: Wind;
  dt: number;
  sys: Sys;
  timezone: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface Sys {
  sunrise: number;
  sunset: number;
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
