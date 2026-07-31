import { Segment } from '../../common/segment/Segment';
import { IconBtn } from '../../common/button/Button';
import { CubeIcon } from '../../common/icon/CubeIcon';
import { ThreeScene } from '../../scene/Scene';
import type { RenderMode, Projection, Animation } from '../../../types';
import './Render.css';
import { Toggle } from '../../common/toggle/Toggle';

interface RenderPanelProps {
  skinUrl: string | null;
  renderMode: RenderMode;
  showHelmet: boolean;
  showSecondLayer: boolean;
  projection: Projection;
  slimModel: boolean;
  animation: Animation;
  resetKey: number;
  onReset: () => void;
  onDownload: () => void;
  onRenderModeChange: (mode: RenderMode) => void;
  onShowHelmetToggle: () => void;
  onShowSecondLayerToggle: () => void;
  onSlimModelToggle: () => void;
  onReady?: () => void;
  canvasRef?: React.Ref<HTMLCanvasElement>;
}

export function RenderPanel({
  skinUrl,
  renderMode,
  showHelmet,
  showSecondLayer,
  projection,
  slimModel,
  animation,
  resetKey,
  onReset,
  onDownload,
  onRenderModeChange,
  onShowHelmetToggle,
  onShowSecondLayerToggle,
  onSlimModelToggle,
  onReady,
  canvasRef,
}: RenderPanelProps) {
  return (
    <div className="render-panel">
      {skinUrl ? (
        <>
          <div className="render-panel-group render-panel__top">
            <Segment
              options={[
                { label: 'head', value: 'head' as const },
                { label: 'body', value: 'body' as const },
              ]}
              value={renderMode}
              onChange={onRenderModeChange}
            />
            <div className="render-panel-group">
              {renderMode === 'body' && (
                <Toggle label="slim" value={slimModel} onToggle={onSlimModelToggle} />
              )}
              {renderMode === 'head' ? (
                <Toggle label={'helmet'} value={showHelmet} onToggle={onShowHelmetToggle} />
              ) : (
                <Toggle
                  label={'second layer'}
                  value={showSecondLayer}
                  onToggle={onShowSecondLayerToggle}
                />
              )}
            </div>
          </div>

          <div className="render-panel__canvas-wrap">
            <ThreeScene
              ref={canvasRef}
              skinUrl={skinUrl}
              projection={projection}
              renderMode={renderMode}
              showHelmet={showHelmet}
              showSecondLayer={showSecondLayer}
              slimModel={slimModel}
              animation={animation}
              resetKey={resetKey}
              onReady={onReady}
            />
          </div>

          <div className="render-panel-group render-panel__bottom">
            <IconBtn label="↺ reset" title="Reset camera position" onClick={onReset} />
            <IconBtn label="↓ save" onClick={onDownload} />
          </div>
        </>
      ) : (
        <div className="placeholder-wrap">
          <CubeIcon />
          <div className="placeholder">
            <div className="placeholder__title">3d render</div>
            <div className="placeholder__subtitle">load a skin to begin</div>
          </div>
        </div>
      )}
    </div>
  );
}
