import React, { useState } from 'react';
import { ICourse, IModule, IActivity } from '../../Data/Interface';
import GenericModal from '../GenericModal';
import { EditModuleForm } from './Forms/AddModuleForm';
import { AddActivityForm } from './Forms/AddActivityForm';
import Edi
import { EditActivityForm } from './Forms/EditActivityForm';

function Module({ course }) {
  const { setShowEditModal, showEditModal, handleEditClick } = useCognitaFunc();
  const [currentModule, setCurrentModule] = useState(null);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [modalContent, setModalContent] = useState('');

  const showModal = (content, module = null, activity = null) => {
    setModalContent(content);
    setCurrentModule(module);
    setCurrentActivity(activity);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="module-header">
        <h2>{course.CourseName}</h2>
        <button onClick={() => showModal('addModule')}>Add Module</button>
      </div>
      {course.modules?.map((mod) => (
        <div key={mod.ModuleId} className="module-container">
          <div className="module-details">
            <h4>{mod.ModuleName}</h4>
            <button onClick={() => showModal('editModule', mod)}>Edit Module</button>
            <button onClick={() => showModal('addActivity', mod)}>Add Activity</button>
            {mod.activities?.map(act => (
              <div key={act.ActivityId} className="activity-details">
                <p>{act.Name}</p>
                <button onClick={() => showModal('editActivity', mod, act)}>Edit Activity</button>
                <button onClick={() => console.log('Upload')}>Upload Documents</button>
                <button onClick={() => console.log('View')}>View Documents</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <GenericModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        title={modalContent.includes('Module') ? 'Edit Module' : modalContent.includes('Activity') ? 'Edit Activity' : 'Add Activity'}
        handleSave={() => console.log('Saving data')}
      >
        {modalContent === 'editModule' && <EditModuleForm module={currentModule} />}
        {modalContent === 'addActivity' && <AddActivityForm onSave={handleActivitySave} />}
        {modalContent.startsWith('editActivity') && <EditActivityForm activity={currentActivity} />}
      </GenericModal>
    </>
  );
}

function handleActivitySave(activity) {
  console.log('Activity saved', activity);
}

export default Module;