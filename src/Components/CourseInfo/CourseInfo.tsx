import React from 'react';
import { ICourse } from '../../Data/Interface';
import { useCognitaFunc } from '../../Hooks/useCognitaFunc';
import "./CourseInfo.css"

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
    <div className="card course-info-container">
      <h1>{course.courseName}</h1>
      <p>{course.description}</p>
      <div className='card-info'>
        <i className="bi bi-calendar3" style={{ marginRight: '5px', color: '#2c1a4d' }}></i>
        <p className='card-date'>{`${startDate} - ${endDate}`}</p>
      </div>
      <div className="button-container">
        <button className="button" onClick={() => handleDocumentAction('upload')}>
          <i className="bi bi-upload" style={{ marginRight: '5px' }}></i>
          Upload Documents
        </button>
        <button className="button" onClick={() => handleDocumentAction('view')}>
          <i className="bi bi-file-earmark-text" style={{ marginRight: '5px' }}></i>
          View Documents (5)
        </button>
      </div>
    </div>
  );
} 