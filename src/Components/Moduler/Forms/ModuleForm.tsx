import React from 'react';
import { Form } from 'react-bootstrap';
import { IModule } from '../../../Data/Interface';
import { useCognitaFunc } from '../../../Hooks';

export function ModuleForm({ module }: { module: IModule | IModule | null}): React.ReactElement {
  const { handleModuleChange } = useCognitaFunc();

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Module Name</Form.Label>
        <Form.Control
          type="text"
          name="moduleName"
          value={module!.moduleName || ""} // Handle possible undefined values
          onChange={handleModuleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={module!.description || ""}
          onChange={handleModuleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={module!.startDate ? module!.startDate.toString().substring(0, 10) : ""}
          onChange={handleModuleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={module!.endDate ? module!.endDate.toString().substring(0, 10) : ""}
          onChange={handleModuleChange}
        />
      </Form.Group>
    </Form>
  );
}

