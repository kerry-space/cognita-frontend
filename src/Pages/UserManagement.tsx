import './UserManagement.css';
import { Spinner, UserManagementUI } from '../Components';
import { useFetchWithToken } from '../Hooks';
import { IUser, BASE_URL } from '../utils';
import { useEffect, useState } from 'react';

export function UserManagement() {
  const [users, setUsers] = useState<IUser[]>([]);

  const { requestFunc, isLoading } = useFetchWithToken<IUser[]>(
    `${BASE_URL}/users`
  );

  useEffect(() => {
    requestFunc().then(data => {
      if (data) {
        setUsers(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editClick = (user: IUser) => console.log(user);

  const deleteCLick = (id: number) => console.log(id);

  const addClick = () => {};

  return (
    <section
      className={
        'vh-100 d-flex justify-content-center align-items-center user-mgmt-page'
      }>
      {isLoading ? (
        <Spinner />
      ) : (
        <UserManagementUI
          data={users}
          header='User management'
          editClick={editClick}
          deleteClick={deleteCLick}
          addClick={addClick}
        />
      )}
    </section>
  );
}
