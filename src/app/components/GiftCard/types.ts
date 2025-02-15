import { ProductsType } from '@/app/components/Dashboard/types';
import { GIFT_CARDS } from '@/app/components/GiftCard/config';

export type GiftCardsKeys = keyof typeof GIFT_CARDS;

export type GiftCardsType = Record<GiftCardsKeys, ProductsType>;

export interface GiftCardProps {
  giftCardKey: string
  products: ProductsType
  isFavorite: boolean
  onToggleFavorite: () => void
}
