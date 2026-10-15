# Thời tiết 8 thành phố Việt Nam

React + TypeScript + Vite, dữ liệu từ Open-Meteo (không cần API key).

## Chạy dự án
```bash
npm install
npm run dev
```

## Cấu trúc
```
src/
├── components/   CityList, CurrentWeather, Forecast, UnitToggle, EmptyState, LoadingState, ErrorState
├── constants/    cities.ts (8 thành phố + key localStorage)
├── hooks/        useWeather (gọi API, loading/error/retry), useFavorites (localStorage)
├── services/     weatherApi.ts (gọi Open-Meteo)
├── styles/       index.css
├── types/        weather.ts
├── utils/        weatherCode, temperature (°C/°F), format (ngày giờ), string (bỏ dấu)
├── App.tsx
└── main.tsx
```
