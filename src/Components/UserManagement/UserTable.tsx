import React from 'react';
import { IUser } from '../../utils';

interface IUserTableProps {
  editClick: (user: IUser) => void;
  deleteClick: (userId: number) => void;
  data: IUser[];
}

export function UserTable({ editClick, deleteClick, data }: IUserTableProps) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th scope='col'>Role</th>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Course</th>
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.email}>
            <td>{user.role}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.course}</td>
            <td>
              <button onClick={() => editClick(user)}>Edit</button>
              <button onClick={() => deleteClick(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
