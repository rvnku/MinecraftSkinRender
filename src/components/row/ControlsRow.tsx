import { Segment } from '../common/segment/Segment';
import type { Projection, RenderMode, Animation } from '../../types';
import { ANIMATIONS } from '../../types';
import './ControlsRow.css';
import { Select } from '../common/select/Select';

interface ControlsRowProps {
  projection: Projection;
  renderMode: RenderMode;
  animation: Animation;
  onProjectionChange: (p: Projection) => void;
  onAnimationChange: (a: Animation) => void;
}

export function ControlsRow({
  projection,
  renderMode,
  animation,
  onProjectionChange,
  onAnimationChange,
}: ControlsRowProps) {
  return (
    <div className="controls-row">
      <Segment
        options={[
          { label: 'iso', value: 'iso' as const },
          { label: 'persp', value: 'persp' as const },
        ]}
        value={projection}
        onChange={onProjectionChange}
      />

      {renderMode === 'body' && (
        <>
          <span className="controls-row__divider" />
          <Select
            value={animation}
            options={ANIMATIONS}
            onChange={e => onAnimationChange(e.target.value as Animation)}
          />
        </>
      )}
    </div>
  );
}
