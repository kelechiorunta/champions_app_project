// ThemeContext.tsx
import React, { useState } from 'react';
import { Theme } from '@radix-ui/themes';
import { ThemeContext } from './ThemeContext';

// Define possible appearances for Radix UI
export type Appearance = 'light' | 'dark';

// Define the shape of our context
export interface ThemeContextType {
  appearance: Appearance | string;
  toggleAppearance: () => void;
}

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const localTheme = localStorage.getItem('localTheme');
  const [appearance, setAppearance] = useState<Appearance | string>(localTheme || 'light');
  const [fade, setFade] = useState(false);

  const toggleAppearance = () => {
    setFade(true);
    setTimeout(() => {
      setAppearance((prev) => (prev === 'light' ? 'dark' : 'light'));
      setFade(false);
    }, 500); // match fade timing
    // Update both persistent toggled theme with localStorage localTheme object and current state appearance
    if (appearance === 'light') {
      localStorage.setItem('localTheme', 'dark');
    } else {
      localStorage.setItem('localTheme', 'light');
    }
  };

  //
  // useEffect(() => {
  //   const localTheme = localStorage.getItem('localTheme');
  //   if (localTheme) setAppearance(localTheme);
  // }, [appearance]);

  // const gradientLight = 'radial-gradient(circle at top left, #b2ebf2, #e0f7fa, #ffffff)';
  // const gradientDark = 'radial-gradient(circle at bottom right, #0a192f, #112240, #1b2735)';

  return (
    <ThemeContext.Provider value={{ appearance, toggleAppearance }}>
      {/* The actual Radix theme and content */}
      <Theme
        appearance={appearance as Appearance}
        panelBackground="translucent"
        accentColor="cyan"
        grayColor="olive"
        hasBackground
      >
        {/* <div style={{ position: 'relative', zIndex: 1 }}> */}
        <div
          style={{
            minHeight: '100vh',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            background:
              appearance === 'light'
                ? 'radial-gradient(circle at top right, #fff7f0 0%, #fefcfb 40%, #ffffff 100%)'
                : 'radial-gradient(circle at bottom right, #0a0f24 0%, #1b2735 40%, #2c5364 100%)',
            // background:
            //   appearance === 'light'
            //     ? 'radial-gradient(circle at 30% 20%, #e8faff 0%, #f4f9ff 45%, #ffffff 100%)'
            //     : 'radial-gradient(circle at bottom right, #0a0f24 0%, #1b2735 40%, #2c5364 100%)',
            // background:
            //   appearance === 'light'
            //     ? 'radial-gradient(circle at top right, #c2f0ff 0%, #e0f7fa 25%, #fdfdfd 80%)'
            //     : 'radial-gradient(circle at bottom right, #0a0f24 0%, #1b2735 40%, #2c5364 100%)',
            transition: 'background 1s ease-in-out, color 0.5s ease-in-out, opacity 0.5s ease',
            color: appearance === 'light' ? '#111' : '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            animation: 'gradientShift 14s ease-in-out infinite',
            backgroundSize: '300% 300%',
            opacity: fade ? 0 : 1
          }}
        >
          <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
          {children}
        </div>
      </Theme>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleAppearance}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          padding: '0.6rem 1rem',
          borderRadius: '10px',
          background: appearance === 'light' ? '#2c5364' : '#e0f7fa',
          color: appearance === 'light' ? '#fff' : '#111',
          fontWeight: 600,
          border: 'none',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          zIndex: 10
        }}
      >
        {appearance === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
    </ThemeContext.Provider>
  );
}
