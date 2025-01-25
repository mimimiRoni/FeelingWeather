import { useState } from 'react';
import './App.css';
import InputCity from './Components/InputCity';
import Weather from './Components/Weather';
import { getCurrentWeather } from './api/weatherApi';
import { CurrentWeather } from './types/CurrentWeather.type';

/**
 * The main application component.
 * @returns The rendered component.
 */
function App() {
  const [getCity, setCity] = useState('都市名');
  const [getError, setError] = useState<string | null>(null);
  const [getWeather, setWeather] = useState<CurrentWeather | null>(null);

  return (
    <>
      <InputCity
        onSelected={([, value]) => {
          setCity(value.city + value.ward + '(' + value.pref + ')');
          setError(null);
          getCurrentWeather(value.rep_lat, value.rep_lon).then((current) => {
            console.log(current);
            setWeather(current);
          });
        }}
        onError={(errorMassage) => {
          setError(errorMassage);
        }}
      />
      <p>{getError ? getError : getCity}</p>
      {getWeather ? <Weather {...getWeather} /> : null}
    </>
  );
}

export default App;
