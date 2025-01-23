import { Context } from '@netlify/functions';
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

  axios
    .get(
      `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`,
    )
    .then((response) => {
      console.log(response.data);
      return new Response(JSON.stringify(response.data), { status: 200 });
    })
    .catch(() => {
      return new Response('Failed to get weather data', { status: 500 });
    });
};
