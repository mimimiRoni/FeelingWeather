import { useState } from 'react';

type InputCityProps = {
  onSubmit: (city: string) => void;
};

const InputCity: React.FC<InputCityProps> = ({ onSubmit }) => {
  const [inputValue, setInput] = useState('');
  const onSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    const inputStr = inputValue.trim();
    if (!inputStr) {
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
        placeholder="都市名を入力してください"
      />
    </form>
  );
};

export default InputCity;
