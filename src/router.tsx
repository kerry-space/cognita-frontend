import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import { Home } from "./Pages/Home";
import { CourseDetail } from "./Components/CourseDetail/CourseDetail";



import { LoginPage } from './Pages';
import { RequireAuth } from './Components/RequireAuth/RequireAuth';



export const router = createBrowserRouter(

    createRoutesFromElements(
      <>
        <Route path="/" element={<RequireAuth children={<App />} />} >
          <Route element={<Home />} index />
          <Route path="/course/:courseId" element={<CourseDetail />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </>
      
    )
  );



