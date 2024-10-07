import { useEffect, ReactElement } from 'react';
import { CourseCard } from '../Components/courseCard/CourseCard';
import GenericModal from '../Components/GenericModal';
import { EditCourseForm } from '../Components/EditCourseForm';
import { useCognitaFunc } from '../Hooks/useCognitaFunc';
import { ICourse } from '../Data/Interface';
import './Home.css';
import { useAuthContext } from '../Hooks';

export function Home(): ReactElement {
  const { tokens } = useAuthContext();

  const {
    Courses,
    modalState,
    currentCourse,
    fetchCoursesAsync,
    openModal,
    closeModal,
    handleSaveCourse,
    handleAddCourseClick,
  } = useCognitaFunc();

  useEffect(() => {
    fetchCoursesAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container home-container mt-5'>
      <div className='container home-container course-title'>
        <h1 className='text-center mb-4'>Available Courses</h1>
       {tokens?.role === "Admin" && (
         <button className='addButton' onClick={handleAddCourseClick}>
         <i className='bi bi-plus-circle-fill icon'></i> Add Course
       </button>
       )}
      </div>

      <div className='row course-container'>
        {Courses.length > 0 ? (
          Courses.map((course: ICourse, index: number) => (
            <CourseCard
              key={index}
              course={course}
              onEditClick={() => openModal('Edit Course', course)}
            />
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </div>
 
      {modalState.show && (
        <GenericModal
          show={modalState.show}
          handleClose={closeModal}
          title={modalState.content!}
          handleSave={handleSaveCourse}>
          <EditCourseForm course={currentCourse} />
        </GenericModal>
      )}
    </div>
  );
}
