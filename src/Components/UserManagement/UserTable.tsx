import React from 'react';
import { IUser } from '../../utils';
import './css/UserTable.css';
interface IUserTableProps {
  editClick: (user: IUser) => void;
  deleteClick: (userId: number) => void;
  data: IUser[];
}

export function UserTable({ editClick, deleteClick, data }: IUserTableProps) {
  return (
    <table className='table user-table'>
      <thead>
        <tr>
          <th className='table-cell column-header' scope='col'>
            Role
          </th>
          <th className='table-cell column-header' scope='col'>
            Name
          </th>
          <th className='table-cell column-header' scope='col'>
            Email
          </th>
          <th className='table-cell column-header' scope='col'>
            Course
          </th>
          <th className='table-cell column-header' scope='col'>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(user => (
          <tr key={user.id}>
            <td className='table-cell role-cell'>{user.role}</td>
            <td className='table-cell'>{user.name}</td>
            <td className='table-cell'>{user.email}</td>
            <td className='table-cell'>{user.course}</td>
            <td className='table-cell btn-container'>
              <button className='edit-btn' onClick={() => editClick(user)}>
                Edit
              </button>
              <button
                className='delete-btn'
                onClick={() => deleteClick(user.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
