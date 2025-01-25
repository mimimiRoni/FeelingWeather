import { CurrentWeather } from '../types/CurrentWeather.type';

const Weather: React.FC<CurrentWeather> = (weather) => {
  return (
    <>
      <div>{weather.main.temp}°C</div>
    </>
  );
};

export default Weather;
