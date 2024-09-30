// EditActivityForm.tsx
import React, { useState } from 'react';
import { IActivity } from '../../Data/Interface';

interface EditActivityFormProps {
  activity: IActivity;
  onSave: (activity: IActivity) => void;
}

export function EditActivityForm({ activity, onSave }: EditActivityFormProps) {
  const [name, setName] = useState(activity.ActivityName);
  const [type, setType] = useState(activity.Type.title); // Assuming Type has a title property
  const [description, setDescription] = useState(activity.Description);
  const [startTime, setStartTime] = useState(activity.StartDate.toISOString().substring(0, 16));
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedActivity: IActivity = {
      ...activity,
      ActivityName: name,
      Type: { ...activity.Type, title: type }, // If Type is an object
      Description: description,
      StartDate: new Date(startTime),
      
    };

    onSave(updatedActivity); // Pass the updated activity to parent
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

      <label>Type</label>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)} // Here you may also want to convert this to a dropdown
        required
      />

      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Start Time</label>
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />

    
      <button type="submit">Save Changes</button>
    </form>
  );
}