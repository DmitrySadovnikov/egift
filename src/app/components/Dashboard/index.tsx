'use client'

import React, { FC, useCallback, useEffect, useState } from 'react'
import { getGiftCards, setStoredFavoriteGiftCardKeys } from './utils';
import GiftCard from '@/app/components/GiftCard';
import { GiftCardsKeys, GiftCardsType } from '@/app/components/GiftCard/types';
import Search from '@/app/components/Search';
import { DashboardProps, ProductsType } from '@/app/components/Dashboard/types';

const Dashboard: FC<DashboardProps> = ({ initGiftCards, initGiftCardKeys }) => {
  const [giftCards, setGiftCards] = useState<GiftCardsType>(initGiftCards);
  const [favoriteGiftCardKeys, setFavoriteGiftCardKeys] = useState<string[]>(initGiftCardKeys);
  const [stopScroll, setStopScroll] = useState(false);
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    setGiftCards(initGiftCards);
    setFavoriteGiftCardKeys(initGiftCardKeys);
  }, [initGiftCards, initGiftCardKeys]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const loadGiftCards = useCallback(async () => {
    const newGiftCards = await getGiftCards({
      product: 'bupa_life_rewards',
      limit: 10,
      offset,
      matchName: debouncedQuery,
      sortBy: 'name'
    });

    if (Object.keys(newGiftCards).length === 0) {
      setStopScroll(true);
      return;
    }
    setGiftCards(prevGiftCards => ({ ...prevGiftCards, ...newGiftCards }));
  }, [debouncedQuery, offset]);

  useEffect(() => {
    loadGiftCards();
  }, [loadGiftCards]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY + 350 >= document.body.offsetHeight) {
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
    setGiftCards({});
    setStopScroll(false);
  };

  const toggleFavorite = (giftCardKey: string) => {
    const newFavoriteGiftCardKeys = favoriteGiftCardKeys.includes(giftCardKey)
      ? favoriteGiftCardKeys.filter(fav => fav !== giftCardKey)
      : [...favoriteGiftCardKeys, giftCardKey];

    setFavoriteGiftCardKeys(newFavoriteGiftCardKeys);
    setStoredFavoriteGiftCardKeys(newFavoriteGiftCardKeys);
  };

  const renderGiftCards = (giftCardEntries: [GiftCardsKeys, ProductsType][]) => {
    return giftCardEntries.map(([giftCardKey, products]) => (
      <GiftCard
        key={giftCardKey}
        giftCardKey={giftCardKey}
        products={products}
        isFavorite={favoriteGiftCardKeys.includes(giftCardKey)}
        onToggleFavorite={() => toggleFavorite(giftCardKey)}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Gift Cards
        </h1>
        <Search searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderGiftCards(Object.entries(giftCards).filter(([giftCardKey]) => favoriteGiftCardKeys.includes(giftCardKey)))}
          {renderGiftCards(Object.entries(giftCards).filter(([giftCardKey]) => !favoriteGiftCardKeys.includes(giftCardKey)))}
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

Dashboard.displayName = 'Dashboard';

export default Dashboard;
