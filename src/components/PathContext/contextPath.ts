import type { PathContextType } from './PathContext';
import { createContext } from 'react';

export const ContextPath = createContext<PathContextType | undefined>(undefined);
