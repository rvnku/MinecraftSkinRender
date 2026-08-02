import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Head } from './skin/Head';
import { Body } from './skin/Body';
import { AutoCamera } from './misc/Camera';
import { RotateControls } from './misc/RotateControls';
import { SizeManager } from './misc/SizeManager';
import { NoToneMapping, SRGBColorSpace } from 'three';
import type { Projection, RenderMode, Animation } from '../../types';
import './Scene.css';

interface SceneProps {
  skinUrl: string;
  projection: Projection;
  renderMode: RenderMode;
  showSecondLayer: boolean;
  slimModel: boolean;
  animation: Animation;
  resetKey: number;
  onReady?: () => void;
}

export const Scene = forwardRef<HTMLCanvasElement, SceneProps>(
  (
    { skinUrl, projection, renderMode, showSecondLayer, slimModel, animation, resetKey, onReady },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useImperativeHandle(ref, () => canvasRef.current!);

    const [cameraPos, setCameraPos] = useState<[number, number, number]>([3, 3, 3]);

    useEffect(() => {
      setCameraPos([3, 3, 3]);
    }, [resetKey]);

    return (
      <div>
        <div className="scene-container">
          <Canvas
            ref={canvasRef}
            className="scene-canvas"
            gl={{
              preserveDrawingBuffer: true,
              toneMapping: NoToneMapping,
              outputColorSpace: SRGBColorSpace,
            }}
          >
            <SizeManager />
            <AutoCamera projection={projection} position={cameraPos} resetKey={resetKey} />
            {renderMode === 'head' ? (
              <Head skinUrl={skinUrl} showSecondLayer={showSecondLayer} onReady={onReady} />
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
      </div>
    );
  }
);
