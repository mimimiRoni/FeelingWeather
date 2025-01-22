import { useState } from 'react';
import axios from 'axios';
import './App.css';
import InputCity from './Components/InputCity';
import Weather from './Components/Weather';

/**
 * The main application component.
 * @returns The rendered component.
 */
function App() {
  // TODO: 今は決め打ちで固定値を設定しておくので、気温を取得して入れるようにする
  const temperature = 25;
  const [getCity, setCity] = useState('都市名');
  const [getError, setError] = useState<string | null>(null);

  return (
    <>
      <InputCity
        onSelected={([, value]) => {
          setCity(value.city + value.ward + '(' + value.pref + ')');
          setError(null);
          axios
            .get(
              `${location.origin}/.netlify/functions/getCurrentWeather/?lat=${value.rep_lat}&lon=${value.rep_lon}`,
            )
            .then((response) => {
              console.log(response.data);
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
