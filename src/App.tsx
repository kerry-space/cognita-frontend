import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useCognitaFunc } from './Hooks/useCognitaFunc';

function App() {
  const { fetchCoursesAsync } = useCognitaFunc(); // Use useCognitaContext

  useEffect(() => {
    fetchCoursesAsync();
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
