import { PRODUCTS, STORES } from './config';

export type StoreKeys = keyof typeof STORES;

export type ProductKeys = keyof typeof PRODUCTS;

export type ProductsType = Record<ProductKeys, number>;

export type StoresType = Record<StoreKeys, ProductsType>;
