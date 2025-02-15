'use client'

import React, { FC } from 'react'
import { SearchProps } from '@/app/components/Search/types';

const Search: FC<SearchProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search gift cards..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-150 ease-in-out"
      />
    </div>
  )
}

Search.displayName = 'Search'

export default Search
