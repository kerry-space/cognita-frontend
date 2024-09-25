import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import { LoginPage } from './Pages';
import { RequireAuth } from './Components/RequireAuth/RequireAuth';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RequireAuth children={<App />} />}></Route>
      <Route path='/login' element={<LoginPage />} />
    </>
  )
);
