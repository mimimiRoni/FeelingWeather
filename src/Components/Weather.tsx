type WeatherProps = {
  temperature: number;
};

const Weather: React.FC<WeatherProps> = ({ temperature }) => {
  return <div>気温： {temperature}°C</div>;
};

export default Weather;
