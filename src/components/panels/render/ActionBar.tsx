import type { RenderMode } from '../../../types';
import { Group } from '../../common/group/Group';
import { Segment } from '../../common/segment/Segment';
import { Toggle } from '../../common/toggle/Toggle';

interface ActionBarProps {
  renderMode: RenderMode;
  slimModel: boolean;
  showSecondLayer: boolean;
  onRenderModeChange: (value: RenderMode) => void;
  onSlimModelToggle: () => void;
  onShowSecondLayerToggle: () => void;
}

export function ActionBar({
  renderMode,
  slimModel,
  showSecondLayer,
  onRenderModeChange,
  onSlimModelToggle,
  onShowSecondLayerToggle,
}: ActionBarProps) {
  return (
    <>
      <Segment
        options={[
          { label: 'head', value: 'head' },
          { label: 'body', value: 'body' },
        ]}
        value={renderMode}
        onChange={onRenderModeChange}
      />
      <Group>
        {renderMode === 'body' && (
          <Toggle label="slim" value={slimModel} onToggle={onSlimModelToggle} />
        )}
        <Toggle label="second layer" value={showSecondLayer} onToggle={onShowSecondLayerToggle} />
      </Group>
    </>
  );
}
