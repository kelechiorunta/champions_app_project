import { useContext } from 'react';
import { ContextPath } from './contextPath';
import type { PathContextType } from './PathContext';

export function usePathContext(): PathContextType {
  const context = useContext(ContextPath);
  if (!context) throw new Error('useThemeContext must be used within ThemeContextProvider');
  return context;
}
