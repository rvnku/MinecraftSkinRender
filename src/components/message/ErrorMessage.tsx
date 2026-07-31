import { WarnIcon } from '../common/icon/WarnIcon';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <WarnIcon />
      <span className="error-message__text">{message}</span>
      <button onClick={onDismiss} className="error-message__close">
        ×
      </button>
    </div>
  );
}
