import { fireEvent, render, screen } from '@testing-library/react';
import InputCity from '../../Components/InputCity';

const CitiesDataPath = '../../data/citiesData.json';

test('should not call onError with no input', () => {
  const mockOnError = jest.fn();
  render(<InputCity onSelected={() => {}} onError={mockOnError} />);

  inputOnSubmit('');

  expect(mockOnError).toHaveBeenCalledWith('都市名を入力してください');
});

test('should return error with only spaces', () => {
  const mockOnError = jest.fn();
  render(<InputCity onSelected={() => {}} onError={mockOnError} />);

  inputOnSubmit('  ');

  expect(mockOnError).toHaveBeenCalledWith('都市名を入力してください');
});

test('should render city list when on focus input element', () => {
  render(<InputCity onSelected={() => {}} onError={() => {}} />);
  const inputElement = getInputElement();

  fireEvent.focus(inputElement);

  expect(screen.getByRole('list')).toBeVisible();
});

test('should not render city list when on unfocus input element', () => {
  render(<InputCity onSelected={() => {}} onError={() => {}} />);
  const inputElement = getInputElement();

  fireEvent.blur(inputElement);

  expect(screen.queryByRole('list')).toBeNull();
});

test('should format display option correctly', () => {
  jest.mock(CitiesDataPath, () => ({
    '1': { city: 'Tokyo', ward: 'Shibuya', pref: 'Tokyo' },
    '2': { city: 'Osaka', ward: 'Namba', pref: 'Osaka' },
  }));

  render(<InputCity onSelected={() => {}} onError={() => {}} />);

  const input = getInputElement();
  fireEvent.focus(input);
  fireEvent.change(input, 'Osaka');

  const option = screen.getByRole('listitem');
  expect(option).toHaveTextContent('OsakaNamba(Osaka)');
});

test('should handle sorting of filtered data', () => {
  jest.mock(CitiesDataPath, () => ({
    '1': { city: 'Tokyo', ward: 'Shibuya', pref: 'Tokyo' },
    '2': { city: 'Tottori', ward: 'Central', pref: 'Tottori' },
    '3': { city: 'Tokyo', ward: 'Setagaya', pref: 'Tokyo' },
  }));

  render(<InputCity onSelected={() => {}} onError={() => {}} />);

  const input = getInputElement();
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value: 'To' } });

  const selections = screen.getAllByRole('listitem');
  expect(selections).toHaveLength(3);
  expect(selections[0]).toHaveTextContent('TokyoShibuya(Tokyo)');
  expect(selections[1]).toHaveTextContent('TokyoSetagaya(Tokyo)');
  expect(selections[2]).toHaveTextContent('TottoriCentral(Tottori)');
});

/**
 * 入力フィールドを取得する
 * @returns 入力フィールド
 */
function getInputElement(): HTMLInputElement {
  return screen.getByRole('searchbox');
}

/**
 * 入力フィールドに指定文字列を入力してフォームを送信する
 * @param inputValue 入力する文字列
 */
function inputOnSubmit(inputValue: string) {
  const inputElement = getInputElement();
  fireEvent.change(inputElement, { target: { value: inputValue } });

  const formElement = inputElement.closest('form');
  fireEvent.submit(formElement!);
}
