import React from 'react';
import './css/SearchInput.css';

interface ISearchInput {
  onSearchChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput({ onSearchChange }: ISearchInput) {
  return (
    <input
      className='search-input'
      placeholder='Search users...'
      type='text'
      onChange={onSearchChange}
    />
  );
}
