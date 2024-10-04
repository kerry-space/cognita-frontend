import React from 'react';
import './css/UsermanagementUI.css';
import { UserTable, SearchInput } from '.';
import _ from 'lodash';
import { IUser } from '../../utils';

interface IUserManagementUIProps {
  header: string;
  data: IUser[];
  editClick: (user: IUser) => void;
  addClick: () => void;
}

export function UserManagementUI({
  header,
  data,
  editClick,
  addClick,
}: IUserManagementUIProps) {
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>(data);

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    setFilteredUsers(
      data.filter(
        u =>
          u.name.toLocaleLowerCase().includes(e.target.value.toLowerCase()) ||
          u.email.toLocaleLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const debouncedSearch = _.debounce(onSearchChange, 400);

  return (
    <div className='container'>
      <h2 className='header mb-5'>{header}</h2>
      <div className='d-flex w-100 justify-content-between mb-4 align-items-end'>
        <SearchInput onSearchChange={debouncedSearch} />
        <button onClick={addClick} className='add-user-btn'>
          Add user
        </button>
      </div>

      <UserTable data={filteredUsers} editClick={editClick} />
    </div>
  );
}
