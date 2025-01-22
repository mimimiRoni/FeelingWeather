import React, { useRef, useState } from 'react';

type SearchableDropdownProps<T> = {
  placeholder: string;
  getFilteredOptions: (query: string) => T[] | [];
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
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      containerRef.current &&
      event.target instanceof Node &&
      !containerRef.current.contains(event.target)
    ) {
      setVisibleOptions(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onFocus={() => {
        setVisibleOptions(true);
      }}
    >
      <input
        role="searchbox"
        type="search"
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
