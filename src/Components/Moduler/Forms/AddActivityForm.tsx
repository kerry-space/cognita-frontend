// AddActivityForm.js
import React, { useState } from 'react';
import { IActivity } from '../../../Data/Interface';

interface AddActivityFormProps {
  onSave: (activity: IActivity) => void;
}

export function AddActivityForm({ onSave }: AddActivityFormProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ActivityId: Date.now(), // Placeholder for unique ID generation
      Name: name,
      Type: type,
      Description: description,
      StartTime: new Date(startTime),
      EndTime: new Date(endTime),
      ModuleId: 1 // This should be dynamically set based on context
    });
  };

  return (
    <form onSubmit={handleSubmit} className="activity-form">
      <label>Name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Type</label>
      <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
      <label>Description</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <label>Start Time</label>
      <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      <label>End Time</label>
      <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      <button type="submit">Add Activity</button>
    </form>
  );
}