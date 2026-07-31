import type { ChangeEventHandler } from 'react';
import './Select.css';

interface SelectParameters<T> {
  value: T;
  options: T[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export function Select<T extends string>({ value, options, onChange }: SelectParameters<T>) {
  const longestOption = options.reduce((a, b) => (a.length > b.length ? a : b), '');
  return (
    <div className="select-wrap">
      <span className="select-wrap__hidden-option">{longestOption}</span>
      <select value={value} onChange={onChange} className="select-wrap__select">
        {options.map(a => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <span className="select-wrap__arrow">▾</span>
    </div>
  );
}
