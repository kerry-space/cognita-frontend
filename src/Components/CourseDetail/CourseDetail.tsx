import React, { useEffect, useState, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { Participants } from '../Participants/Participants';
import { ICourseWithModule } from '../../Data/Interface';
import { Module } from '../Moduler/Module';

import "./CourseDetail.css"
import { BASE_URL } from '../../utils';
import { useCognitaFunc, useFetchWithToken } from '../../Hooks';

export function CourseDetail(): ReactElement {
  const { courseId } = useParams<{ courseId: string }>();
  const {   courseModule, 
    setCourseModule,
    } = useCognitaFunc();


  const { requestFunc: fetchCoursesModel } = useFetchWithToken<ICourseWithModule>(
    `${BASE_URL}/courses/${courseId}`
  );

  const fetchCourseData = async () => {
    try {
      const data = await fetchCoursesModel();
      if (data) {
        setCourseModule(data); // Set the fetched course with updated modules/activities
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  // Ensure the updated courseModule data is displayed after module/activity updates
  const handleModuleOrActivitySaved = async () => {
    await fetchCourseData(); // Refetch course data after any updates to modules or activities
  };

  if (!courseModule) {
    return <div>Course not found</div>;
  }

  console.log("-----: "+ JSON.stringify(courseModule,null, 2))
  return (
    <div className="container course-detail-container">
      <div className="main-content">
        <CourseInfo course={courseModule} />
        <Participants course={courseModule} />
      </div>
      <Module course={courseModule} onSave={handleModuleOrActivitySaved} /> {/* Pass callback to update data */}
    </div>
  );
}