import { createContext, ReactElement, ReactNode, SetStateAction, useState } from "react";
import { ICognitaContext, ICourse } from "../Data/Interface";
import CognitaDataStorage from "../Data/DataStorage";
import { useFetchWithToken } from "../Hooks";
import { BASE_URL } from "../utils";

interface ICognitaProviderProps {
  children: ReactNode;
}

export const CognitaContext = createContext<ICognitaContext>({} as ICognitaContext);

export function CognitaProvider({ children }: ICognitaProviderProps): ReactElement {
    const [Courses, setCourses] = useState<ICourse[]>([]);
    const [createdCourse, setcreatedCourse] = useState<ICourse | null>(null);
    
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
    const [modalState, setModalState] = useState<{ show: boolean; content: string | null }>({ show: false, content: null });
    
    
    //Crud backend 
    const { requestFunc:fetchCourses } = useFetchWithToken<ICourse[]>(
        `${BASE_URL}/courses`
      );

     


    // Fetch courses asynchronously from an API
    const fetchCoursesAsync = async () => {
      try {
        
        const data  = await fetchCourses();
        console.log(data);
        if(data)
        setCourses(data)
        console.log("courseset: "+ Courses)
       
      } catch (error) {
        throw new Error('Failed to fetch course.');
        console.error('Error fetching random cocktail:', error);
      }
    };

    // Find a course by its CourseId
    const findCourseById = (courseId: number): ICourse | null => {
        const course = Courses.find((course) => course.courseId === courseId);
        return course || null; // Return null if no course is found
    };



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
  
      // Check if currentCourse exists and update it with new values
      if (currentCourse) {
          setCurrentCourse({ ...currentCourse, [name]: value });
      }
  };




  const handleAddCourseClick = (): void => {
    const newCourse: ICourse = {
        courseId: 0,  // New course should have courseId 0 or null
        courseName: "",  // Ensure this key matches the form's 'name' attribute
        description: "",
        startDate: new Date().toISOString().substring(0, 10),  // Default to current date
        endDate: new Date().toISOString().substring(0, 10),    // Default to current date
    };
    setCurrentCourse(newCourse);  // Set the new course as the current course
    openModal('Add Course', newCourse);  // Pass the new course to the modal
};

    
const openModal = (content: string, course: ICourse | null = null) => {
  if (!course) {
      // If no course is provided, assume it's the "Add Course" case and set an empty course
      const newCourse: ICourse = {
          courseId: 0,
          courseName: "",
          description: "",
          startDate: new Date().toISOString().substring(0, 10),
          endDate: new Date().toISOString().substring(0, 10),
      };
      setCurrentCourse(newCourse);
  } else {
      setCurrentCourse(course);  // Set course for editing
  }
  setModalState({ show: true, content });
};

    // Handle closing the modal
    const closeModal = () => {
        setModalState({ show: false, content: null });
    };



    const handleSaveCourse = async (currentCourse: ICourse): Promise<void> => {
        const requestOptions: RequestInit = {
          method: currentCourse.courseId === 0 ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentCourse)
        };
      
        try {
          const url = currentCourse.courseId === 0
            ? `${BASE_URL}/courses`  // POST (Create new course)
            : `${BASE_URL}/courses/${currentCourse.courseId}`;  // PUT (Update existing course)
      
          const response = await fetch(url, requestOptions);
          if (!response.ok) {
            throw new Error(`Failed to ${currentCourse.courseId === 0 ? 'create' : 'update'} the course`);
          }
      
          // Optionally fetch updated course list
          fetchCoursesAsync();
          closeModal();
        } catch (error) {
          console.error('Error saving course:', error);
        }
      };

    // Calculate weeks and status for the course
    const calculateWeekStatus = (course: ICourse) => {
        const startDate = new Date(course.startDate);
        const endDate = new Date(course.endDate);
        const diffInMilliseconds = endDate.getTime() - startDate.getTime();
        const weeks = Math.ceil(diffInMilliseconds / (7 * 24 * 60 * 60 * 1000)); // Convert milliseconds to weeks

        const currentDate = new Date();
        let status = 'Upcoming'; // Default to Upcoming
        if (currentDate >= startDate && currentDate <= endDate) {
            status = 'In-Progress';
        } else if (currentDate > endDate) {
            status = 'Completed';
        }

        return {
            weeks,
            status,
            startDate: course.startDate,
            endDate: course.endDate
        };
    };

  




      // Handle showing the document modal
  const handleShowModal = (content: string) => {
    setModalState({ show: true, content });
  };

    // Provide values and functions via the context
    const values: ICognitaContext = {
        Courses,
        currentCourse,
        setCurrentCourse,

        fetchCoursesAsync,
        handleAddCourseClick,
        calculateWeekStatus,
        handleSaveCourse,

        openModal,
        closeModal,
        modalState,

        handleInputChange,
        findCourseById,
        handleShowModal,
        

        
    };

    return (
        <CognitaContext.Provider value={values}>
            {children}
        </CognitaContext.Provider>
    );
}





