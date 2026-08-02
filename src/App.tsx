import { useState, useCallback, useRef, useEffect } from 'react';
import { DropZone } from './components/panels/drop/Drop';
import { RenderPanel } from './components/panels/render/Render';
import { ControlsRow } from './components/row/ControlsRow';
import { ErrorMessage } from './components/message/ErrorMessage';
import { useSkinLoader } from './hooks/useSkinLoader';
import { detectSlimModel } from './utils/detectSlimModel';
import { getSkinUrl } from './utils/skinApi';
import type { Projection, RenderMode, Animation, SkinSystem } from './types';
import './App.css';

export default function App() {
  const { skinSrc, error, loadSkin, loadSkinFromUrl, clearError, markReady, setError } =
    useSkinLoader();

  const [projection, setProjection] = useState<Projection>('iso');
  const [renderMode, setRenderMode] = useState<RenderMode>('head');
  const [showSecondLayer, setShowSecondLayer] = useState(true);
  const [slimModel, setSlimModel] = useState(false);
  const [detectedSlimModel, setDetectedSlimModel] = useState(false);
  const [animation, setAnimation] = useState<Animation>('no anim');
  const [resetKey, setResetKey] = useState(0);
  const [skinSystem, setSkinSystem] = useState<SkinSystem>('Custom');
  const [nickname, setNickname] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const download = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const a = document.createElement('a');
    a.download = renderMode + '.png';
    a.href = c.toDataURL('image/png');
    a.click();
  }, [renderMode]);

  const onReset = useCallback(() => {
    setResetKey(k => k + 1);
  }, []);

  useEffect(() => {
    if (skinSrc) {
      detectSlimModel(skinSrc).then(isSlim => {
        setDetectedSlimModel(isSlim);
        setSlimModel(isSlim);
      });
    }
  }, [skinSrc]);

  const handleSetNickname = useCallback(
    (newNickname: string) => {
      setNickname(newNickname);
      if (skinSystem !== 'Custom' && newNickname.trim()) {
        getSkinUrl(skinSystem, newNickname).then(url => {
          if (url) {
            loadSkinFromUrl(url).catch(() => { });
          } else {
            setError('Invalid nickname or system');
          }
        });
      }
    },
    [skinSystem, loadSkinFromUrl, setError]
  );

  const handleLoadSkin = useCallback(
    (file: File) => {
      setNickname('');
      setSkinSystem('Custom');
      loadSkin(file);
    },
    [loadSkin]
  );

  return (
    <div className="app">
      <span className="app__title">minecraft skin render</span>

      <div className="app__panels">
        <DropZone
          skinSrc={skinSrc}
          detectedModelType={detectedSlimModel ? 'slim' : 'classic'}
          skinSystem={skinSystem}
          nickname={nickname}
          onLoadSkin={handleLoadSkin}
          onSkinSystemChange={setSkinSystem}
          onNicknameChange={handleSetNickname}
        />
        <RenderPanel
          skinUrl={skinSrc}
          renderMode={renderMode}
          showSecondLayer={showSecondLayer}
          projection={projection}
          slimModel={slimModel}
          animation={animation}
          resetKey={resetKey}
          onReset={onReset}
          onDownload={download}
          onRenderModeChange={setRenderMode}
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
