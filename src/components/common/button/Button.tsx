import type { MouseEventHandler } from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  title?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Button({ label, title, onClick, disabled = false }: ButtonProps) {
  return (
    <button title={title} onClick={onClick} disabled={disabled} className="button">
      {label}
    </button>
  );
}
