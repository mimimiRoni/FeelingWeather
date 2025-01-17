import { render, screen } from '@testing-library/react';

import Weather from '../../Components/Weather';

test('should render temperature', () => {
  render(<Weather temperature={25} />);

  const temperatureElement = screen.getByText(/25°C/i);
  expect(temperatureElement).toBeInTheDocument();
});
