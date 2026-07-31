export function DropIcon({ active }: { active: boolean }) {
  const strokeColor = active ? 'var(--text-active)' : '#2e2e2e';
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect
        x="2"
        y="2"
        width="50"
        height="50"
        rx="16"
        stroke={strokeColor}
        strokeWidth="2"
        strokeDasharray="5 3"
      />
      <path d="M27 17v20M17 27h20" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
