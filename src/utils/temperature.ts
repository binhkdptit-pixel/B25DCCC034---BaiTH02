import type { Unit } from '../types/weather';

export function convertTemp(celsius: number, unit: Unit): number {
  return unit === 'F' ? (celsius * 9) / 5 + 32 : celsius;
}

export function formatTemp(celsius: number, unit: Unit): string {
  return `${Math.round(convertTemp(celsius, unit))}°${unit}`;
}
