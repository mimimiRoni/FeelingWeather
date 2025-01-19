import { useState } from 'react';
import CitiesData from '../data/citiesData.json';

type InputCityProps = {
  onSubmit: (city: string) => void;
  onError: (errorMassage: string) => void;
};

const InputCity: React.FC<InputCityProps> = ({ onSubmit, onError }) => {
  const data = CitiesData;
  const [inputValue, setInput] = useState('');
  const [isVisibleOptions, setVisibleOptions] = useState(false);
  const onSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    const inputStr = inputValue.trim();
    if (!inputStr) {
      onError('都市名を入力してください');
      return;
    }

    onSubmit(inputStr);
  };

  return (
    <form onSubmit={onSubmitHandle} role="form">
      <input
        type="search"
        value={inputValue}
        // onChange={(e) => setInput(e.target.value)}
        onFocus={() => {
          setVisibleOptions(true);
        }}
        placeholder="都市名を選択"
      />
      <ul role="listbox" hidden={!isVisibleOptions}>
        <li
          onClick={() => {
            setInput('現在地');
            onSubmit('現在地');
            setVisibleOptions(false);
          }}
        >
          現在値
        </li>
        <li
          onClick={() => {
            setInput('TODO:選択できる都市名一覧');
            onSubmit('TODO:選択できる都市名一覧');
            setVisibleOptions(false);
          }}
        >
          TODO:選択できる都市名一覧
        </li>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <p>
              {key}:{value.city} {value.ward || ''}({value.pref}){' '}
              {value.rep_lat},{value.rep_lon}
            </p>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default InputCity;
