// EditModuleForm.js
import React, { useState } from 'react';
import { IModule } from '../../../Data/Interface';

interface EditModuleFormProps {
  module: IModule;
  onSave: (module: IModule) => void;
}

export function EditModuleForm({ module, onSave }: EditModuleFormProps) {
  const [moduleName, setModuleName] = useState(module.ModuleName);
  const [moduleDescription, setModuleDescription] = useState(module.Description);
  const [startDate, setStartDate] = useState(module.StartDate.toISOString().substring(0, 10));
  const [endDate, setEndDate] = useState(module.EndDate.toISOString().substring(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...module, ModuleName: moduleName, Description: moduleDescription, StartDate: new Date(startDate), EndDate: new Date(endDate) });
  };

  return (
    <form onSubmit={handleSubmit} className="module-form">
      <label>Name</label>
      <input type="text" value={moduleName} onChange={(e) => setModuleName(e.target.value)} required />
      <label>Description</label>
      <textarea value={moduleDescription} onChange={(e) => setModuleDescription(e.target.value)} required />
      <label>Start Date</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <label>End Date</label>
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Save Changes</button>
    </form>
  );
}