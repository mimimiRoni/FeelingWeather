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
        // onChange={(e) => setInput(e.target.value)}
        onFocus={() => {
          setVisibleOptions(true);
        }}
        placeholder="都市名を選択"
      />
      <div role="listbox" hidden={!isVisibleOptions}>
        <div
          onClick={() => {
            setInput('現在地');
            onSubmit('現在地');
            setVisibleOptions(false);
          }}
        >
          現在値
        </div>
        <div
          onClick={() => {
            setInput('TODO:選択できる都市名一覧');
            onSubmit('TODO:選択できる都市名一覧');
            setVisibleOptions(false);
          }}
        >
          TODO:選択できる都市名一覧
        </div>
      </div>
    </form>
  );
};

export default InputCity;
