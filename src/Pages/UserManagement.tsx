import React from 'react';
import './UserManagement.css';
import { UserManagementUI } from '../Components/UserManagement';

export function UserManagement() {
  return (
    <section
      className={
        'vh-100 d-flex justify-content-center align-items-center user-mgmt-page'
      }>
      <UserManagementUI />
    </section>
  );
}
