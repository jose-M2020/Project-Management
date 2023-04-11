const isTooClose = (position) => {
  // Checks if number is decimal and if its remainder is less than 0.01
  if (!Number.isInteger(position) && position % 1 < 0.01) {
    return true;
  }

  return false;
};

export default isTooClose;