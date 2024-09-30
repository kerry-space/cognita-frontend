import { Dispatch, SetStateAction } from "react";


 export interface ICourse{
    CourseId: number;
    CourseName: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    modules?: IModule[];

 }



 export interface IModule{
    ModuleId: number;
    CourseId: string;
    ModuleName: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    Activities: IActivity[];
 }

 //Reminder about change to startTime becouse of inlcude time too
 export interface IActivity{
    ActivityeId: number;
    Description: string;
    Type: IActivityType;
    ActivityName: string;
    StartDate: Date;
    ModuleId: number;

 }

export interface IActivityType{
    id: number;
    title: string;
}


export interface ICognitaContext {
   Courses: ICourse[];
   showEditModal: boolean;
   setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
   currentCourse: ICourse | null;
   setCurrentCourse: (course: ICourse | null) => void;
   modalState: { show: boolean; content: string | null }
   setModalState: Dispatch<SetStateAction<{ show: boolean; content: string | null; }>>;
   fetchCoursesAsync: () => void;
   handleAddCourseClick: () => void;
   handleEditClick: (course: ICourse) => void;
   handleCloseModal: () => void;
   handleSaveCourse: (updatedCourse: ICourse) => void;
   calculateWeekStatus: (course: ICourse) => { weeks: number; status: string; startDate: string; endDate: string };
   findCourseById: (courseId: number) => ICourse | null; 
   handleShowModal: (content: string) => void;
}


