import { render, screen } from '@testing-library/react';

import Weather from '../../Components/Weather';
import { CurrentWeather } from '../../types/CurrentWeather.type';

test('should render temperature', () => {
  const weather: CurrentWeather = {
    main: {
      temp: 25,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      humidity: 0,
    },
    wind: {
      speed: 0,
      deg: 0,
    },
    dt: new Date(),
    sys: {
      sunrise: new Date(),
      sunset: new Date(),
    },
    weather: {
      id: 0,
      main: '',
      description: '',
      icon: '',
    },
  };
  render(<Weather {...weather} />);

  const temperatureElement = screen.getByText(/25°C/i);
  expect(temperatureElement).toBeInTheDocument();
});
