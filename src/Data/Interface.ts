export interface ICourse {
  courseId: number;
  courseName: string;
  description: string;
  endDate: string | Date;
  startDate: string | Date;
}

export interface IModule {
  ModuleId: number;
  CourseId: string;
  ModuleName: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  Activities: IActivity[];
}

//Reminder about change to startTime becouse of inlcude time too
export interface IActivity {
  ActivityeId: number;
  Description: string;
  Type: IActivityType;
  ActivityName: string;
  StartDate: Date;
  ModuleId: number;
}

export interface IActivityType {
  id: number;
  title: string;
}

export interface ICognitaContext {
  Courses: ICourse[];
  currentCourse: ICourse | null;
  setCurrentCourse: (course: ICourse | null) => void;

  fetchCoursesAsync: () => void;
  handleAddCourseClick: () => void;
  calculateWeekStatus: (course: ICourse) => {
    weeks: number;
    status: string;
    startDate: string | Date;
    endDate: string | Date;
  };
  handleSaveCourse: (currentCourse: ICourse) => void;

  openModal: (content: string, course: ICourse | null) => void;
  closeModal: () => void;
  modalState: { show: boolean; content: string | null };

  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  findCourseById: (courseId: number) => ICourse | null;
  handleShowModal: (content: string) => void;
}
