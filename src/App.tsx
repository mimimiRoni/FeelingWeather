import './App.css';
import './Components/Weather';
import Weather from './Components/Weather';

function App() {
  // TODO: 今は決め打ちで固定値を設定しておくので、気温を取得して入れるようにする
  const temperature = 25;

  return (
    <>
      <Weather temperature={temperature} />
    </>
  );
}

export default App;
