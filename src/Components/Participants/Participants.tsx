import React, { useEffect, useState } from 'react';
import { ICourseWithModule } from '../../Data/Interface';

import "./Participants.css"
import Button from 'react-bootstrap/esm/Button';
import { Person } from 'react-bootstrap-icons';
import { useFetchWithToken } from '../../Hooks/useFetchWithToken';
import { BASE_URL } from '../../utils/constants';
import { IUser } from '../../utils/interfaces';
import Modal from 'react-bootstrap/esm/Modal';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Hooks/useAuthContext';

interface ParticipantsProps {
  course: ICourseWithModule;
}

export function Participants({ course }: ParticipantsProps) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [usersLimited, setUsersLimited] = useState<IUser[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { tokens } = useAuthContext();

  const courseId: number = course.courseId;

  const { requestFunc: fetchUsers } = useFetchWithToken<IUser[]>(
    `${BASE_URL}/courses/${courseId}/users`
  );

  const navigate = useNavigate();

  const showParticipants: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowModal(true);
  };

  const hideParticipants: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowModal(false);
  };

  const manageUsers: React.MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/user-management/' + courseId);
  };

  useEffect(() => {
    fetchUsers().then(data => {
      if (data) {
        data.sort((u1, u2) => (u1.name.toLowerCase().split(' ')[0] > u2.name.toLowerCase().split(' ')[0] &&
          u1.role >= u2.role) ? 1 : -1);
        setUsers(data);
        setUsersLimited(data.slice(0, 6));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let haveBackground: boolean = false;
  const divBackgroundClass: string = "course-participants-modal-entry course-participants-modal-background-span"
  const divBlankClass: string = "course-participants-modal-entry"

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
      <Modal
        className='course-participants-modal'
        title="Course participants"
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}>
        <Modal.Dialog
          style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <Modal.Header closeButton>
            <Modal.Title>Course participants</Modal.Title>
          </Modal.Header>
          <Modal.Body className='course-participants-modal-body'>
          {tokens?.role === "Admin" && (
            <Button variant="primary" className='course-participants-modal-button' onClick={manageUsers}>
              Manage participants
            </Button>
            )}
          <div className='course-participants-modal'>{users.map((u) => (
            <div>
              {u.role === 0 && (
                <div className={haveBackground ? divBackgroundClass : divBlankClass}>
                  {haveBackground = !haveBackground}
                  <p>{u.name}</p>
                  {u.role === 0 && (
                    <span className='course-participants-modal-second-row'><p>Teacher</p><p>{u.email}</p></span>
                )}</div>
              )}
              {u.role === 1 && (
                <div className={haveBackground ? divBackgroundClass : divBlankClass}>
                  {haveBackground = !haveBackground}
                  <p>{u.name}</p>
                  {u.role === 1 && (
                    <span className='course-participants-modal-second-row'><p>Student</p><p>{u.email}</p></span>
                )}</div>
              )}
            </div>
          ))}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideParticipants}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
    </div>
  );
}