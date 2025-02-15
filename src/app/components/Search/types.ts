import { ChangeEvent } from 'react';

export interface SearchProps {
  searchQuery: string;
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
}
