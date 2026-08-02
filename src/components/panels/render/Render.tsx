import { Button } from '../../common/button/Button';
import { CubeIcon } from '../../common/icon/CubeIcon';
import { Scene } from '../../scene/Scene';
import { Panel } from '../Panel';
import { Placeholder } from '../../placeholder/Placeholder';
import { ActionBar } from './ActionBar';
import type { RenderMode, Projection, Animation } from '../../../types';

interface RenderPanelProps {
  skinUrl: string | null;
  renderMode: RenderMode;
  showSecondLayer: boolean;
  projection: Projection;
  slimModel: boolean;
  animation: Animation;
  resetKey: number;
  onReset: () => void;
  onDownload: () => void;
  onRenderModeChange: (mode: RenderMode) => void;
  onShowSecondLayerToggle: () => void;
  onSlimModelToggle: () => void;
  onReady?: () => void;
  canvasRef?: React.Ref<HTMLCanvasElement>;
}

export function RenderPanel({
  skinUrl,
  renderMode,
  showSecondLayer,
  projection,
  slimModel,
  animation,
  resetKey,
  onReset,
  onDownload,
  onRenderModeChange,
  onShowSecondLayerToggle,
  onSlimModelToggle,
  onReady,
  canvasRef,
}: RenderPanelProps) {
  const actionbar = (
    <ActionBar
      renderMode={renderMode}
      slimModel={slimModel}
      showSecondLayer={showSecondLayer}
      onRenderModeChange={onRenderModeChange}
      onSlimModelToggle={onSlimModelToggle}
      onShowSecondLayerToggle={onShowSecondLayerToggle}
    />
  );

  const footer = (
    <>
      <Button label="↺ reset" title="Reset camera position" onClick={onReset} />
      <Button label="↓ save" title="Save the image" onClick={onDownload} />
    </>
  );

  const placeholder = (
    <Placeholder title="3d render" subtitle="load a skin to begin">
      <CubeIcon />
    </Placeholder>
  );

  return (
    <Panel actionbar={actionbar} footer={footer} placeholder={placeholder}>
      {skinUrl && (
        <Scene
          ref={canvasRef}
          skinUrl={skinUrl}
          projection={projection}
          renderMode={renderMode}
          showSecondLayer={showSecondLayer}
          slimModel={slimModel}
          animation={animation}
          resetKey={resetKey}
          onReady={onReady}
        />
      )}
    </Panel>
  );
}
