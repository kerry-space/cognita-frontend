import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import { Home } from "./Pages/Home";
import { CourseDetail } from "./Components/CourseDetail/CourseDetail";


export const router = createBrowserRouter(

    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route element={<Home />} index />
        <Route path="/course/:courseId" element={<CourseDetail />} />

        
      </Route>
    )
  );