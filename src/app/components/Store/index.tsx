'use client'

import React, { FC, useState } from 'react'
import { STORES } from '@/app/components/Store/config';
import { ProductsType } from '@/app/components/Store/types';
import Image from "next/image";

const Store: FC = ({ storeKey, products }: { storeKey: string, products: ProductsType }) => {
  const imagePaths = `/images/stores/${storeKey}`

  const [imgSrc, setImgSrc] = useState(`${imagePaths}.png`);

  return (
    <div >
      <Image
        src={imgSrc}
        alt={STORES[storeKey]}
        width={300}
        height={186}
        style={{ borderRadius: 20 }}
        onError={() => setImgSrc(`${imagePaths}.jpg`)}
      />
      <p>
        {STORES[storeKey]} {products.bupa_life_rewards}%
      </p>
    </div>
  )
}

export default Store;
