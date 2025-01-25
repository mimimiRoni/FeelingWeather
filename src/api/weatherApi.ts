import axios from 'axios';
import { CurrentWeather } from '../types/CurrentWeather.type';

const functionsUrl = `/.netlify/functions`;

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather> => {
  const response = await axios.get<CurrentWeather>(
    `${functionsUrl}/getCurrentWeather/?lat=${lat}&lon=${lon}`,
  );
  return response.data;
};
