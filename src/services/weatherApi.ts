import type { City, WeatherData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

function buildUrl(city: City): string {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
  });
  return `${BASE_URL}?${params.toString()}`;
}

/** Luôn trả dữ liệu theo °C. Việc đổi sang °F xử lý ở giao diện, không gọi lại API. */
export async function fetchWeather(
  city: City,
  signal?: AbortSignal,
): Promise<WeatherData> {
  let response: Response;
  try {
    response = await fetch(buildUrl(city), { signal });
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err;
    throw new Error('Không kết nối được tới máy chủ. Hãy kiểm tra mạng của bạn.');
  }

  if (!response.ok) {
    throw new Error(`Máy chủ thời tiết trả về lỗi (mã ${response.status}).`);
  }

  const json = (await response.json()) as Partial<WeatherData>;
  if (!json.current || !json.daily) {
    throw new Error('Dữ liệu thời tiết nhận được không hợp lệ.');
  }
  return { current: json.current, daily: json.daily };
}
