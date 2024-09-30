import React from 'react';
import './css/UsermanagementUI.css';
import { users as dummyUsers } from './DummyData';
import { UserTable, SearchInput } from '.';
import _ from "lodash";
import { IUser } from '../../utils';

export function UserManagementUI() {
  const [users, setUsers] = React.useState<IUser[]>(dummyUsers);
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>(dummyUsers);

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setFilteredUsers(users.filter(u => u.name.toLocaleLowerCase().includes(e.target.value.toLowerCase()) || u.email.toLocaleLowerCase().includes(e.target.value.toLowerCase())))
  };

  const debouncedSearch = _.debounce(
    onSearchChange, 300
  )

  React.useEffect(() => {
    // Fetch users from backend and set them as the useState "users", then do the same for filteredUsers 
  }, []);

  return (
    <div className='container'>
      <h2 className='header mb-5'>User Management</h2>
      <div className='d-flex w-100 justify-content-between mb-4 align-items-end'>
        <SearchInput onSearchChange={debouncedSearch} />
        <button className='add-user-btn'>Add user</button>
      </div>
      <UserTable data={filteredUsers} editClick={() => {}} deleteClick={() => {}} />
    </div>
  );
}
