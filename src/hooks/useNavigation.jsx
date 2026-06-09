import React, { createContext, useContext, useState, useEffect } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  // Read location hash, strip '#'
  const getHash = () => {
    const hash = window.location.hash.replace('#', '');
    return hash || 'splash';
  };

  const [currentPath, setCurrentPath] = useState(getHash());
  const [navigationState, setNavigationState] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(getHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  /**
   * Navigate to a path using location hash updates.
   * @param {string} path - Target path name (e.g. 'home', 'planner', 'settings')
   * @param {any} state - Optional payload state to pass to the destination page
   */
  const navigateTo = (path, state = null) => {
    setNavigationState(state);
    window.location.hash = path;
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigationState, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
