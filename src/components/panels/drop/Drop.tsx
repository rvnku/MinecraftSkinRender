import { useState, useCallback, useRef } from 'react';
import { DropIcon } from '../../common/icon/DropIcon';
import { Panel } from '../Panel';
import { Placeholder } from '../../placeholder/Placeholder';
import { NicknameRow } from '../../row/NicknameRow';
import type { SkinSystem } from '../../../types';
import './Drop.css';

interface DropZoneProps {
  skinSrc: string | null;
  detectedModelType?: 'slim' | 'classic';
  skinSystem: SkinSystem;
  nickname: string;
  onLoadSkin: (file: File) => void;
  onSkinSystemChange: (system: SkinSystem) => void;
  onNicknameChange: (nickname: string) => void;
}

export function DropZone({
  skinSrc,
  detectedModelType,
  skinSystem,
  nickname,
  onLoadSkin,
  onSkinSystemChange,
  onNicknameChange,
}: DropZoneProps) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onLoadSkin(file);
    },
    [onLoadSkin]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onLoadSkin(file);
      e.target.value = '';
    },
    [onLoadSkin]
  );

  const handleContainerClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const nicknamerow = (
    <NicknameRow
      skinSystem={skinSystem}
      nickname={nickname}
      setSkinSystem={onSkinSystemChange}
      setNickname={onNicknameChange}
    />
  );

  const footer = (
    <>
      <span>skin</span>
      <span>{detectedModelType || 'classic'}</span>
    </>
  );

  const wrapper = (
    <div
      className={`droppable ${dragging ? 'dragging' : ''}`}
      onClick={handleContainerClick}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {skinSrc ? (
        <img src={skinSrc} className="dropzone-image" draggable={false} />
      ) : (
        <div>
          <Placeholder
            title={dragging ? 'drop here' : 'drop skin · png'}
            subtitle="64×64 or 64×32 · click to browse"
            active={dragging}
          >
            <DropIcon active={dragging} />
          </Placeholder>
        </div>
      )}
    </div>
  );

  return (
    <>
      <Panel actionbar={nicknamerow} footer={footer} placeholder={wrapper}>
        {skinSrc && wrapper}
      </Panel>
      <input
        type="file"
        accept="image/png"
        ref={fileInputRef}
        className="dropzone-input"
        onChange={handleFileChange}
      />
    </>
  );
}
