import React from 'react';
import { ICourse } from '../../Data/Interface';
import { useCognitaFunc } from '../../Hooks/useCognitaFunc';
import GenericModal from '../GenericModal'; // Ensure this is imported correctly

interface CourseInfoProps {
  course: ICourse;
  onEditClick?: () => void;
}

export function CourseInfo({ course, }: CourseInfoProps) {
  const { calculateWeekStatus, handleShowModal } = useCognitaFunc();
  const { startDate, endDate } = calculateWeekStatus(course);

  const handleDocumentAction = (actionType: 'upload' | 'view') => {
    handleShowModal(actionType);
  };

  return (
    <div className="card course-info">
      <h1>{course.CourseName}</h1>
      <p>{course.Description}</p>
      <p>{`${startDate} - ${endDate}`}</p>
      <div className="button-container">
        <button className="button" onClick={() => handleDocumentAction('upload')}>Upload Documents</button>
        <button className="button" onClick={() => handleDocumentAction('view')}>View Documents (5)</button>
      </div>
 

    </div>
  );
} 