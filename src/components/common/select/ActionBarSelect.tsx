import type { ChangeEventHandler } from 'react';
import './ActionBarSelect.css';

interface SelectProps<T> {
  value: T;
  options: T[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function Select<T extends string>({ value, options, onChange }: SelectProps<T>) {
  const longestOption = options.reduce((a, b) => (a.length > b.length ? a : b), '');
  return (
    <div className="actionbar-select-wrap">
      <span className="actionbar-select-wrap__hidden-option">{longestOption}</span>
      <select value={value} onChange={onChange} className="actionbar-select-wrap__select">
        {options.map(a => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <span className="actionbar-select-wrap__arrow">▾</span>
    </div>
  );
}
