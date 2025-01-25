import { useRef, useState, useEffect } from 'react';
import styles from './SearchableDropdown.module.css';

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
  const [selectedOption, setSelectedOption] = useState<T | null>(null);
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

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (selectedOption !== null) {
      onSelected(selectedOption);
    }
  }, [selectedOption, onSelected]);

  return (
    <div
      ref={containerRef}
      onFocus={() => {
        setVisibleOptions(true);
      }}
      className={styles.container}
    >
      <input
        role="searchbox"
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.input}
      ></input>
      <ul role="list" hidden={!isVisibleOptions} className={styles.options}>
        {getFilteredOptions(inputValue).map((option, index) => {
          return (
            <li
              role="listitem"
              key={index}
              onClick={() => {
                setSelectedOption(option);
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
