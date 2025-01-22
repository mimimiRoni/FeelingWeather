import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const getCurrentWeatherUrl = `${location.origin}/.netlify/functions/getCurrentWeather/`;

describe('getCurrentWeather', () => {
  test('should return 400 if lat or lon is missing', async () => {
    const response = await mockedAxios.get(`${getCurrentWeatherUrl}?lat=&lon=`);

    expect(response.status).toBe(400);
    expect(response.statusText).toBe('Invalid parameters');
  });

  test('should return 200 with weather data if request is valid', async () => {
    const weatherData = { weather: 'sunny' };
    mockedAxios.get.mockResolvedValueOnce({ data: weatherData });

    const response = await mockedAxios.get(
      `${getCurrentWeatherUrl}?lat=35&lon=139`,
    );
    expect(response.status).toBe(200);
    expect(response.data).toEqual(weatherData);
  });

  test('should return 500 if axios request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const response = await mockedAxios.get(
      `${getCurrentWeatherUrl}?lat=35&lon=139`,
    );
    expect(response.status).toBe(500);
    expect(response.data).toBe('Failed to get weather data');
  });
});
