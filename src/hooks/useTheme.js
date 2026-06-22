import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook for managing App theme modes (System / Light / Dark).
 * Automatically updates document DOM element on state updates.
 */
export default function useTheme() {
  const [themeMode, setThemeMode] = useLocalStorage('safar_ai_theme_mode', 'system');
  const [resolvedTheme, setResolvedTheme] = useState('dark'); // Default fallback to dark

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      let activeTheme = 'dark';
      if (themeMode === 'system') {
        activeTheme = mediaQuery.matches ? 'dark' : 'light';
      } else {
        activeTheme = themeMode;
      }
      setResolvedTheme(activeTheme);
      document.documentElement.setAttribute('data-theme', activeTheme);
    };

    updateTheme();

    // Listen to OS theme changes if theme mode is system
    const listener = () => {
      if (themeMode === 'system') {
        updateTheme();
      }
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      if (prevMode === 'system') return 'light';
      return prevMode === 'light' ? 'dark' : 'light';
    });
  };

  return {
    themeMode,
    setThemeMode,
    theme: resolvedTheme,
    toggleTheme,
    isDark: resolvedTheme === 'dark'
  };
}

