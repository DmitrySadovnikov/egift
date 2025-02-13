'use client'

import React, { FC, useEffect, useState } from 'react'
import { StoresType } from './types';
import { getStores } from './utils';
import Store from '@/app/components/Store';

const Dashboard: FC = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const [stores, setStores] = useState<StoresType>({});
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    const loadStores = async () => {
      const newStores = await getStores({
        product: 'bupa_life_rewards',
        limit: 10,
        offset,
        matchName: debouncedQuery,
        sortBy: 'name'
      });

      if (Object.keys(newStores).length === 0) {
        setStopScroll(true);
        return;
      }
      setStores(prevStores => ({ ...prevStores, ...newStores }));
    };

    loadStores();
  }, [offset, stopScroll, debouncedQuery]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY + 10 >= document.body.offsetHeight) {
        setOffset(prevOffset => prevOffset + 10);
      }
    };

    if (!stopScroll) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stopScroll]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setOffset(0);
    setStores({});
    setStopScroll(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Gift Cards
        </h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search gift cards..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-150 ease-in-out"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(stores).map(([storeKey, products]) => (
            <Store key={storeKey} storeKey={storeKey} products={products} />
          ))}
        </div>
        {!stopScroll && (
          <div className="text-center mt-8">
            <button
              onClick={() => setOffset(prevOffset => prevOffset + 10)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

Dashboard.displayName = 'Dashboard'

export default Dashboard
