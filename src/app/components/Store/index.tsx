'use client'

import React, { FC, useState } from 'react'
import { ProductsType } from '../Dashboard/types'
import Image from 'next/image'

interface StoreProps {
  storeKey: string
  products: ProductsType
}

const Store: FC<StoreProps> = ({ storeKey, products }) => {
  const imagePaths = `/images/stores/${storeKey}`

  const [imgSrc, setImgSrc] = useState(`${imagePaths}.png`);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
      <div className="relative h-48">
        <Image
          src={imgSrc}
          onError={() => setImgSrc(`${imagePaths}.jpg`)}
          alt={storeKey}
          layout="fill"
          objectFit="cover"
          className="transition duration-300 ease-in-out transform hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {storeKey}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Discount: {products.bupa_life_rewards}%
        </p>
      </div>
    </div>
  )
}

Store.displayName = 'Store'

export default Store
