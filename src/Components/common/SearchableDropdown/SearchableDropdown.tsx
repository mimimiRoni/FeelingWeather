import { useState } from 'react';

type SearchableDropdownProps<T> = {
  placeholder: string;
  getFilteredOptions: (query: string) => T[];
  displayOption: (option: T) => string;
};

export const SearchableDropdown = <T,>({
  placeholder,
  getFilteredOptions,
  displayOption,
}: SearchableDropdownProps<T>): JSX.Element => {
  const [isVisibleOptions, setVisibleOptions] = useState(false);
  return (
    <div
      onFocus={() => {
        setVisibleOptions(true);
      }}
      onBlur={() => {
        setVisibleOptions(false);
      }}
    >
      <input role="searchbox" placeholder={placeholder}></input>
      <ul role="list" hidden={!isVisibleOptions}>
        {getFilteredOptions('').map((option, index) => {
          return (
            <li role="listitem" key={index}>
              {displayOption(option)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
