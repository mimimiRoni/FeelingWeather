import { fireEvent, render, screen } from '@testing-library/react';
import InputCity from '../../Components/InputCity';

test('should render input field', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputElement = getInputElement();

  expect(inputElement).toBeVisible();
});

test('should user be able to input', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputElement = getInputElement();
  const inputValue = '東京';

  fireEvent.change(inputElement, { target: { value: inputValue } });

  expect(inputElement).toHaveValue(inputValue);
});

test('should selections length grater than 0 with input 京', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputValue = '京';

  const inputElement = getInputElement();
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, { target: { value: inputValue } });

  const ulElement = screen.getByRole('listbox');
  const liElement = Array.from(ulElement.querySelectorAll('li')).filter((li) =>
    li.textContent?.includes(inputValue),
  );

  expect(liElement.length).toBeGreaterThan(0);
});

test('should selections length 0 with no input', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputValue = '';

  const inputElement = getInputElement();
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, { target: { value: inputValue } });

  const ulElement = screen.getByRole('listbox');
  const liElement = Array.from(ulElement.querySelectorAll('li')).filter(
    (li) => li.textContent === '現在地' || li.textContent?.includes(inputValue),
  );

  // 「現在地」選択肢があるので、1つは表示される
  expect(liElement.length).toBe(1);
});

test('should selections length 0 with input space', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputValue = ' ';

  const inputElement = getInputElement();
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, { target: { value: inputValue } });

  const ulElement = screen.getByRole('listbox');
  const liElement = Array.from(ulElement.querySelectorAll('li'));

  // 「現在地」選択肢があるので、1つは表示される
  expect(liElement.length).toBe(1);
});

test('should not call onSubmit with no input', () => {
  const mockOnSubmit = jest.fn();
  render(<InputCity onSubmit={() => {}} onError={mockOnSubmit} />);

  inputOnSubmit('');

  expect(mockOnSubmit).toHaveBeenCalledWith('都市名を入力してください');
});

test('should return error with only spaces', () => {
  const mockOnSubmit = jest.fn();
  render(<InputCity onSubmit={() => {}} onError={mockOnSubmit} />);

  inputOnSubmit('  ');

  expect(mockOnSubmit).toHaveBeenCalledWith('都市名を入力してください');
});

test('should render city list when on focus input element', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputElement = getInputElement();

  fireEvent.focus(inputElement);

  expect(screen.getByRole('listbox')).toBeVisible();
});

test('should not render city list when on unfocus input element', () => {
  render(<InputCity onSubmit={() => {}} onError={() => {}} />);
  const inputElement = getInputElement();

  fireEvent.blur(inputElement);

  expect(screen.queryByRole('listbox')).toBeNull();
});

/**
 * 入力フィールドを取得する
 * @returns 入力フィールド
 */
function getInputElement(): HTMLInputElement {
  return screen.getByPlaceholderText('都市名を選択');
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
