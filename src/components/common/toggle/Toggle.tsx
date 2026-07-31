import type { MouseEventHandler } from 'react';
import './Toggle.css';

interface ToggleParameters {
  label: string;
  value: boolean;
  onToggle: MouseEventHandler<HTMLButtonElement>;
}

export function Toggle({ label, value, onToggle }: ToggleParameters) {
  return (
    <div className="toggle-group">
      <span className="toggle-label">{label}</span>
      <button onClick={onToggle} className={`toggle-button ${value ? 'is-enabled' : ''}`}>
        <span className="toggle-button__knob" />
      </button>
    </div>
  );
}
