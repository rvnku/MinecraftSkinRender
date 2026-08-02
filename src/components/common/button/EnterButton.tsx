import type { MouseEventHandler } from 'react';
import './EnterButton.css';

interface EnterButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function EnterButton({ onClick }: EnterButtonProps) {
  return (
    <button title="Load skin by nickname" className="enter-button" onClick={onClick}>
      →
    </button>
  );
}
