import { useCallback, useEffect, useState } from 'react';
import { fetchWeather } from '../services/weatherApi';
import type { City, LoadStatus, WeatherData } from '../types/weather';

interface WeatherState {
  status: LoadStatus;
  data: WeatherData | null;
  error: string | null;
}

const IDLE: WeatherState = { status: 'idle', data: null, error: null };

export function useWeather(city: City | null) {
  const [state, setState] = useState<WeatherState>(IDLE);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!city) {
      setState(IDLE);
      return;
    }

    const controller = new AbortController();
    setState({ status: 'loading', data: null, error: null });

    fetchWeather(city, controller.signal)
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.';
        setState({ status: 'error', data: null, error: message });
      });

    // Hủy request cũ khi người dùng chọn thành phố khác → tránh hiển thị sai dữ liệu
    return () => controller.abort();
  }, [city, reloadKey]);

  const retry = useCallback(() => setReloadKey((k) => k + 1), []);

  return { ...state, retry };
}
