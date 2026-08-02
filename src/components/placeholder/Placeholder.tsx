import type { ReactNode } from 'react';
import './Placeholder.css';

interface PlaceholderProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  active?: boolean;
}

export function Placeholder({ title, subtitle, children, active = false }: PlaceholderProps) {
  return (
    <div className="placeholder-wrap">
      {children}
      <div className="placeholder">
        <div className={`placeholder-title ${active ? 'dragging' : ''}`}>{title}</div>
        <div className="placeholder-subtitle">{subtitle}</div>
      </div>
    </div>
  );
}
