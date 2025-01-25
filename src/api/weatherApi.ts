import axios from 'axios';
import { CurrentWeather } from '../types/CurrentWeather.type';

const functionsUrl = `/.netlify/functions`;

export const getCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather> => {
  const storeKey = `currentWeather-lat${lat}-lon${lon}`;
  const storedData = localStorage.getItem(storeKey);
  const now = Date.now();

  if (storedData) {
    const convertedStoreData = JSON.parse(storedData) as StoreData;
    if (convertedStoreData !== null) {
      const diffMinutes =
        (now - convertedStoreData.storedDate.getTime()) / 60000;
      if (diffMinutes < 30) {
        return convertedStoreData.data;
      } else {
        localStorage.removeItem(storeKey);
      }
    }
  }

  const response = await axios.get<CurrentWeather>(
    `${functionsUrl}/getCurrentWeather/`,
    {
      params: {
        lat,
        lon,
      },
    },
  );

  const newStoreData: StoreData = {
    data: response.data,
    storedDate: new Date(now),
  };

  localStorage.setItem(storeKey, JSON.stringify(newStoreData));

  return response.data;
};

type StoreData = {
  data: CurrentWeather;
  storedDate: Date;
};
