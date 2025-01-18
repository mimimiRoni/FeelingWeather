import { useState } from 'react';

type InputCityProps = {
  onSubmit: (city: string) => void;
  onError: (errorMassage: string) => void;
};

const InputCity: React.FC<InputCityProps> = ({ onSubmit, onError }) => {
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
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => {
          setVisibleOptions(true);
        }}
        onBlur={() => {
          setVisibleOptions(false);
        }}
        placeholder="都市名を選択"
      />
      <ul role="listbox" hidden={!isVisibleOptions}>
        <li>現在値</li>
        <li>TODO:選択できる都市名一覧</li>
      </ul>
    </form>
  );
};

export default InputCity;
