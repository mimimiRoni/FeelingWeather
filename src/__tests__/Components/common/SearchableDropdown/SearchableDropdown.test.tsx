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
    />,
  );
  const input = screen.getByRole('searchbox');
  expect(input).toBeVisible();
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
      displayOption={(option) => {
        return displayOption(option);
      }}
    />,
  );
  const inputElement = screen.getByRole('searchbox');
  fireEvent.focus(inputElement);

  const selections = screen.getByRole('list').querySelectorAll('li');
  selections.forEach((selection) => {
    expect(selection).toHaveTextContent(displayOption(selection.textContent!));
  });
});
