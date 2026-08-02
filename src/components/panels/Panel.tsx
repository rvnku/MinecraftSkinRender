import type { ReactNode } from 'react';
import './Panel.css';

interface PanelProps {
  actionbar: ReactNode;
  footer: ReactNode;
  placeholder: ReactNode;
  children: ReactNode;
}

export function Panel({ actionbar, footer, placeholder, children }: PanelProps) {
  return (
    <div className="panel">
      {<div className="actionbar">{actionbar}</div>}
      <div className="container">
        {children}
        {children ? <div className="footer">{footer}</div> : placeholder}
      </div>
    </div>
  );
}
