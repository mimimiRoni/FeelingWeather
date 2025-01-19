import { useState } from 'react';
import CitiesData from '../data/citiesData.json';

type InputCityProps = {
  onSubmit: (city: string) => void;
  onError: (errorMassage: string) => void;
};

const InputCity: React.FC<InputCityProps> = ({ onSubmit, onError }) => {
  const data = CitiesData;
  const [inputValue, setInput] = useState('');
  const [getSelected, setSelected] = useState('');
  const [isVisibleOptions, setVisibleOptions] = useState(false);

  const onSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedStr = getSelected.trim();
    if (!selectedStr) {
      onError('都市名を入力してください');
      return;
    }

    onSubmit(selectedStr);
  };

  const onSelected = (city: string) => {
    setSelected(city);
    onSubmit(city);
    setVisibleOptions(false);
  };

  const filteredData = Object.entries(data)
    .filter(([, value]) => {
      return value.city.includes(inputValue) || value.ward.includes(inputValue);
    })
    .sort(([, a], [, b]) => {
      if (a.city.startsWith(inputValue) && b.city.startsWith(inputValue)) {
        return 0;
      } else if (a.city.startsWith(inputValue)) {
        return -1;
      } else {
        return 1;
      }
    });

  return (
    <form onSubmit={onSubmitHandle} role="form">
      <input
        type="search"
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => {
          setVisibleOptions(true);
        }}
        placeholder="都市名を選択"
      />
      <ul role="listbox" hidden={!isVisibleOptions}>
        <li
          onClick={() => {
            onSelected('現在地');
          }}
        >
          現在値
        </li>
        {inputValue.trim() &&
          filteredData.map(([key, value]) => {
            const displayName =
              value.city + (value.ward || '') + '(' + value.pref + ')';
            return (
              <li
                key={key}
                onClick={() => {
                  onSelected(displayName);
                }}
              >
                {displayName}
              </li>
            );
          })}
      </ul>
    </form>
  );
};

export default InputCity;
