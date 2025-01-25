import axios from 'axios';
import { getCurrentWeather } from './weatherApi';
import { CurrentWeather } from '../types/CurrentWeather.type';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getCurrentWeather', () => {
  const lat = 40.7128;
  const lon = -74.006;
  const storeKey = `currentWeather-lat${lat}-lon${lon}`;
  const mockWeatherData: CurrentWeather = {
    weather: {
      id: 0,
      main: 'Clear',
      description: 'clear sky',
      icon: '0',
    },
    main: {
      temp: 0,
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
  };

  jest.mock('axios');

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('should return cached data if it exists and is less than 30 minutes old', async () => {
    // 10分前
    const storedDate = Date.now() - 10 * 60000;
    const storeData = {
      data: mockWeatherData,
      storedDate: storedDate,
    };

    localStorage.setItem(storeKey, JSON.stringify(storeData));

    const result = await getCurrentWeather(lat, lon);

    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  test('should fetch new data if cached data is older than 30 minutes', async () => {
    // 40分前
    const storedDate = Date.now() - 40 * 60000;
    const storeData = {
      data: mockWeatherData,
      storedDate,
    };

    localStorage.setItem(storeKey, JSON.stringify(storeData));

    mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

    const result = await getCurrentWeather(lat, lon);

    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/.netlify/functions/getCurrentWeather/`,
      { params: { lat, lon } },
    );
  });

  test('should fetch new data if no cached data exists', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

    const result = await getCurrentWeather(lat, lon);

    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/.netlify/functions/getCurrentWeather/`,
      { params: { lat, lon } },
    );
  });

  test('should fetch new data if stored data is null', async () => {
    localStorage.setItem(storeKey, JSON.stringify(null));

    mockedAxios.get.mockResolvedValue({ data: mockWeatherData });

    const result = await getCurrentWeather(lat, lon);

    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      `/.netlify/functions/getCurrentWeather/`,
      { params: { lat, lon } },
    );
  });
});
