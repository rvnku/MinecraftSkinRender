import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Head } from './Head';
import { Body } from './Body';
import { AutoCamera } from './Camera';
import type { Projection, RenderMode, Animation } from '../../types';
import './Scene.css';
import { RotateControls } from './RotateControls';
import { SizeManager } from './SizeManager';

interface ThreeSceneProps {
  skinUrl: string;
  projection: Projection;
  renderMode: RenderMode;
  showHelmet: boolean;
  showSecondLayer: boolean;
  slimModel: boolean;
  animation: Animation;
  resetKey: number;
  onReady?: () => void;
}

export const ThreeScene = forwardRef<HTMLCanvasElement, ThreeSceneProps>(
  (
    {
      skinUrl,
      projection,
      renderMode,
      showHelmet,
      showSecondLayer,
      slimModel,
      animation,
      resetKey,
      onReady,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useImperativeHandle(ref, () => canvasRef.current!);

    const [cameraPos, setCameraPos] = useState<[number, number, number]>([3, 3, 3]);

    useEffect(() => {
      setCameraPos([3, 3, 3]);
    }, [resetKey]);

    return (
      <div className="scene-container">
        <Canvas ref={canvasRef} className="scene-canvas" gl={{ preserveDrawingBuffer: true }}>
          <SizeManager />
          <AutoCamera projection={projection} position={cameraPos} resetKey={resetKey} />
          {renderMode === 'head' ? (
            <Head skinUrl={skinUrl} showHelmet={showHelmet} onReady={onReady} />
          ) : (
            <Body
              skinUrl={skinUrl}
              showSecondLayer={showSecondLayer}
              slimModel={slimModel}
              animation={animation}
              onReady={onReady}
            />
          )}
          <RotateControls />
        </Canvas>
      </div>
    );
  }
);
