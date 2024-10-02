import React, { useEffect, ReactElement } from 'react';
import { CourseCard } from '../Components/courseCard/CourseCard';
import GenericModal from '../Components/GenericModal';
import { EditCourseForm } from '../Components/EditCourseForm';
import { useCognitaFunc } from '../Hooks/useCognitaFunc';
import { ICourse } from '../Data/Interface';
import "./Home.css";

export function Home(): ReactElement {
  const { Courses, showEditModal, currentCourse, fetchCoursesAsync, handleEditClick, handleAddCourseClick, handleCloseModal, handleSaveCourse } = useCognitaFunc();

  useEffect(() => {
    fetchCoursesAsync(); // Fetch courses asynchronously
  }, []);

  return (
    <div className="container mt-5">
      <div className="container course-title">
        <h1 className="text-center mb-4">Available Courses</h1>
        {/* Click to add a new course */}
        <button className="addButton" onClick={() => handleAddCourseClick()}>
          <i className="bi bi-plus-circle-fill icon"></i> Add Course
        </button>
      </div>

      <div className="row course-container">
        {Courses.length > 0 ? (
          Courses.map((course: ICourse, index: number) => (
            <CourseCard key={index} course={course} onEditClick={() => handleEditClick(course)} />
          ))
        ) : (
          <p>No courses available.</p> 
        )}
      </div>

    {showEditModal && currentCourse && (
      <GenericModal
        show={showEditModal}
        handleClose={handleCloseModal}
        title={currentCourse ? "Edit Course" : "Add Course"}
        handleSave={() => handleSaveCourse(currentCourse)}
      >
        <EditCourseForm
          course={currentCourse}
        />
      </GenericModal>
    )}
    </div>
  );
}