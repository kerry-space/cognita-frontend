import React from 'react';
import { Form } from 'react-bootstrap';
import { ICourse } from '../Data/Interface';

interface IEditCourseFormProps {
  course: ICourse;
  onChange: (course: ICourse) => void;
}

// Updated ChangeEvent to work with react-bootstrap Form.Control
export function EditCourseForm({ course, onChange }: IEditCourseFormProps) {
  const handleInputChange = (event: React.ChangeEvent<any>): void => {
    const { name, value } = event.target;
    onChange({ ...course, [name]: value });
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Course Name</Form.Label>
        <Form.Control
          type="text"
          name="CourseName"
          value={course.CourseName}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="StartDate"
          value={course.StartDate.toString()}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="EndDate"
          value={course.EndDate.toString()}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
}