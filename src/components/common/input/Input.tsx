import type { KeyboardEvent } from 'react';
import './Input.css';

interface InputProps {
  value: string;
  setValue: (value: string) => void;
  onEnter: () => void;
}

export function Input({ value, setValue, onEnter }: InputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnter();
      event.currentTarget.blur();
    }
  };
  return (
    <input
      type="text"
      placeholder="enter nickname"
      onChange={e => setValue(e.target.value)}
      value={value}
      onKeyDown={handleKeyDown}
      className="input"
    />
  );
}
