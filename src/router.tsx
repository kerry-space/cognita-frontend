import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import { LoginPage, UserManagement } from './Pages';
import { RequireAuth } from './Components';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<RequireAuth children={<App />} />}>
        <Route path='user-management' element={<UserManagement />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </>
  )
);
