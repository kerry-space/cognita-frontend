

 export interface ICourse{
    CourseId: number;
    CourseName: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    modules: IModule[];

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

    fetchCoursesAsync:  () => void;
    
    //fetchRandomCocktail: (value : string) => Promise<void>;
   // advancedSearchCocktails: ((params: { name?: string, category?: string, ingredient?: string, glass?: string }) => Promise<ICocktail[]>);
  
}


