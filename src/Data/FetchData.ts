import React, {useEffect, useState} from "react";
import { ICourse } from "./Interface";


const CognitaData: ICourse[] = [
    {
      CourseId: 1,
      CourseName: 'TypeScript Mastery',
      Description: 'A comprehensive course on TypeScript from basics to advanced topics.',
      StartDate: new Date('2023-10-01'),
      EndDate: new Date('2023-10-10'),
      modules: [
        {
          ModuleId: 1,
          CourseId: '1',
          ModuleName: 'Introduction to TypeScript',
          Description: 'Basics of TypeScript, types, interfaces, and functions.',
          StartDate: new Date('2023-10-01'),
          EndDate: new Date('2023-10-05'),
          Activities: [
            {
              ActivityeId: 1,
              Description: 'Introduction to TypeScript concepts',
              Type: { id: 1, title: 'Lecture' },
              ActivityName: 'TypeScript Basics',
              StartDate: new Date('2023-10-01T09:00:00'),
              ModuleId: 1,
            },
            {
              ActivityeId: 2,
              Description: 'TypeScript exercises and examples',
              Type: { id: 2, title: 'Lab' },
              ActivityName: 'TypeScript Hands-On',
              StartDate: new Date('2023-10-03T10:00:00'),
              ModuleId: 1,
            },
          ],
        },
        {
          ModuleId: 2,
          CourseId: '1',
          ModuleName: 'Advanced TypeScript',
          Description: 'Generics, decorators, and advanced types in TypeScript.',
          StartDate: new Date('2023-10-06'),
          EndDate: new Date('2023-10-10'),
          Activities: [
            {
              ActivityeId: 3,
              Description: 'Building a TypeScript project',
              Type: { id: 3, title: 'Assignment' },
              ActivityName: 'Final Project',
              StartDate: new Date('2023-10-07T12:00:00'),
              ModuleId: 2,
            },
          ],
        },
      ],
    },
    {
      CourseId: 2,
      CourseName: 'React with TypeScript',
      Description: 'Learn how to use React with TypeScript for building modern web applications.',
      StartDate: new Date('2023-11-01'),
      EndDate: new Date('2023-11-15'),
      modules: [
        {
          ModuleId: 3,
          CourseId: '2',
          ModuleName: 'React Basics',
          Description: 'Introduction to React with TypeScript, components, and hooks.',
          StartDate: new Date('2023-11-01'),
          EndDate: new Date('2023-11-07'),
          Activities: [
            {
              ActivityeId: 4,
              Description: 'Overview of React and TypeScript',
              Type: { id: 1, title: 'Lecture' },
              ActivityName: 'React Basics',
              StartDate: new Date('2023-11-01T09:00:00'),
              ModuleId: 3,
            },
            {
              ActivityeId: 5,
              Description: 'Hands-on React with TypeScript',
              Type: { id: 2, title: 'Lab' },
              ActivityName: 'React Labs',
              StartDate: new Date('2023-11-03T10:00:00'),
              ModuleId: 3,
            },
          ],
        },
        {
          ModuleId: 4,
          CourseId: '2',
          ModuleName: 'React Advanced Concepts',
          Description: 'Advanced patterns, hooks, and TypeScript with React.',
          StartDate: new Date('2023-11-08'),
          EndDate: new Date('2023-11-15'),
          Activities: [
            {
              ActivityeId: 6,
              Description: 'Advanced React hooks and patterns',
              Type: { id: 1, title: 'Lecture' },
              ActivityName: 'Advanced React Patterns',
              StartDate: new Date('2023-11-08T10:00:00'),
              ModuleId: 4,
            },
          ],
        },
      ],
    },
  ];
  
  export default CognitaData;



