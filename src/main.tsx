import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/700.css';
import './index.css';

import App from './App.tsx';
import '@radix-ui/themes/styles.css';
import { BrowserRouter } from 'react-router-dom';
import ThemeContextProvider from './components/ThemeContext/ThemeContextProvider.tsx';
import PathContext from './components/PathContext/PathContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <PathContext>
          <App />
        </PathContext>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
