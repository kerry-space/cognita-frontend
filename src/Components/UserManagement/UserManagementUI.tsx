import React from 'react';
import './css/UsermanagementUI.css';
import { users } from './DummyData';
import { UserTable, SearchInput } from '.';

export function UserManagementUI() {
  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {};

  return (
    <div className='container'>
      <h2 className='header mb-5'>User Management</h2>
      <div className='d-flex w-100 justify-content-between mb-4 align-items-end'>
        <SearchInput onSearchChange={onSearchChange} />
        <button className='add-user-btn'>Add user</button>
      </div>
      <UserTable data={users} editClick={() => {}} deleteClick={() => {}} />
    </div>
  );
}
