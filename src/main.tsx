// index.tsx (or main.tsx)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { CognitaProvider } from './Context/CognitaContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CognitaProvider>
      <RouterProvider router={ router } />
    </CognitaProvider>
<<<<<<< HEAD
  </StrictMode>
);
=======
  </StrictMode>,
);
>>>>>>> developer
