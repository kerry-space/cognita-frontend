import { useEffect } from 'react';
import './App.css';

import { Outlet } from 'react-router-dom';
import { CognitaProvider } from './Context/CognitaContext';
import { useCognitaFunc } from './Hooks/useCognitaFunc';

function App() {
  const { fetchCoursesAsync } = useCognitaFunc(); // Use useCognitaContext

  useEffect(() => {
    fetchCoursesAsync();
  }, [fetchCoursesAsync]);

  return (
    <> 
      <CognitaProvider>
        <Outlet />
      </CognitaProvider>
    </>
  );
}

export default App;