import { useState } from 'react';
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

  return (
    <>
      <InputCity onSubmit={(city) => setCity(city)} />
      <text>{getCity}</text>
      <Weather temperature={temperature} />
    </>
  );
}

export default App;
