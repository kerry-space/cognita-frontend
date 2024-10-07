import { createContext, ReactElement, ReactNode, useState } from "react";
import {
  IActivity,
  IActivityType,
  ICognitaContext,
  ICourse,
  ICourseWithModule,
  IModule,
} from "../Data/Interface";
import { useFetchWithToken } from "../Hooks";
import { BASE_URL } from "../utils";

interface ICognitaProviderProps {
  children: ReactNode;
  onSave?: () => void;
}

export const CognitaContext = createContext<ICognitaContext>(
  {} as ICognitaContext
);

export function CognitaProvider({
  children,
  onSave,
}: ICognitaProviderProps): ReactElement {
  const [Courses, setCourses] = useState<ICourse[]>([]);
  const [modalContent, setModalContent] = useState<IModule[]>([]);

  const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
  const [currentModule, setCurrentModule] = useState<IModule | null>(null);
  const [currentActivity, setCurrentActivity] = useState<IActivity | null>(null);
  const [courseModule, setCourseModule] = useState<ICourseWithModule>();

 /* const [module, setModule] = useState<IModule>({
    moduleId: currentModule?.moduleId || 0,
    courseId: currentModule?.courseId || 0,
    moduleName: currentModule?.moduleName || "",
    description: currentModule?.description || "",
    startDate: currentModule?.startDate || "",
    endDate: currentModule?.endDate || "",
    activities: currentModule?.activities || [],
  });

  const [activity, setActivity] = useState<IActivity>({
    activityId: 0,
    activityName: "",
    description: "",
    activityType: { id: 0, title: "" } as IActivityType,
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
    moduleId: 0,
  });*/

  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
  if(currentActivity){
    setCurrentActivity({ ...currentActivity,[name]: value,});
  }
  };

  const handleActivityTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value, options, selectedIndex } = event.target;
    const selectedText = options[selectedIndex].text; 
  
    if (currentActivity) {
      setCurrentActivity({
        ...currentActivity,
        activityType: { id: parseInt(value, 10), title: selectedText }, 
      });
    }
  };
  
  const handleModuleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if(currentModule){
      setCurrentModule({ ...currentModule,[name]: value,});
    }

  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (currentCourse) {
      setCurrentCourse({ ...currentCourse, [name]: value });
    }
  };

  const [modalState, setModalState] = useState<{
    show: boolean;
    content: string | null;
  }>({ show: false, content: null });

  //Crud backend
  // Fetch courses Crud
  const { requestFunc: fetchCourses } = useFetchWithToken<ICourse[]>(
    `${BASE_URL}/courses`
  );

  const { requestFunc: createCourse } = useFetchWithToken(
    `${BASE_URL}/courses`,
    {
      method: "POST",
      body: JSON.stringify(currentCourse),
      headers: { "Content-Type": "application/json" },
    }
  );
  const { requestFunc: updateCourse } = useFetchWithToken(
    `${BASE_URL}/courses/${currentCourse?.courseId}`,
    {
      method: "PUT",
      body: JSON.stringify(currentCourse),
      headers: { "Content-Type": "application/json" },
    }
  );



   // Backend hooks for modules
   const { requestFunc: createModule } = useFetchWithToken(`${BASE_URL}/courses/${courseModule?.courseId}/modules`, {
    method: "POST",
    body: JSON.stringify(currentModule),
    headers: { "Content-Type": "application/json" },
  });
  const { requestFunc: updateModule } = useFetchWithToken(`${BASE_URL}/modules/${currentModule?.moduleId}`, {
    method: "PUT",
    body: JSON.stringify(currentModule),
    headers: { "Content-Type": "application/json" },
  });

  // Backend hooks for activities   /api/courses/{id}/modules/{id2}/activities
  const { requestFunc: createActivity } = useFetchWithToken(
    `${BASE_URL}/courses/${currentModule?.courseId}/modules/${currentModule?.moduleId}/activities`,
    {
      method: "POST",
      body: JSON.stringify(currentActivity),
      headers: { "Content-Type": "application/json" },
    }
  );
  //PUT /api/activities/{id}

  

  const { requestFunc: updateActivity } = useFetchWithToken(
    `${BASE_URL}/activities/${currentActivity?.activityId}`, 
    {
      method: "PUT",
      body: JSON.stringify({
        activityName: currentActivity?.activityName,
        description: currentActivity?.description,
        startDate: currentActivity?.startDate,
        endDate: currentActivity?.endDate,
        activityTypeId: currentActivity?.activityType?.id, 
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  // Fetch courses asynchronously from an API
  const fetchCoursesAsync = async () => {
    try {
      const data = await fetchCourses();
      if (data) setCourses(data);
    } catch (error) {
      throw new Error("Failed to fetch course.");
      console.error("Error fetching random courses:", error);
    }
  };



  const handleSaveModule = async (): Promise<void> => {
    try {
      if (currentModule?.moduleId === 0) {
        // Create new module
        await createModule();
      } else {
        // Update existing module
        await updateModule();
      }
      if (onSave) onSave(); // Refetch or update state after saving
      closeModal(); // Close modal after saving
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };
  
  const handleSaveActivity = async (): Promise<void> => {
    try {
      console.log("Saving activity:", currentActivity); // Log the current activity
  
      if (currentActivity?.activityId === 0) {
        // Create new activity
        await createActivity();
      } else {
        // Update existing activity
        await updateActivity();
      }
      if (onSave) onSave(); // Refetch or update state after saving
      closeModal(); // Close modal after saving
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };


const handleSaveCourse = async (): Promise<void> => {
  if (currentCourse?.courseId === 0) {
    await createCourse();
  } else {
    await updateCourse();
  }
  // Optionally fetch updated course list
  fetchCoursesAsync();
  closeModal();
};



const handleAddCourseClick = (): void => {
  const newCourse: ICourse = {
    courseId: 0,
    courseName: "",
    description: "",
    startDate: new Date().toISOString().substring(0, 10),
    endDate: new Date().toISOString().substring(0, 10),
  };
  setCurrentCourse(newCourse);
  openModal("Add Course", newCourse);
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
      setCurrentCourse(course); // Set course for editing
    }
    setModalState({ show: true, content });
  };

  // Handle closing the modal
  const closeModal = () => {
    setModalState({ show: false, content: null });
  };

 
  const openModuleState = (content: string, module: IModule | null = null) => {
    if (module) {
      setCurrentModule(module); // Edit existing module
    } else {
      // Add a new module
      setCurrentModule({
        moduleId: 0, // Signifies a new module
        courseId: currentCourse?.courseId || 0, // Ensure courseId is set
        moduleName: "",
        description: "",
        startDate: new Date().toISOString().substring(0, 10), // Default to today's date
        endDate: new Date().toISOString().substring(0, 10), // Default to today's date
        activities: [], // No activities yet
      });
    }
    setModalState({ show: true, content });
  };
  
  const openActivityState = (
    content: string,
    module: IModule,
    activity: IActivity | null = null
  ) => {
    if (activity) {
      setCurrentActivity(activity); // Edit existing activity
    } else {
      // Add a new activity, ensure moduleId is correctly set here
      setCurrentActivity({
        activityId: 0, // New activity
        moduleId: module.moduleId, // Ensure this is passed correctly from the selected module
        activityName: "",
        description: "",
        activityType: { id: 1, title: "Lecture" }, // Default type
        startDate: new Date().toISOString().substring(0, 10), // Default to today
        endDate: new Date().toISOString().substring(0, 10), // Default to today
      });
    }
    setModalState({ show: true, content });
  };
  
 

  // Calculate weeks and status for the course
  const calculateWeekStatus = (course: ICourse) => {
    const startDate = new Date(course.startDate);
    const endDate = new Date(course.endDate);
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const weeks = Math.ceil(diffInMilliseconds / (7 * 24 * 60 * 60 * 1000)); // Convert milliseconds to weeks

    const currentDate = new Date();
    let status = "Upcoming"; // Default to Upcoming
    if (currentDate >= startDate && currentDate <= endDate) {
      status = "In-Progress";
    } else if (currentDate > endDate) {
      status = "Completed";
    }

    return {
      weeks,
      status,
      startDate: course.startDate,
      endDate: course.endDate,
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
    currentModule,
    currentActivity,
  
    courseModule, 
    setCourseModule,

    handleActivityChange,
    handleActivityTypeChange,
    handleModuleChange,

    setCurrentCourse,
    modalContent,

    fetchCoursesAsync,
    handleSaveModule,
    handleSaveActivity,

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
    <CognitaContext.Provider value={values}>{children}</CognitaContext.Provider>
  );
}
