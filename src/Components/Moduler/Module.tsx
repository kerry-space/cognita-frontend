import React, { useEffect, useState } from "react";
import { ICourseWithModule, IModule, IActivity } from "../../Data/Interface";
import GenericModal from "../GenericModal";
import { useCognitaFunc } from "../../Hooks";
import { Container, Button, Card, Accordion } from "react-bootstrap";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  PencilSquare,
  CloudUpload,
  FileEarmarkText,
} from "react-bootstrap-icons";

import { ModuleForm } from "./Forms/ModuleForm";
import { ActivityForm } from "./Forms/ActivityForm";

import "./Module.css";

interface ModuleProps {
  course: ICourseWithModule;
  onSave: () => void; // Add the onSave prop to handle refresh after saving
} 

export function Module({ course, onSave }: ModuleProps) {
  const [activeActivityId, setActiveActivityId] = useState<number | null>(null);

  const {
    modalState,
    openModuleState,
    openActivityState,
    closeModal,
    handleSaveModule,
    handleSaveActivity,
    currentModule,
    currentActivity
  } = useCognitaFunc();

  const toggleActivity = (activityId: number) => {
    setActiveActivityId(activeActivityId === activityId ? null : activityId);
  };

  const formatDate = (date: string | Date): string => {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.valueOf())) {
      return dateObj.toISOString().substring(0, 10);
    }
    return date instanceof Date ? date.toISOString().substring(0, 10) : date;
  };

  const handleModuleSave = async () => {
    await handleSaveModule();
    onSave(); // Trigger the onSave function to refresh the course data
  };

  const handleActivitySave = async () => {
    await handleSaveActivity();
    onSave(); // Trigger the onSave function to refresh the course data
  };

  return (
    <Container>
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          onClick={() => openModuleState("addModule", null)}
        >
          <Plus /> Add Module
        </Button>
      </div>

      {course.modules.map((mod: IModule) => (
        <Card key={mod.moduleId} className="module-container mt-4">
          <Card.Header as="h2">Module: {mod.moduleName}</Card.Header>
          <Card.Body>
            <Card.Text>{mod.description}</Card.Text>
            <Card.Text>
              <i
                className="bi bi-calendar3"
                style={{ marginRight: "5px", color: "#2c1a4d" }}
              ></i>
              Start Date: {formatDate(mod.startDate)} <br />
              <i
                className="bi bi-calendar3"
                style={{ marginRight: "5px", color: "#2c1a4d" }}
              ></i>
              End Date: {formatDate(mod.endDate)}
            </Card.Text>
            <div className="module-btns-wrapper">
              <Button
                variant="outline-secondary"
                onClick={(e) =>{ 
                  e.preventDefault();
                  openModuleState("editModule", mod)
                }}
                className="mr-2"
              >
                <PencilSquare /> Edit Module
              </Button>
              <Button variant="outline-secondary" className="mr-2">
                <CloudUpload /> Upload Documents
              </Button>
              <Button variant="outline-secondary">
                <FileEarmarkText /> View Documents
              </Button>
            </div>
            <Accordion defaultActiveKey="0" className="mt-3">
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  Activities{" "}
                  {activeActivityId === mod.moduleId ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  <div className="actvity-btn-add">
                    <Button
                      variant="outline-secondary"
                      onClick={() =>
                        openActivityState("addActivity", mod, null)
                      }
                      className="mt-3"
                    >
                      <Plus /> Add Activity
                    </Button>
                  </div>
                  {mod.activities?.map((act: IActivity) => (
                    <Card
                      key={act.activityId}
                      className={`activity-details ${
                        activeActivityId === act.activityId ? "active" : ""
                      }`}
                    >
                      <Card.Header
                        onClick={() => toggleActivity(act.activityId)}
                        className="cursor-pointer"
                      >
                        {act.activityName}
                      </Card.Header>
                      {activeActivityId === act.activityId && (
                        <Card.Body>
                          <Card.Text>Type: {act.activityType.title}</Card.Text>
                          <Card.Text>{act.description}</Card.Text>
                          <Card.Text>
                            Start Time: {formatDate(act.startDate)} <br />
                            End Time: {formatDate(act.endDate)}
                          </Card.Text>
                          <div className="container activity-btn-wrapper">
                            <Button
                              variant="outline-secondary"
                              className="mr-2"
                              onClick={() =>
                                openActivityState("editActivity", mod, act)
                              }
                            >
                              <PencilSquare /> Edit Activity
                            </Button>
                            <Button
                              variant="outline-secondary"
                              className="mr-2"
                            >
                              <CloudUpload /> Upload Documents
                            </Button>
                            <Button variant="outline-secondary">
                              <FileEarmarkText /> View Documents
                            </Button>
                          </div>
                        </Card.Body>
                      )}
                    </Card>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      ))}

    {/* Modal for Module (Add or Edit) */}
    {modalState.show &&
      modalState.content &&
      (modalState.content === "editModule" ||
        modalState.content === "addModule") && (
        <GenericModal
          show={modalState.show}
          handleClose={closeModal}
          title={modalState.content!}
          handleSave={handleModuleSave} // Use handleModuleSave to trigger onSave
        >
          <ModuleForm module={currentModule} /> {/* Pass the currentModule here */}
        </GenericModal>
      )}

    {/* Modal for Activity (Add or Edit) */}
    {modalState.show &&
      modalState.content &&
      (modalState.content === "editActivity" ||
        modalState.content === "addActivity") && (
        <GenericModal
          show={modalState.show}
          handleClose={closeModal}
          title={modalState.content!}
          handleSave={handleActivitySave} // Use handleActivitySave to trigger onSave
        >
          <ActivityForm activity={currentActivity} /> {/* Pass the currentActivity here */}
        </GenericModal>
      )}
    </Container>
  );
}