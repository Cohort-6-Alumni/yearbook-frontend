import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
