import { useState } from 'react';
import { IUser } from '../../utils';
import _ from 'lodash';
import './css/UserTable.css';

const usersPerPage = 8;

interface IUserTableProps {
  editClick: (user: IUser) => void;
  deleteClick: (userId: number) => void;
  data: IUser[];
}

export function UserTable({ editClick, deleteClick, data }: IUserTableProps) {
  const paginatedData = _.chunk(data, usersPerPage)
    //Fill last page with empty data to make table always have the same height
    .map((page, idx, arr) => {
      if (idx === arr.length - 1 && page.length < 8) {
        return page.concat(
          new Array(usersPerPage - page.length).fill({
            id: '',
            role: '',
            name: '',
            email: '',
            course: '',
          })
        );
      }
      return page;
    });

  const [activePage, setActivePage] = useState(0);

  const paginate = (arg: number) =>
    setActivePage(prev =>
      Math.min(paginatedData.length - 1, Math.max(0, prev + arg))
    );

  return (
    <>
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
          {paginatedData[activePage].map((user, idx) => (
            <tr key={idx}>
              <td className='table-cell role-cell'>{user.role}</td>
              <td className='table-cell'>{user.name}</td>
              <td className='table-cell'>{user.email}</td>
              <td className='table-cell'>{user.course}</td>
              <td className='table-cell btn-container'>
                {user.id ? (
                  <>
                    <button
                      className='edit-btn'
                      onClick={() => editClick(user)}>
                      Edit
                    </button>
                    <button
                      className='delete-btn'
                      onClick={() => deleteClick(user.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <div className='empty-filler' />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='d-flex w-100 justify-content-center align-items-center'>
        <button onClick={() => paginate(-1)}>{'<'}</button>
        <p className='mb-0'>{`${activePage + 1} (${paginatedData.length})`}</p>
        <button onClick={() => paginate(1)}>{'>'}</button>
      </div>
    </>
  );
}
