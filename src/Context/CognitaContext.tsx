import { createContext, ReactElement, ReactNode, SetStateAction, useState } from "react";
import { ActivityType, IActivity, ICognitaContext, ICourse, ICourseWithModule, IModule } from "../Data/Interface";
import CognitaDataStorage from "../Data/DataStorage";
import { useFetchWithToken } from "../Hooks";
import { BASE_URL } from "../utils";

interface ICognitaProviderProps {
  children: ReactNode;
}

export const CognitaContext = createContext<ICognitaContext>({} as ICognitaContext);

export function CognitaProvider({ children }: ICognitaProviderProps): ReactElement {
    const [Courses, setCourses] = useState<ICourse[]>([]);
    const [modalContent, setModalContent] = useState<IModule[]>([]);
    
    const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
    const [currentCourseModule, setCurrentCourseModule] = useState<ICourseWithModule[] | null>(null);
    const [currentActivity, setCurrentActivity] = useState<IActivity | null>(null);
    const [modalType, setModalType] = useState<string | null>(null);  // New state to track whether it's a module or activity


    const [modalState, setModalState] = useState<{ show: boolean; content: string | null }>({ show: false, content: null });

    
    //Crud backend 
   // Fetch courses
   const { requestFunc: fetchCourses } = useFetchWithToken<ICourse[]>(`${BASE_URL}/courses`);


     


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
        console.error('Error fetching random courses:', error);
      }
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
      courseId: 0, // New course should have courseId 0 or null
      courseName: "", // Ensure this key matches the form's 'name' attribute
      description: "",
      startDate: new Date().toISOString().substring(0, 10), // Default to current date
      endDate: new Date().toISOString().substring(0, 10),
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

const openModuleState = (content: string, module: IModule | null = null) => {
  setModalType('module');  // Set type to 'module'
  if (!module) {
    const newCourseModule: ICourseWithModule = {
      courseId: 0,
      courseName: "",
      description: "",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
  
      
    }; 
    const newModule: IModule = {
      ModuleId: 0,
      CourseId: currentCourse?.courseId || 0,
      ModuleName: "",
      Description: "",
      startDate: new Date().toISOString().substring(0, 10),
      endDate: new Date().toISOString().substring(0, 10),
      Activities: []
    };
    setCurrentCourseModule();
  } else {
    setCurrentCourseModule(module);
  }
  setModalState({ show: true, content });
};

const openActivityState = (content: string, module: IModule, activity: IActivity | null = null) => {
  setModalType('activity');  // Set type to 'activity'
  if (!activity) {
    const newActivity: IActivity = {
      ActivityeId: 0,
      ModuleId: module.ModuleId,
      ActivityName: "",
      Description: "",
      startDate: new Date().toISOString().substring(0, 10),

    };
    setCurrentActivity(newActivity);
  } else {
    setCurrentActivity(activity);
  }
  setCurrentCourseModule(module);
  setModalState({ show: true, content });
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
        
        currentActivity,
        
        setCurrentCourse,
        modalContent,

        fetchCoursesAsync,
        openModuleState,
        openActivityState,
        handleAddCourseClick,
        calculateWeekStatus,
        handleSaveCourse,
        

        openModal,
        closeModal,
        modalState,

        handleInputChange,
        handleShowModal,
        

        
    };

    return (
        <CognitaContext.Provider value={values}>
            {children}
        </CognitaContext.Provider>
    );
}





