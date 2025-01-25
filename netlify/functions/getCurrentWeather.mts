import { Context } from '@netlify/functions';
import { RawCurrentWeather } from '../../src/types/RawCurrentWeather.type';
import { CurrentWeather, Weather } from '../../src/types/CurrentWeather.type';
import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

export default async (request: Request, context: Context) => {
  var url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lon = url.searchParams.get('lon');
  const apiKey = Netlify.env.get('OPENWEATHER_API_KEY');

  if (!lat || !lon || !apiKey) {
    return new Response('Invalid parameters', { status: 400 });
  }

  const response = await axios.get<RawCurrentWeather>(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`,
  );

  const data = response.data;
  return new Response(JSON.stringify(convertRawCurrentWeather(data)));
};

/**
 * APIから取得した生の天気データをアプリケーションで扱いやすい形式に変換する
 * @param raw APIから取得した生の天気データ
 * @returns {CurrentWeather} アプリケーションで扱いやすい形式の天気データ
 */
function convertRawCurrentWeather(raw: RawCurrentWeather): CurrentWeather {
  const weather: Weather =
    raw.weather.length > 0
      ? raw.weather[0]
      : { id: 0, main: '', description: '', icon: '' };

  return {
    weather: weather,
    main: {
      temp: raw.main.temp,
      feels_like: raw.main.feels_like,
      humidity: raw.main.humidity,
    },
    wind: {
      speed: raw.wind.speed,
      deg: raw.wind.deg,
    },
    dt: raw.dt,
    sys: {
      sunrise: raw.sys.sunrise,
      sunset: raw.sys.sunset,
    },
    timezone: raw.timezone,
  };
}
