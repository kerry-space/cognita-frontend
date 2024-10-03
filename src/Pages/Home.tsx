import React, { useEffect, ReactElement } from 'react';
import { CourseCard } from '../Components/courseCard/CourseCard';
import GenericModal from '../Components/GenericModal';
import { EditCourseForm } from '../Components/EditCourseForm';
import { useCognitaFunc } from '../Hooks/useCognitaFunc';
import { ICourse } from '../Data/Interface';
import "./Home.css";

export function Home(): ReactElement {
  const { 
    Courses, 
    modalState, 
    currentCourse, 
    fetchCoursesAsync, 
    openModal, 
    closeModal, 
    handleSaveCourse, 
    handleAddCourseClick 
  } = useCognitaFunc();

  useEffect(() => {
    fetchCoursesAsync();
  }, []);

  return (
    <div className="container mt-5">
      <div className="container course-title">
        <h1 className="text-center mb-4">Available Courses</h1>
        <button className="addButton" onClick={handleAddCourseClick}>
          <i className="bi bi-plus-circle-fill icon"></i> Add Course
        </button>
      </div>
 
      <div className="row course-container">
        {Courses.length > 0 ? (
          Courses.map((course: ICourse, index: number) => (
            <CourseCard key={index} course={course} onEditClick={() => openModal('Edit Course', course)} />
          )) 
        ) : (
          <p>No courses available.</p> 
        )}
      </div>

      {modalState.show && currentCourse && (
        <GenericModal
          show={modalState.show}
          handleClose={closeModal}
          title={modalState.content!}
          handleSave={() => handleSaveCourse(currentCourse!)}
        >
          <EditCourseForm course={currentCourse} />
        </GenericModal>
      )}
    </div>
  );
}