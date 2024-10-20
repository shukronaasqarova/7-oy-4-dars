import React, { createContext, useState } from 'react';
import MainLayout from './layouts/MainLayout';

export const ThemeContext = createContext();

function App() {

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}> 
        <MainLayout>
        </MainLayout>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
