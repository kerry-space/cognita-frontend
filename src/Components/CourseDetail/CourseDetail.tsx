import React, { useEffect, useState, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { CourseInfo } from '../CourseInfo/CourseInfo';
import { Participants } from '../Participants/Participants';
import { useCognitaFunc } from '../../Hooks/useCognitaFunc';
import { ICourse } from '../../Data/Interface';
import GenericModal from '../GenericModal';
import { Module } from '../Moduler/Module';

import "./CourseDetail.css"

export function CourseDetail(): ReactElement {
  const { courseId } = useParams<{ courseId: string }>();
  const {
    findCourseById,
  } = useCognitaFunc(); // Using Cognita context
  const [course, setCourse] = useState<ICourse | null>(null);

  useEffect(() => {
    const courseDetails = findCourseById(Number(courseId));
    setCourse(courseDetails);
  }, [courseId, findCourseById]);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-detail-container">
      <div className="main-content">
        <CourseInfo course={course}  />
        <Participants course={course} />
      </div>

    </div>
  );
}