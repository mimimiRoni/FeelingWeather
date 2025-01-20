import { fireEvent, render, screen } from '@testing-library/react';
import { SearchableDropdown } from '../../../../Components/common/SearchableDropdown/SearchableDropdown';

test('should render input field', () => {
  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );
  const input = screen.getByRole('searchbox');
  expect(input).toBeVisible();
});

test('should user be able to input', () => {
  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );
  const input = screen.getByRole('searchbox');
  const inputValue = 'option';
  fireEvent.change(input, { target: { value: inputValue } });
  expect(input).toHaveValue(inputValue);
});

test('should render input field with placeholder', () => {
  const placeholderText = 'Search...';
  render(
    <SearchableDropdown
      placeholder={placeholderText}
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );
  const input = screen.getByRole('searchbox');
  expect(input).toHaveAttribute('placeholder', placeholderText);
});

test('should not render selections box when start render', () => {
  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );
  const selectionsBox = screen.queryByRole('listbox');
  expect(selectionsBox).toBeNull();
});

test('should render selections box when input is focused', () => {
  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );
  const input = screen.getByRole('searchbox');
  fireEvent.focus(input);
  const selectionsBox = screen.getByRole('list');
  expect(selectionsBox).toBeVisible();
});

test('should render selections box when input is focused and blur', () => {
  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );
  const input = screen.getByRole('searchbox');

  fireEvent.focus(input);
  fireEvent.blur(input);

  const selectionsBox = screen.queryByRole('list');
  expect(selectionsBox).toBeNull();
});

test('should not render selections when no options', () => {
  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return [];
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const selections = screen.getByRole('list').querySelectorAll('li');
  expect(selections.length).toBe(0);
});

test('should render selections when options are available', () => {
  const options = ['option1', 'option2'];

  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return options;
      }}
      displayOption={() => {
        return '';
      }}
      onSelected={() => {}}
    />,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const selections = screen.getByRole('list').querySelectorAll('li');
  expect(selections.length).toBe(options.length);
});

test('should render selections', () => {
  const options = ['option1', 'option2'];
  const displayOption = (option: string) => {
    return option;
  };

  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return options;
      }}
      displayOption={displayOption}
      onSelected={() => {}}
    />,
  );
  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const selections = screen.getByRole('list').querySelectorAll('li');
  selections.forEach((selection) => {
    expect(selection).toHaveTextContent(displayOption(selection.textContent!));
  });
});

test('should call onClick selection with option when not filtered', () => {
  const options = ['option1', 'option2'];
  const displayOption = (option: string) => {
    return option;
  };

  const mockOnSelected = jest.fn();

  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return options;
      }}
      displayOption={displayOption}
      onSelected={mockOnSelected}
    />,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const selections = screen.getByRole('list').querySelectorAll('li');
  const index = 0;
  fireEvent.click(selections[index]);

  expect(mockOnSelected).toHaveBeenCalledWith(options[index]);
});

test('should call onClick selection with option when filtered', () => {
  const options = ['option1', 'option2'];
  const displayOption = (option: string) => {
    return option;
  };

  const getFilteredOptions = (query: string) => {
    return options.filter((option) => option.includes(query));
  };

  const mockOnSelected = jest.fn();

  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={getFilteredOptions}
      displayOption={displayOption}
      onSelected={mockOnSelected}
    />,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const inputValue = '2';
  fireEvent.change(inputElement, { target: { value: inputValue } });

  const selections = screen.getByRole('list').querySelectorAll('li');
  const index = 0;
  fireEvent.click(selections[index]);

  expect(mockOnSelected).toHaveBeenCalledWith(
    getFilteredOptions(inputValue)[index],
  );
});

test('should not render selections when on selected', () => {
  const options = ['option1', 'option2'];
  const displayOption = (option: string) => {
    return option;
  };

  const mockOnSelected = jest.fn();

  render(
    <SearchableDropdown
      placeholder=""
      getFilteredOptions={() => {
        return options;
      }}
      displayOption={displayOption}
      onSelected={mockOnSelected}
    />,
  );

  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const selections = screen.getByRole('list').querySelectorAll('li');
  fireEvent.click(selections[0]);

  const selectionsAfter = screen.queryByRole('list');
  expect(selectionsAfter).toBeNull();
});
