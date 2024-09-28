import React from 'react';
import './css/UsermanagementUI.css';
import { users } from './DummyData';
import { UserTable } from '.';

export function UserManagementUI() {
  return (
    <div className='container'>
      <h2 className='header'>User Management</h2>
      <UserTable data={users} editClick={() => {}} deleteClick={() => {}} />
    </div>
  );
}
