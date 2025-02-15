import { PRODUCTS } from './config';
import { GiftCardsType } from '@/app/components/GiftCard/types';

export type ProductKeys = keyof typeof PRODUCTS;

export type ProductsType = Record<ProductKeys, number>;

export interface DashboardProps {
  initGiftCards: GiftCardsType;
  initGiftCardKeys: string[];
}
