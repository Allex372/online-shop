const compareName = (a, b) =>
  (a?.attributes?.name || '').localeCompare(b?.attributes?.name || '', 'uk');

const getPrice = (el, currencyRate) => {
  const price = Number(el?.attributes?.price) || 0;
  return price * (currencyRate || 1);
};

const partitionHighPriority = (list) => {
  const high = list.filter((el) => el?.attributes?.highPriority === true);
  const rest = list.filter((el) => el?.attributes?.highPriority !== true);
  return [...high, ...rest];
};

export const sortCatalogProducts = (items, sortOptions = {}, currencyRate = 1) => {
  if (!items?.length) return [];

  const list = [...items];

  if (sortOptions.reverseAlphabet) {
    list.sort((a, b) => compareName(b, a));
  } else if (sortOptions.priceHighToLow) {
    list.sort((a, b) => getPrice(b, currencyRate) - getPrice(a, currencyRate));
  } else if (sortOptions.priceLowToHigh) {
    list.sort((a, b) => getPrice(a, currencyRate) - getPrice(b, currencyRate));
  } else if (sortOptions.availability) {
    list.sort((a, b) => {
      const avA = a?.attributes?.isAvailable ? 1 : 0;
      const avB = b?.attributes?.isAvailable ? 1 : 0;
      if (avB !== avA) return avB - avA;
      return compareName(a, b);
    });
  } else {
    list.sort(compareName);
  }

  return partitionHighPriority(list);
};
