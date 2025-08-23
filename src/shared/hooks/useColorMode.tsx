import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage.tsx';

const useColorMode = () => {
  const [storedMode, setStoredMode] = useLocalStorage<'light' | 'dark' | 'system'>('color-theme', 'system');
  const [colorMode, setColorMode] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    const applyMode = (mode: 'light' | 'dark') => {
      if (mode === 'dark') {
        bodyClass.add(className);
      } else {
        bodyClass.remove(className);
      }
    };

    const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    const getPreferredMode = () =>
      storedMode === 'system' ? (systemDarkMode.matches ? 'dark' : 'light') : storedMode;

    const updateMode = () => {
      const mode = getPreferredMode();
      setColorMode(mode);
      applyMode(mode);
    };

    updateMode();

    // Opcional: escucha cambios del sistema si está en modo 'system'
    if (storedMode === 'system') {
      systemDarkMode.addEventListener('change', updateMode);
      return () => systemDarkMode.removeEventListener('change', updateMode);
    }
  }, [storedMode]);

  return [colorMode, setStoredMode] as const;
};

export default useColorMode;