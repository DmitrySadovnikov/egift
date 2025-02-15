"use client"

import Dashboard from '@/app/components/Dashboard';
import { useEffect, useState } from 'react';
import { GiftCardsType } from '@/app/components/GiftCard/types';
import { getGiftCards, getStoredFavoriteGiftCardKeys } from '@/app/components/Dashboard/utils';

export default function Home() {
  const [giftCards, setGiftCards] = useState<GiftCardsType>({});
  const [favoriteGiftCardKeys, setFavoriteGiftCardKeys] = useState<string[]>([]);

  const loadFavoriteGiftCards = async () => {
    const storedFavoriteGiftCardKeys = getStoredFavoriteGiftCardKeys();
    setFavoriteGiftCardKeys(storedFavoriteGiftCardKeys);

    const cards = await getGiftCards({
      giftCardsKeys: storedFavoriteGiftCardKeys,
      sortBy: 'name'
    });

    setGiftCards(cards);
  };

  useEffect(() => {
    loadFavoriteGiftCards();
  }, []);

  return <Dashboard initGiftCards={giftCards} initGiftCardKeys={favoriteGiftCardKeys} />;
}
