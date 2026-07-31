import { useState, useCallback, useRef, useEffect } from 'react';
import { DropZone } from './components/panels/drop/Drop';
import { RenderPanel } from './components/panels/render/Render';
import { ControlsRow } from './components/row/ControlsRow';
import { ErrorMessage } from './components/message/ErrorMessage';
import { useSkinLoader } from './hooks/useSkinLoader';
import type { Projection, RenderMode, Animation } from './types';
import './App.css';
import { detectSlimModel } from './utils/detectSlimModel';

export default function App() {
  const { skinSrc, error, loadSkin, clearError, markReady } = useSkinLoader();

  const [projection, setProjection] = useState<Projection>('iso');
  const [renderMode, setRenderMode] = useState<RenderMode>('head');
  const [showHelmet, setShowHelmet] = useState(true);
  const [showSecondLayer, setShowSecondLayer] = useState(true);
  const [slimModel, setSlimModel] = useState(false);
  const [animation, setAnimation] = useState<Animation>('stand');
  const [resetKey, setResetKey] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const download = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement('a');
    a.download = renderMode + '.png';
    a.href = c.toDataURL('image/png');
    a.click();
  }, []);

  const onReset = useCallback(() => {
    setResetKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (skinSrc) {
      detectSlimModel(skinSrc).then(setSlimModel);
    }
  }, [skinSrc]);

  return (
    <div className="app">
      <span className="app__title">minecraft skin render</span>

      <div className="app__panels">
        <DropZone skinSrc={skinSrc} onLoadSkin={loadSkin} />
        <RenderPanel
          skinUrl={skinSrc}
          renderMode={renderMode}
          showHelmet={showHelmet}
          showSecondLayer={showSecondLayer}
          projection={projection}
          slimModel={slimModel}
          animation={animation}
          resetKey={resetKey}
          onReset={onReset}
          onDownload={download}
          onRenderModeChange={setRenderMode}
          onShowHelmetToggle={() => setShowHelmet(!showHelmet)}
          onShowSecondLayerToggle={() => setShowSecondLayer(!showSecondLayer)}
          onSlimModelToggle={() => setSlimModel(!slimModel)}
          onReady={markReady}
          canvasRef={canvasRef}
        />
      </div>

      <ControlsRow
        projection={projection}
        renderMode={renderMode}
        animation={animation}
        onProjectionChange={setProjection}
        onAnimationChange={setAnimation}
      />

      {error && <ErrorMessage message={error} onDismiss={clearError} />}
    </div>
  );
}
