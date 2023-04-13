export const isTooClose = (number) => {
  return !Number.isInteger(number) && number % 1 < 0.1;
};

export const resetItemsOrder = (items) => {
  let sortedItems = items.sort((a, b) => a.order - b.order);
  let position = 32768;

  for (const item of sortedItems) {
    item.order = position;
    position += 32768;
  }

  return sortedItems;
};
