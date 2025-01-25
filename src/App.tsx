import { useEffect, useState } from 'react';
import './App.css';
import InputCity from './Components/InputCity';
import Weather from './Components/Weather';
import { getCurrentWeather } from './api/weatherApi';
import { CurrentWeather } from './types/CurrentWeather.type';
import { CityData } from './data/CitiesData.type';

/**
 * The main application component.
 * @returns The rendered component.
 */
function App() {
  const [getCity, setCity] = useState<CityData | null>(null);
  const [getWeather, setWeather] = useState<CurrentWeather | null>(null);

  useEffect(() => {
    if (getCity) {
      getCurrentWeather(getCity.rep_lat, getCity.rep_lon).then((current) => {
        setWeather(current);
      });
    }
  }, [getCity]);

  return (
    <>
      <InputCity
        onSelected={([, value]) => {
          setCity(value);
        }}
      />
      <p>
        {getCity
          ? getCity.city + getCity.ward + '(' + getCity.pref + ')'
          : '表示する場所を選択してください'}
      </p>
      {getWeather ? <Weather {...getWeather} /> : null}
    </>
  );
}

export default App;
