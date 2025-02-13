import { ProductKeys, ProductsType, StoreKeys, StoresType } from './types';

const fetchJsonData = async (): Promise<StoresType> => {
  const response = await fetch('data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch JSON data');
  }
  return response.json();
};

// TODO: Implement sortby popularity
export const getStores = async ({ product, store, matchName, minValue, limit, offset, sortBy, sortOrder = 'asc' }: {
  product?: ProductKeys,
  store?: StoreKeys,
  matchName?: string,
  minValue?: number,
  limit?: number,
  offset?: number,
  sortBy?: 'name' | 'value',
  sortOrder?: 'asc' | 'desc'
}): Promise<StoresType> => {
  const jsonData = await fetchJsonData();
  let result: StoresType = jsonData;

  if (store) {
    result = { [store]: result[store] };
  }

  if (product) {
    result = Object.keys(result).reduce((acc: StoresType, key) => {
      if (result[key][product] > 0) {
        acc[key] = { [product]: result[key][product] };
      }
      return acc;
    }, {});
  }

  if (matchName) {
    const matchNameLower = matchName.toLowerCase();
    result = Object.keys(result).reduce((acc: StoresType, key) => {
      if (key.toLowerCase().startsWith(matchNameLower)) {
        acc[key] = result[key];
      } else {
        const filteredProducts = Object.keys(result[key]).reduce((prodAcc: ProductsType, prodKey) => {
          if (prodKey.toLowerCase().startsWith(matchNameLower)) {
            prodAcc[prodKey] = result[key][prodKey];
          }
          return prodAcc;
        }, {});
        if (Object.keys(filteredProducts).length > 0) {
          acc[key] = filteredProducts;
        }
      }
      return acc;
    }, {});
  }

  if (minValue !== undefined) {
    result = Object.keys(result).reduce((acc: StoresType, key) => {
      const filteredProducts = Object.keys(result[key]).reduce((prodAcc: ProductsType, prodKey) => {
        if (result[key][prodKey] >= minValue) {
          prodAcc[prodKey] = result[key][prodKey];
        }
        return prodAcc;
      }, {});
      if (Object.keys(filteredProducts).length > 0) {
        acc[key] = filteredProducts;
      }
      return acc;
    }, {});
  }

  const resultArray = Object.entries(result);

  if (sortBy) {
    resultArray.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = a[0].toLowerCase();
        const nameB = b[0].toLowerCase();
        if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
        if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      } else if (sortBy === 'value') {
        const valueA = Object.values(a[1]).reduce((sum, val) => sum + val, 0);
        const valueB = Object.values(b[1]).reduce((sum, val) => sum + val, 0);
        return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return 0;
    });
  }

  const paginatedResult = resultArray.slice(offset || 0, (offset || 0) + (limit || resultArray.length));

  return Object.fromEntries(paginatedResult);
};
