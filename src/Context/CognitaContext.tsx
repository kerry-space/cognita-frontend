import { createContext, ReactElement, ReactNode, useState } from "react";
import { ICognitaContext, ICourse } from "../Data/Interface";
import CognitaDataStorage from "../Data/DataStorage";

interface ICognitaProviderProps {
    children: ReactNode;
}

export const CognitaContext = createContext<ICognitaContext>({} as ICognitaContext);

export function CognitaProvider({ children }: ICognitaProviderProps): ReactElement {
    const [Courses, setCourses] = useState<ICourse[]>(CognitaDataStorage);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentCourse, setCurrentCourse] = useState<ICourse | null>(null);
    const [modalState, setModalState] = useState<{ show: boolean; content: string | null }>({ show: false, content: null });

    // Fetch courses asynchronously from an API
    const fetchCoursesAsync = async () => {
        try {
            const URL = "https://localhost:7147/api/courses";
            const response = await fetch(URL);

            if (!response.ok) {
                throw new Error("Couldn't fetch the data");
            }

            const data: ICourse[] = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        }
    };

    // Find a course by its CourseId
    const findCourseById = (courseId: number): ICourse | null => {
        const course = Courses.find((course) => course.CourseId === courseId);
        return course || null; // Return null if no course is found
    };

    // Handle adding a new course
    const handleAddCourseClick = (): void => {
        const newCourse: ICourse = {
            CourseId: 0, // We'll assign an ID later
            CourseName: "",
            Description: "",
            StartDate: new Date(),
            EndDate: new Date(),
            modules: [] // Empty array initially
        };
        setCurrentCourse(newCourse);
        setShowEditModal(true);
    };

    // Handles when the edit icon is clicked
    const handleEditClick = (): void => {
        setShowEditModal(true); // Show the modal for editing
        
    };

    // Close the modal
    const handleCloseModal = (): void => {
        setShowEditModal(false);
    };

    // Handle saving a course (add or edit)
    const handleSaveCourse = (updatedCourse: ICourse): void => {
        if (updatedCourse.CourseId === 0) {
            // This is a new course, generate a new CourseId and add to Courses
            const newCourseId = Courses.length > 0 ? Courses[Courses.length - 1].CourseId + 1 : 1;
            updatedCourse.CourseId = newCourseId;
            setCourses([...Courses, updatedCourse]); // Add the new course to the list
        } else {
            // This is an edit, update the existing course
            setCourses(Courses.map((course) => (course.CourseId === updatedCourse.CourseId ? updatedCourse : course)));
        }
        setShowEditModal(false); // Close the modal
    };

    // Calculate weeks and status for the course
    const calculateWeekStatus = (course: ICourse) => {
        const startDate = new Date(course.StartDate);
        const endDate = new Date(course.EndDate);
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
            startDate: formatDate(startDate),
            endDate: formatDate(endDate)
        };
    };

    // Format date with dashes (YYYY-MM-DD)
    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]; // This will give you 'YYYY-MM-DD'
    };

      // Handle showing the document modal
  const handleShowModal = (content: string) => {
    setModalState({ show: true, content });
  };

    // Provide values and functions via the context
    const values: ICognitaContext = {
        Courses,
        showEditModal,
        setShowEditModal,
        currentCourse,
        setCurrentCourse,
        modalState,
        setModalState,

        fetchCoursesAsync,
        handleAddCourseClick,
        handleEditClick,
        handleCloseModal,
        handleSaveCourse,
        calculateWeekStatus,
        findCourseById,
        handleShowModal,
        
    };

    return (
        <CognitaContext.Provider value={values}>
            {children}
        </CognitaContext.Provider>
    );
}