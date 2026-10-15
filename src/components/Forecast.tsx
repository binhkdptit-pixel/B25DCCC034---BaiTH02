import type { DailyForecast, Unit } from '../types/weather';
import { formatDayMonth, formatWeekday } from '../utils/format';
import { formatTemp } from '../utils/temperature';
import { getWeatherInfo } from '../utils/weatherCode';

interface Props {
  daily: DailyForecast;
  unit: Unit;
}

export default function Forecast({ daily, unit }: Props) {
  return (
    <section className="forecast" aria-label="Dự báo 7 ngày">
      <h3 className="forecast__title">Dự báo 7 ngày</h3>
      <ul className="forecast__list">
        {daily.time.map((date, i) => {
          const info = getWeatherInfo(daily.weather_code[i]);
          return (
            <li key={date} className="forecast__row">
              <span className="forecast__day">
                {formatWeekday(date)}
                <small>{formatDayMonth(date)}</small>
              </span>
              <span className="forecast__icon" role="img" aria-label={info.label} title={info.label}>
                {info.icon}
              </span>
              <span className="forecast__temps">
                <strong>{formatTemp(daily.temperature_2m_max[i], unit)}</strong>
                <span>{formatTemp(daily.temperature_2m_min[i], unit)}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
