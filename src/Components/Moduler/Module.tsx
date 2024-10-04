import React, { useEffect, useState } from 'react';
import { ICourse, IModule, IActivity, ICourseWithModule } from '../../Data/Interface';
import GenericModal from '../GenericModal';
import { EditModuleForm } from './Forms/AddModuleForm';
import { AddActivityForm } from './Forms/AddActivityForm';
import { EditActivityForm } from './Forms/EditActivityForm';
import { useCognitaFunc } from '../../Hooks';

import { Container, Button, Card, Accordion } from 'react-bootstrap';
import { ChevronDown, ChevronUp, Plus, PencilSquare, CloudUpload, FileEarmarkText } from 'react-bootstrap-icons';

import "./Module.css";

interface ModuleProps {
  course: ICourseWithModule;
}

export function Module({ course }: ModuleProps) {
  const [activeActivityId, setActiveActivityId] = useState<number | null>(null);

  const {
    modalContent,
    openModuleState,
  } = useCognitaFunc();

   
  
    const toggleActivity = (activityId:number) => {
      setActiveActivityId(activeActivityId === activityId ? null : activityId);
    };

    const formatDate = (date: string | Date) => {
      if (date instanceof Date) {
        return date.toISOString().substring(0, 10);  // Format to "YYYY-MM-DD"
      }
      return date;
    };


    return (
      <Container className="mt-4">
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => openModuleState('addModule', null)}>
            <Plus /> Add Module
          </Button>
        </div>
  
        {course.modules.map((mod: IModule) => (
          <Card key={mod.moduleId} className="module-container mt-4">
            <Card.Header as="h2">{mod.moduleName}</Card.Header>
            <Card.Body>
              <Card.Text>{mod.description}</Card.Text>
              <Card.Text>
                Start Date: {formatDate(mod.startDate)} <br />
                End Date: {formatDate(mod.endDate)}
              </Card.Text>
              <Button variant="outline-secondary" onClick={() => openModuleState('editModule', mod)} className="mr-2">
                <PencilSquare /> Edit Module
              </Button>
              <Button variant="outline-secondary" className="mr-2">
                <CloudUpload /> Upload Documents
              </Button>
              <Button variant="outline-secondary">
                <FileEarmarkText /> View Documents
              </Button>
              <Accordion defaultActiveKey="0" className="mt-3">
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    Activities {activeActivityId === mod.moduleId ? <ChevronUp /> : <ChevronDown />}
                  </Accordion.Header>
                  <Accordion.Body>
                    {mod.activities?.map((act: IActivity) => (
                      <Card key={act.activityId} className={`activity-details ${activeActivityId === act.activityId ? 'active' : ''}`}>
                        <Card.Header onClick={() => toggleActivity(act.activityId)} className="cursor-pointer">
                          {act.activityName}
                        </Card.Header>
                        {activeActivityId === act.activityId && (
                          <Card.Body>
                            <Card.Text>Type: {act.activityName}</Card.Text>
                            <Card.Text>{act.description}</Card.Text>
                            <Card.Text>
                              Start Time: {formatDate(act.startDate)} <br />
                              End Time: {formatDate(act.startDate)}
                            </Card.Text>
                            <Button variant="outline-secondary" className="mr-2">
                              <PencilSquare /> Edit Activity
                            </Button>
                            <Button variant="outline-secondary" className="mr-2">
                              <CloudUpload /> Upload Documents
                            </Button>
                            <Button variant="outline-secondary">
                              <FileEarmarkText /> View Documents
                            </Button>
                          </Card.Body>
                        )}
                      </Card>
                    ))}
                    <Button variant="outline-secondary" onClick={() => openModuleState('addActivity', mod)} className="mt-3">
                      <Plus /> Add Activity
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        ))}
      </Container>
    );
}