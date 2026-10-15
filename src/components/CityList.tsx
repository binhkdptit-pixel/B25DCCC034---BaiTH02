import { useMemo, useState } from 'react';
import type { City } from '../types/weather';
import { removeDiacritics } from '../utils/string';

interface Props {
  cities: City[];
  selectedId: string | null;
  favorites: string[];
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function CityList({
  cities,
  selectedId,
  favorites,
  onSelect,
  onToggleFavorite,
}: Props) {
  const [query, setQuery] = useState('');

  const visibleCities = useMemo(() => {
    const q = removeDiacritics(query);
    const filtered = q ? cities.filter((c) => removeDiacritics(c.name).includes(q)) : cities;
    // Thành phố yêu thích lên đầu, giữ nguyên thứ tự gốc trong từng nhóm
    return [...filtered].sort(
      (a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id)),
    );
  }, [cities, query, favorites]);

  return (
    <nav className="city-list" aria-label="Danh sách thành phố">
      <input
        type="search"
        className="city-list__search"
        placeholder="Tìm thành phố (không cần gõ dấu)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Tìm thành phố"
      />

      {visibleCities.length === 0 ? (
        <p className="city-list__empty">Không có thành phố nào khớp với “{query}”.</p>
      ) : (
        <ul className="city-list__items">
          {visibleCities.map((city) => {
            const isSelected = city.id === selectedId;
            const isFavorite = favorites.includes(city.id);
            return (
              <li key={city.id} className={isSelected ? 'city-item is-selected' : 'city-item'}>
                <button
                  type="button"
                  className="city-item__main"
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onSelect(city.id)}
                >
                  {city.name}
                </button>
                <button
                  type="button"
                  className={isFavorite ? 'city-item__fav is-on' : 'city-item__fav'}
                  aria-pressed={isFavorite}
                  aria-label={
                    isFavorite
                      ? `Bỏ ${city.name} khỏi danh sách yêu thích`
                      : `Thêm ${city.name} vào danh sách yêu thích`
                  }
                  onClick={() => onToggleFavorite(city.id)}
                >
                  {isFavorite ? '★' : '☆'}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
