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

test('should call onSubmit with input', () => {
  const mockOnSubmit = jest.fn();
  render(<InputCity onSubmit={mockOnSubmit} onError={() => {}} />);
  const inputValue = '東京';

  inputOnSubmit(inputValue);

  expect(mockOnSubmit).toHaveBeenCalledWith(inputValue);
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
