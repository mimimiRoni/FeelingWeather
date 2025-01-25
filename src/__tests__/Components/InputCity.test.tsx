import { fireEvent, render, screen } from '@testing-library/react';
import InputCity from '../../Components/InputCity';

jest.mock('../../data/citiesData.json', () => ({
  '1': { city: 'あいう', ward: '', pref: '県名' },
  '2': { city: 'あいうえ', ward: '', pref: '県名' },
  '3': { city: 'かきく', ward: 'あいう', pref: '県名' },
  '4': { city: 'あいす', ward: '', pref: '県名' },
  '5': { city: 'さしす', ward: '', pref: '県名' },
}));
beforeEach(() => {
  jest.resetModules();
});

test('should render city list when on focus input element', () => {
  render(<InputCity onSelected={() => {}} />);
  const inputElement = getInputElement();

  fireEvent.focus(inputElement);

  expect(screen.getByRole('list')).toBeVisible();
});

test('should not render city list when on unfocus input element', () => {
  render(<InputCity onSelected={() => {}} />);
  const inputElement = getInputElement();

  fireEvent.blur(inputElement);

  expect(screen.queryByRole('list')).toBeNull();
});

test('should format display option correctly', () => {
  render(<InputCity onSelected={() => {}} />);

  const inputElement = getInputElement();
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, { target: { value: 'さしす' } });

  const option = screen.getByRole('listitem');
  expect(option).toHaveTextContent('さしす(県名)');
});

test('should handle filtered data', () => {
  render(<InputCity onSelected={() => {}} />);

  const inputElement = getInputElement();
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, { target: { value: 'あい' } });

  const selections = screen.getAllByRole('listitem');
  const selectedContents = selections.map((selection) => selection.textContent);
  const expectedContents = [
    'あいう(県名)',
    'あいうえ(県名)',
    'かきくあいう(県名)',
    'あいす(県名)',
  ];
  expect(selections).toHaveLength(4);
  expect(selectedContents).toEqual(expect.arrayContaining(expectedContents));
});

test('should handle sorted data', () => {
  render(<InputCity onSelected={() => {}} />);

  const inputElement = getInputElement();
  fireEvent.focus(inputElement);
  fireEvent.change(inputElement, { target: { value: 'あい' } });

  const selections = screen.getAllByRole('listitem');

  expect(selections).toHaveLength(4);
  expect(selections[0]).toHaveTextContent('あいう(県名)');
  expect(selections[1]).toHaveTextContent('あいうえ(県名)');
  expect(selections[2]).toHaveTextContent('あいす(県名)');
  expect(selections[3]).toHaveTextContent('かきくあいう(県名)');
});

/**
 * 入力フィールドを取得する
 * @returns 入力フィールド
 */
function getInputElement(): HTMLInputElement {
  return screen.getByRole('searchbox');
}
