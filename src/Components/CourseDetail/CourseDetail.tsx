import React, { useEffect, useState, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { Participants } from '../Participants/Participants';
import { ICourseWithModule } from '../../Data/Interface';
import { Module } from '../Moduler/Module';

import "./CourseDetail.css"
import { BASE_URL } from '../../utils';
import { useFetchWithToken } from '../../Hooks';

export function CourseDetail(): ReactElement {
  const { courseId } = useParams<{ courseId: string }>();


  const [courseModule, setCourseModule] = useState<ICourseWithModule>();

  const { requestFunc: fetchCoursesModel } = useFetchWithToken<ICourseWithModule>(`${BASE_URL}/courses/${courseId}`);

  
  /*const { requestFunc: createUserAsync } = useFetchWithToken(
    `${BASE_URL}/authentication`,
    {
      method: 'POST',
      body: JSON.stringify(formValues),
      headers: { 'Content-Type': 'application/json' },
    }
  );*/

   
  useEffect(() => {
    fetchCoursesModel().then(data => {if(data) setCourseModule(data)})
  }, []);

  console.log(courseModule)
  if (!courseModule) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-detail-container">
      <div className="main-content">
        <CourseInfo course={courseModule}  />
        <Participants course={courseModule} />
      </div>
    <Module course={courseModule}/>
    </div>
  );
}