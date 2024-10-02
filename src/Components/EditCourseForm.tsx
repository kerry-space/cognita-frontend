import React from 'react';
import { Form } from 'react-bootstrap';
import { ICourse } from '../Data/Interface';
import { useCognitaFunc } from '../Hooks';

interface IEditCourseFormProps {
  course: ICourse | null;
}

export function EditCourseForm({ course }: IEditCourseFormProps) {
  const { calculateWeekStatus,handleInputChange } = useCognitaFunc();
  if (!course) { return <div>Loading course data...</div>;}

  const {startDate,endDate} = calculateWeekStatus(course);

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
          value={startDate}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="EndDate"
          value={endDate}
          onChange={handleInputChange}
        />
      </Form.Group>
    </Form>
  );
}