import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router } from 'react-router';
import ContextProvider from './context/contextApi';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ContextProvider>
        <Router>
          <App />
        </Router>
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              background: '#BB9CED',
              color: '#fff',
            },
            position: 'bottom-center',
          }}
        />
      </ContextProvider>
    </ThemeProvider>
  </StrictMode>
);
