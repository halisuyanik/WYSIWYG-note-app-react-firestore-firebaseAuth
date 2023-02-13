import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './context/useThemeContext';
import { AuthContextProvider } from './context/useAuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ThemeProvider>
);

