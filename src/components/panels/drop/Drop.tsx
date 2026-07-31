import { useState, useCallback } from 'react';
import { DropIcon } from '../../common/icon/DropIcon';
import './Drop.css';

interface DropZoneProps {
  skinSrc: string | null;
  onLoadSkin: (file: File) => void;
}

export function DropZone({ skinSrc, onLoadSkin }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);

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

  return (
    <label
      className={`drop-zone ${dragging ? 'is-drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/png"
        className="drop-zone__input"
        onChange={handleFileChange}
      />

      {skinSrc ? (
        <>
          <img src={skinSrc} alt="Minecraft skin" className="drop-zone__image" />
          <span className="drop-zone__badge">skin</span>
        </>
      ) : (
        <div className="placeholder-wrap">
          <DropIcon active={dragging} />
          <div className="placeholder">
            <span className={`placeholder__title ${dragging ? 'is-drag-over' : ''}`}>
              {dragging ? 'drop here' : 'drop skin · png'}
            </span>
            <span className="placeholder__subtitle">64×64 or 64×32 · click to browse</span>
          </div>
        </div>
      )}
    </label>
  );
}
