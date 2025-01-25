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
      const diffMinutes = (now - convertedStoreData.storedDate) / 60000;
      if (diffMinutes < 30) {
        return restoreStoreData(convertedStoreData);
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
    storedDate: now,
  };

  localStorage.setItem(storeKey, JSON.stringify(newStoreData));

  return response.data;
};

type StoreData = {
  data: CurrentWeather;
  storedDate: number;
};

/**
 * 格納していたデータを復元する
 * @param {StoreData} storeData - 格納していたデータ
 * @returns {CurrentWeather} 復元したデータ
 */
function restoreStoreData(storeData: StoreData): CurrentWeather {
  return {
    weather: storeData.data.weather,
    main: storeData.data.main,
    wind: storeData.data.wind,
    dt: new Date(storeData.data.dt),
    sys: {
      sunrise: new Date(storeData.data.sys.sunrise),
      sunset: new Date(storeData.data.sys.sunset),
    },
  };
}
