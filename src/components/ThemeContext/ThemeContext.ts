import type { ThemeContextType } from './ThemeContextProvider';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
