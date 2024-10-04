import React, { useEffect, useState } from 'react';
import { ICourse, ICourseWithModule } from '../../Data/Interface';

import "./Participants.css"
import Button from 'react-bootstrap/esm/Button';
import { Person } from 'react-bootstrap-icons';
import { useFetchWithToken } from '../../Hooks/useFetchWithToken';
import { BASE_URL } from '../../utils/constants';
import { IUser } from '../../utils/interfaces';
import GenericModal from '../GenericModal';

interface ParticipantsProps {
  course: ICourseWithModule;
}

export function Participants({ course }: ParticipantsProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersLimited, setUsersLimited] = useState<IUser[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { requestFunc: fetchUsers, isLoading } = useFetchWithToken<IUser[]>(
    `${BASE_URL}/courses/${course.courseId}/users`
  );

  const showParticipants = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetchUsers().then(data => {
      if (data) {
        data.sort((u1, u2) => (u1.name.toLowerCase().split(' ')[0] < u2.name.toLowerCase().split(' ')[0]) ? 1 : -1);
        data.sort((u) => u.role);
        setUsers(data);
        setUsersLimited(data.slice(0, 6));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("users")
  console.log(users)

  return (
    <div className="card participants">
      <h3>Participants</h3>
      <div className='course-participants-list'>
        {usersLimited.map((u) => (
          <>
            {u.role === 0 && (
              <p>{u.name} (Teacher)</p>
            )}
            {u.role === 1 && (
              <p>{u.name}</p>
            )}
          </>
        ))}
      </div>
      <Button variant="primary" onClick={showParticipants}>
        <Person/> View all course participants ({users.length})
      </Button>
      <GenericModal
        title="Course participants"
        show={showModal}
        handleSave={() => {}}
        handleClose={() => setShowModal(false)}
        //btnFormId={formId}
        //</div>btnType='submit'
        >
        <div className='course-participants-modal'>{users.map((u) => (
          <div>
            {u.role === 0 && (
              <div className='course-participants-modal-entry'>
                <p>{u.name}</p>
                {u.role === 0 && (
                  <span className='course-participants-modal-second-row'><p>Teacher</p><p>{u.email}</p></span>
              )}</div>
            )}
            {u.role === 1 && (
              <div className='course-participants-modal-entry'>
                <p>{u.name}</p>
                {u.role === 1 && (
                  <span className='course-participants-modal-second-row'><p>Student</p><p>{u.email}</p></span>
              )}</div>
            )}
          </div>
        ))}</div>
      </GenericModal>
    </div>
  );
}