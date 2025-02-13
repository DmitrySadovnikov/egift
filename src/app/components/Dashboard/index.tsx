'use client'

import React, { FC, useEffect, useState } from 'react'
import { StoresType } from '../Store/types';
import { getStores } from '../Store/utils';
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
    <>
      <div>
        Stores
      </div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {Object.entries(stores).map(([storeKey, products]) => (
        <Store key={storeKey} storeKey={storeKey} products={products} />
      ))}
    </>
  )
}

export default Dashboard;