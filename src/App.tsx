import { useState } from 'react';
import './App.css';
import InputCity from './Components/InputCity';
import Weather from './Components/Weather';
import { getCurrentWeather } from './api/weatherApi';

/**
 * The main application component.
 * @returns The rendered component.
 */
function App() {
  // TODO: 今は決め打ちで固定値を設定しておくので、気温を取得して入れるようにする
  const [temperature, setTemperature] = useState(25);
  const [getCity, setCity] = useState('都市名');
  const [getError, setError] = useState<string | null>(null);

  return (
    <>
      <InputCity
        onSelected={([, value]) => {
          setCity(value.city + value.ward + '(' + value.pref + ')');
          setError(null);
          getCurrentWeather(value.rep_lat, value.rep_lon).then((current) => {
            console.log(current);
            setTemperature(current.main.temp);
          });
        }}
        onError={(errorMassage) => {
          setError(errorMassage);
        }}
      />
      <p>{getError ? getError : getCity}</p>
      <Weather temperature={temperature} />
    </>
  );
}

export default App;
