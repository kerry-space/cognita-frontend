import React from 'react';
import './css/UsermanagementUI.css';
import { UserTable, SearchInput } from '.';
import _ from 'lodash';
import { BASE_URL, IUser } from '../../utils';
import { useFetchWithToken } from '../../Hooks';

export function UserManagementUI() {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>([]);
  const { requestFunc, isLoading } = useFetchWithToken<IUser[]>(
    `${BASE_URL}/users`
  );
  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setFilteredUsers(
      users.filter(
        u =>
          u.name.toLocaleLowerCase().includes(e.target.value.toLowerCase()) ||
          u.email.toLocaleLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const debouncedSearch = _.debounce(onSearchChange, 400);

  React.useEffect(() => {
    requestFunc().then(data => {
      if (data) {
        setUsers(data);
        setFilteredUsers(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <h2 className='header mb-5'>User Management</h2>
      <div className='d-flex w-100 justify-content-between mb-4 align-items-end'>
        <SearchInput onSearchChange={debouncedSearch} />
        <button className='add-user-btn'>Add user</button>
      </div>

      <UserTable
        data={filteredUsers}
        editClick={() => {}}
        deleteClick={() => {}}
        isLoading={isLoading}
      />
    </div>
  );
}
