import type { CurrentWeather as CurrentWeatherData, Unit } from '../types/weather';
import { formatUpdateTime } from '../utils/format';
import { formatTemp } from '../utils/temperature';
import { getWeatherInfo } from '../utils/weatherCode';

interface Props {
  cityName: string;
  current: CurrentWeatherData;
  unit: Unit;
}

export default function CurrentWeather({ cityName, current, unit }: Props) {
  const info = getWeatherInfo(current.weather_code);

  return (
    <section className="current" aria-label={`Thời tiết hiện tại tại ${cityName}`}>
      <h2 className="current__city">{cityName}</h2>
      <div className="current__main">
        <span className="current__icon" role="img" aria-label={info.label}>
          {info.icon}
        </span>
        <div>
          <p className="current__temp">{formatTemp(current.temperature_2m, unit)}</p>
          <p className="current__desc">{info.label}</p>
        </div>
      </div>

      <dl className="current__stats">
        <div>
          <dt>Độ ẩm</dt>
          <dd>{current.relative_humidity_2m}%</dd>
        </div>
        <div>
          <dt>Tốc độ gió</dt>
          <dd>{current.wind_speed_10m} km/h</dd>
        </div>
        <div>
          <dt>Cập nhật lúc</dt>
          <dd>{formatUpdateTime(current.time)}</dd>
        </div>
      </dl>
    </section>
  );
}
