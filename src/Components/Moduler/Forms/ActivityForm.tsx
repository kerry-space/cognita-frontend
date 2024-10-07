import React from "react";
import { Form } from "react-bootstrap";
import { IActivity } from "../../../Data/Interface";
import { useCognitaFunc } from "../../../Hooks";

export function ActivityForm({ activity }: { activity: IActivity | null }): React.ReactElement {
  const { handleActivityChange,handleActivityTypeChange } = useCognitaFunc();

  if (!activity) {
    return <div>Loading...</div>; // Or some other fallback UI when activity is null
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Activity Name</Form.Label>
        <Form.Control
          type="text"
          name="activityName"
          value={activity.activityName || ""}
          onChange={handleActivityChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={activity.description || ""}
          onChange={handleActivityChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Activity Type</Form.Label>
        <Form.Select
          name="activityType"
          value={activity.activityType?.id || 1} 
          onChange={handleActivityTypeChange}
        >
          <option value="1">Lecture</option>
          <option value="2">Assignment</option>
          <option value="3">E-Learning</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={activity.startDate ? activity.startDate.toString().substring(0, 10) : ""}
          onChange={handleActivityChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={activity.endDate ? activity.endDate.toString().substring(0, 10) : ""}
          onChange={handleActivityChange}
        />
      </Form.Group>
    </Form>
  );
}