import type { Unit } from '../types/weather';

interface Props {
  unit: Unit;
  onChange: (unit: Unit) => void;
}

export default function UnitToggle({ unit, onChange }: Props) {
  return (
    <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
      {(['C', 'F'] as const).map((u) => (
        <button
          key={u}
          type="button"
          className={u === unit ? 'unit-toggle__btn is-active' : 'unit-toggle__btn'}
          aria-pressed={u === unit}
          onClick={() => onChange(u)}
        >
          °{u}
        </button>
      ))}
    </div>
  );
}
