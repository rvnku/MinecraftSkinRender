import { useState, useCallback, useEffect } from 'react';
import { validateSkin } from '../validation';

export function useSkinLoader() {
  const [skinSrc, setSkinSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [_, setReady] = useState(false);

  const loadSkin = useCallback((file: File) => {
    if (file.type !== 'image/png') {
      setError('invalid format — only png files are accepted');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const err = validateSkin(img);
      if (err) {
        URL.revokeObjectURL(url);
        setError(err);
        return;
      }

      setError(null);

      setSkinSrc(prev => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      setReady(false);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      setError('failed to load image');
    };

    img.src = url;
  }, []);

  useEffect(() => {
    return () => {
      if (skinSrc) URL.revokeObjectURL(skinSrc);
    };
  }, [skinSrc]);

  const clearError = useCallback(() => setError(null), []);

  const markReady = useCallback(() => setReady(true), []);

  return {
    skinSrc,
    error,
    loadSkin,
    clearError,
    markReady,
  };
}
