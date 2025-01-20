import { useState } from 'react';

type SearchableDropdownProps<T> = {
  placeholder: string;
  getFilteredOptions: (query: string) => T[];
  displayOption: (option: T) => string;
  onSelected: (option: T) => void;
};

export const SearchableDropdown = <T,>({
  placeholder,
  getFilteredOptions,
  displayOption,
  onSelected,
}: SearchableDropdownProps<T>): JSX.Element => {
  const [isVisibleOptions, setVisibleOptions] = useState(false);
  const [inputValue, setInputValue] = useState('');
  return (
    <div
      onFocus={() => {
        setVisibleOptions(true);
      }}
      onBlur={() => {
        setVisibleOptions(false);
      }}
    >
      <input
        role="searchbox"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <ul role="list" hidden={!isVisibleOptions}>
        {getFilteredOptions(inputValue).map((option, index) => {
          return (
            <li
              role="listitem"
              key={index}
              onClick={() => {
                onSelected(option);
                setVisibleOptions(false);
              }}
            >
              {displayOption(option)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
