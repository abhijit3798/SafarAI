import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook for managing App theme modes (light / dark).
 * Automatically updates document DOM element on state updates.
 */
export default function useTheme() {
  const [theme, setTheme] = useLocalStorage('safar_ai_theme', 'dark'); // Default to dark for premium styling

  useEffect(() => {
    // Apply theme attribute to document element
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };
}
