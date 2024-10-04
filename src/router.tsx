import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App';
import { LoginPage, UserManagement, Home } from './Pages';
import { CourseDetail } from './Components/CourseDetail/CourseDetail';
import { RequireAuth } from './Components/RequireAuth';

export const router = createBrowserRouter(
  
  createRoutesFromElements(
    <>
      <Route path='/' element={<RequireAuth children={<App />} />}>
        <Route element={<Home />} index />
        <Route path='/course/:courseId' element={<CourseDetail />} />
        <Route path='user-management' element={<UserManagement />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </>
  )
);
