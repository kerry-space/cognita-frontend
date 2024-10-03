import React, { useState } from 'react';
import { IModule } from '../../../Data/Interface';

interface EditModuleFormProps {
  module: IModule;
}

export function EditModuleForm({ module }: EditModuleFormProps) {
  const [moduleName, setModuleName] = useState(module.ModuleName);
  const [moduleDescription, setModuleDescription] = useState(module.Description);
  const [startDate, setStartDate] = useState(module.StartDate);
  const [endDate, setEndDate] = useState(module.EndDate);

  const handleSave = () => {
    // Implement save logic
  };

  return (
    <form onSubmit={handleSave} className="edit-module-form">
      <div>
        <label>Name</label>
        <input type="text" value={moduleName} onChange={e => setModuleName(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <input type="text" value={moduleDescription} onChange={e => setModuleDescription(e.target.value)} />
      </div>
      <div>
        <label>Start Date</label>
        <input type="date" value={startDate.toISOString().split('T')[0]} onChange={e => setStartDate(new Date(e.target.value))} />
      </div>
      <div>
        <label>End Date</label>
        <input type="date" value={endDate.toISOString().split('T')[0]} onChange={e => setEndDate(new Date(e.target.value))} />
      </div>
      
    </form>
  );
}