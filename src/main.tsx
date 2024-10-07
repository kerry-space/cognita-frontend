// index.tsx (or main.tsx)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { AuthProvider, CognitaProvider } from './Context/index.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CognitaProvider>
        <RouterProvider router={router} />
      </CognitaProvider>
    </AuthProvider>
  </StrictMode>
);
 