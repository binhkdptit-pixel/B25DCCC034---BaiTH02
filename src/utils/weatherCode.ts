import type { WeatherInfo } from '../types/weather';

const UNKNOWN: WeatherInfo = { label: 'Không xác định', icon: '🌡️', theme: 'cloud' };

export function getWeatherInfo(code: number): WeatherInfo {
  if (code === 0) return { label: 'Trời quang', icon: '☀️', theme: 'clear' };
  if (code === 1) return { label: 'Ít mây', icon: '🌤️', theme: 'clear' };
  if (code === 2) return { label: 'Có mây rải rác', icon: '⛅', theme: 'cloud' };
  if (code === 3) return { label: 'Nhiều mây', icon: '☁️', theme: 'cloud' };
  if (code === 45 || code === 48) return { label: 'Sương mù', icon: '🌫️', theme: 'fog' };
  if (code >= 51 && code <= 55) return { label: 'Mưa phùn', icon: '🌦️', theme: 'rain' };
  if (code === 56 || code === 57) return { label: 'Mưa phùn lạnh', icon: '🌧️', theme: 'rain' };
  if (code === 61) return { label: 'Mưa nhẹ', icon: '🌦️', theme: 'rain' };
  if (code === 63) return { label: 'Mưa vừa', icon: '🌧️', theme: 'rain' };
  if (code === 65) return { label: 'Mưa to', icon: '🌧️', theme: 'rain' };
  if (code === 66 || code === 67) return { label: 'Mưa lạnh', icon: '🌧️', theme: 'rain' };
  if (code >= 71 && code <= 77) return { label: 'Tuyết rơi', icon: '❄️', theme: 'snow' };
  if (code >= 80 && code <= 82) return { label: 'Mưa rào', icon: '🌦️', theme: 'rain' };
  if (code === 85 || code === 86) return { label: 'Mưa tuyết', icon: '🌨️', theme: 'snow' };
  if (code === 95) return { label: 'Dông', icon: '⛈️', theme: 'storm' };
  if (code === 96 || code === 99) return { label: 'Dông kèm mưa đá', icon: '⛈️', theme: 'storm' };
  return UNKNOWN;
}
