import { useState } from 'react';
import CityList from './components/CityList';
import CurrentWeather from './components/CurrentWeather';
import EmptyState from './components/EmptyState';
import ErrorState from './components/ErrorState';
import Forecast from './components/Forecast';
import LoadingState from './components/LoadingState';
import UnitToggle from './components/UnitToggle';
import { CITIES } from './constants/cities';
import { useFavorites } from './hooks/useFavorites';
import { useWeather } from './hooks/useWeather';
import type { Unit } from './types/weather';
import { getWeatherInfo } from './utils/weatherCode';

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [unit, setUnit] = useState<Unit>('C');
  const { favorites, toggleFavorite } = useFavorites();

  const city = CITIES.find((c) => c.id === selectedId) ?? null;
  const { status, data, error, retry } = useWeather(city);

  // Đổi màu nền theo thời tiết hiện tại
  const theme =
    status === 'success' && data ? getWeatherInfo(data.current.weather_code).theme : 'idle';

  return (
    <div className="app" data-theme={theme}>
      <header className="app__header">
        <h1>Thời tiết Việt Nam</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="app__layout">
        <aside className="app__sidebar">
          <CityList
            cities={CITIES}
            selectedId={selectedId}
            favorites={favorites}
            onSelect={setSelectedId}
            onToggleFavorite={toggleFavorite}
          />
        </aside>

        <div className="app__content">
          {status === 'idle' && <EmptyState />}
          {status === 'loading' && <LoadingState />}
          {status === 'error' && <ErrorState message={error ?? ''} onRetry={retry} />}
          {status === 'success' && data && city && (
            <>
              <CurrentWeather cityName={city.name} current={data.current} unit={unit} />
              <Forecast daily={data.daily} unit={unit} />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
