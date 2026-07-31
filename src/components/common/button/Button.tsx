import './Button.css';

export function IconBtn({
  label,
  title,
  onClick,
  disabled = false,
}: {
  label: string;
  title?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button title={title} onClick={onClick} disabled={disabled} className="icon-btn">
      {label}
    </button>
  );
}
