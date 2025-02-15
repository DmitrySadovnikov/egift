'use client'

import React, { FC, useState } from 'react'
import Image from 'next/image'
import { GIFT_CARDS } from '@/app/components/GiftCard/config';
import StarButton from '@/app/components/StarButton';
import { GiftCardProps } from '@/app/components/GiftCard/types';

const GiftCard: FC<GiftCardProps> = ({ giftCardKey, products, isFavorite, onToggleFavorite }) => {
  const imagePaths = `/images/cards/${giftCardKey}`
  const [imgSrc, setImgSrc] = useState(`${imagePaths}.png`);

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 relative">
      <StarButton isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
      <div className="relative h-60">
        <Image
          src={imgSrc}
          onError={() => setImgSrc(`${imagePaths}.jpg`)}
          alt={giftCardKey}
          layout="fill"
          objectFit="cover"
          className="transition duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {GIFT_CARDS[giftCardKey]}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Discount: {products.bupa_life_rewards}%
        </p>
      </div>
    </div>
  )
}

GiftCard.displayName = 'GiftCard'

export default GiftCard
