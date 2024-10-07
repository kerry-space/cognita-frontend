import React from 'react';
import { Form } from 'react-bootstrap';
import { ICourse } from '../Data/Interface';
import { useCognitaFunc } from '../Hooks';

interface IEditCourseFormProps {
  course: ICourse | null;
}

export function EditCourseForm({ course }: IEditCourseFormProps) {
  const { handleInputChange } = useCognitaFunc();

  if (!course) {
    return <div>Loading course data...</div>;
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          type="text"
          name="courseName" 
          value={course.courseName || ''}
          onChange={handleInputChange}  
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={course.startDate ? course.startDate.toString().substring(0, 10) : ''}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={course.endDate ? course.endDate.toString().substring(0, 10) : ''}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
}