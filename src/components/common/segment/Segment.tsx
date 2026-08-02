import './Segment.css';

type SegmentOption<T> = { label: string; value: T };
interface SegmentProps<T> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (v: T) => void;
}

export function Segment<T extends string | boolean>({ options, value, onChange }: SegmentProps<T>) {
  return (
    <div className="segment">
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <button
            key={index}
            onClick={() => onChange(option.value)}
            className={`segment__button ${active ? 'segment__button--active' : ''}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
