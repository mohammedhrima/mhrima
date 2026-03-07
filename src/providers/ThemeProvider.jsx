import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

const AVAILABLE_THEMES = ['portfolio', 'claude', 'twitter', 'verecell', 'facebook', 'google'];
const DEFAULT_THEME = 'portfolio';
const DEFAULT_MODE = 'dark';
const STORAGE_KEY_THEME = 'theme';
const STORAGE_KEY_MODE = 'theme-mode';

// Apply theme and mode to document before React renders to prevent FOUC
function applyTheme(theme, mode) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
  }
}

// Get stored theme from localStorage with error handling
function getStoredTheme() {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_THEME);
    if (stored && AVAILABLE_THEMES.includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
  }
  
  return DEFAULT_THEME;
}

// Get stored mode from localStorage with error handling
function getStoredMode() {
  if (typeof window === 'undefined') {
    return DEFAULT_MODE;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_MODE);
    if (stored && (stored === 'dark' || stored === 'light')) {
      return stored;
    }
  } catch (error) {
    console.warn('Failed to access localStorage:', error);
  }
  
  return DEFAULT_MODE;
}

// Store theme to localStorage with error handling
function storeTheme(theme) {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  } catch (error) {
    console.warn('Failed to store theme to localStorage:', error);
  }
}

// Store mode to localStorage with error handling
function storeMode(mode) {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY_MODE, mode);
  } catch (error) {
    console.warn('Failed to store mode to localStorage:', error);
  }
}

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default
  const [theme, setThemeState] = useState(() => {
    const initialTheme = getStoredTheme();
    const initialMode = getStoredMode();
    // Apply theme immediately to prevent FOUC
    applyTheme(initialTheme, initialMode);
    return initialTheme;
  });

  const [mode, setModeState] = useState(() => getStoredMode());

  // Apply theme and mode on mount and whenever they change
  useEffect(() => {
    applyTheme(theme, mode);
    storeTheme(theme);
    storeMode(mode);
  }, [theme, mode]);

  const setTheme = (newTheme) => {
    if (AVAILABLE_THEMES.includes(newTheme)) {
      setThemeState(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Available themes:`, AVAILABLE_THEMES);
    }
  };

  const setMode = (newMode) => {
    if (newMode === 'dark' || newMode === 'light') {
      setModeState(newMode);
    } else {
      console.warn(`Invalid mode: ${newMode}. Must be 'dark' or 'light'`);
    }
  };

  const toggleMode = () => {
    setModeState(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  };

  const value = {
    theme,
    setTheme,
    themes: AVAILABLE_THEMES,
    resolvedTheme: theme, // For compatibility with next-themes API
    mode,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
