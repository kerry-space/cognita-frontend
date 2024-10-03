import React from 'react';
import { Link } from 'react-router-dom';
import { ICourse } from '../../Data/Interface';
import './CourseCard.css';
import { useCognitaFunc } from '../../Hooks/useCognitaFunc';

interface ICourseCardProps {
  course: ICourse;
  onEditClick: () => void;
}

export function CourseCard({ course, onEditClick }: ICourseCardProps) {
  const { calculateWeekStatus,  } = useCognitaFunc();
  const { weeks, status, startDate, endDate } = calculateWeekStatus(course);

  
  
  return (
    <div className="card  coursecard-container">
      <Link to={`/course/${course.courseId}`} className="card-link" style={{ textDecoration: 'none' }}>
        <h4 className="card-title">{course.courseName}</h4>
        <div className="card-info">
          <i className="bi bi-calendar3" style={{ marginRight: '5px', color: '#2c1a4d' }}></i>
          <p className="card-date">
            {startDate.toString()} - {endDate.toString()}
          </p>
        </div>
        <div className="card-status">
          <span className="card-duration">{weeks} weeks</span>
          <span className={`status status-${status.toLowerCase()}`}>{status}</span>
        </div>
        <i
          className="bi bi-pencil-square"
          onClick={(e) => {
            e.preventDefault();
            onEditClick();
          }}
          style={{ position: 'absolute', top: '20px', right: '20px', color: '#2c1a4d', cursor: 'pointer' }}
        ></i>
      </Link>
    </div>
  );
}
