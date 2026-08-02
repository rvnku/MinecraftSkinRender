import type { ReactNode } from 'react';
import './Group.css';

interface GroupProps {
  children?: ReactNode;
}

export function Group({ children }: GroupProps) {
  return <div className="group">{children}</div>;
}
