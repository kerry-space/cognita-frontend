import { Modal } from 'react-bootstrap';
import { IActivity } from './Interface';
import { Dispatch, SetStateAction } from "react";


 export interface ICourse{
   courseId: number;
   courseName: string;
    description: string ;
    endDate: string | Date ;
    startDate: string | Date;
   
 }

 export interface ICourseWithModule{
   courseId: number;
   courseName: string;
    description: string ;
    endDate: string | Date ;
    startDate: string | Date;
    modules: IModule[];
 }

 export interface IModule{
    moduleId: number;
    courseId: number;
    moduleName: string;
    description: string;
    startDate: string | Date;
    endDate: string | Date ;
    activities: IActivity[];
 }

 //Reminder about change to startTime becouse of inlcude time too
 export interface IActivity{
    activityId: number;
    description: string;
    activityType: IActivityType;
    activityName: string;
    startDate: string | Date;
    moduleId: number;

 }

export interface IActivityType{
    id: number;
    title: string;
}

export enum ActivityType {
   LECTURE = 'LECTURE',
   ASSIGNMENT = 'ASSIGNMENT',
   ELEARNING = 'ELEARNING',
 }

export interface ICognitaContext {
   Courses: ICourse[];
   currentCourse: ICourse | null;
   currentModule: IModule | null;
   currentActivity: IActivity | null;
   setCurrentCourse: (course: ICourse | null) => void;
   
   modalContent: IModule[];
   openModuleState: (content: string, module: IModule | null) => void;
   openActivityState: (content: string, module: IModule, activity: IActivity | null) => void;
   fetchCoursesAsync: () => void;
   handleAddCourseClick: () => void;
   calculateWeekStatus: (course: ICourse) => { weeks: number; status: string; startDate:  string | Date; endDate: string | Date };
   handleSaveCourse: (currentCourse: ICourse) => void;
   
   openModal: (content: string, course: ICourse | null) => void; 
   closeModal: () => void;
   modalState: { show: boolean; content: string | null };

   handleInputChange: (event: React.ChangeEvent<HTMLInputElement>)  => void;
   handleShowModal: (content: string) => void;
}


