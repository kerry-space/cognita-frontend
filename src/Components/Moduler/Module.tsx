import React, { useState } from 'react';
import { ICourse, IModule } from '../../Data/Interface';
import GenericModal from '../GenericModal';
import { useCognitaFunc } from '../../Hooks/useCognitaFunc';
import { EditModuleForm, AddActivityForm, EditActivityForm } from './Forms'; // Ensure these are correctly imported

interface ModuleProps{
  course: ICourse
}

function Module({ course }: ModuleProps) {
  const { setShowEditModal, showEditModal, handleEditClick } = useCognitaFunc();
  const [currentModule, setCurrentModule] = useState(null);
  const [modalContent, setModalContent] = useState('');

  const showModal = (content, module = null) => {
    setModalContent(content);
    setCurrentModule(module);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="module-header">
        <h2>Module: {course.CourseName}</h2>
        <button onClick={() => showModal('addModule')}>Add Module</button>
      </div>
      {course.modules?.map((mod) => (
        <div key={mod.ModuleId} className="module-container">
          <h4>{mod.ModuleName}</h4>
          <div>
            <button onClick={() => showModal('editModule', mod)}>Edit Module</button>
            <button onClick={() => showModal('addActivity', mod)}>Add Activity</button>
          </div>
        </div>
      ))}

      <GenericModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        title={getTitle(modalContent)}
        handleSave={() => console.log('Saving data')}
      >
        {modalContent === 'editModule' && <EditModuleForm module={currentModule} />}
        {modalContent === 'addActivity' && <AddActivityForm onSave={handleActivitySave} />}
        {modalContent.startsWith('editActivity') && <EditActivityForm activity={currentActivity} />}
      </GenericModal>
    </>
  );
}

// Additional helper functions
function getTitle(modalContent) {
  switch(modalContent) {
    case 'editModule': return "Edit Module";
    case 'addActivity': return "Add Activity";
    case 'editActivity': return "Edit Activity";
    default: return "";
  }
}

function handleActivitySave(activity) {
  console.log('Activity saved', activity);
}

export default Module;