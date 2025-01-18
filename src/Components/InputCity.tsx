import { useState } from 'react';

type InputCityProps = {
  onSubmit: (city: string) => void;
  onError: (errorMassage: string) => void;
};

const InputCity: React.FC<InputCityProps> = ({ onSubmit, onError }) => {
  const [inputValue, setInput] = useState('');
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
        type="text"
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        placeholder="都市名を選択"
      />
    </form>
  );
};

export default InputCity;
