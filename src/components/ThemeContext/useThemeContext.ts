import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextType } from './ThemeContextProvider';

export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useThemeContext must be used within ThemeContextProvider');
  return context;
}
