export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast;
}

export type Unit = 'C' | 'F';

export type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

export type WeatherTheme =
  | 'idle'
  | 'clear'
  | 'cloud'
  | 'fog'
  | 'rain'
  | 'snow'
  | 'storm';

export interface WeatherInfo {
  label: string;
  icon: string;
  theme: WeatherTheme;
}
