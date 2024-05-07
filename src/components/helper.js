export function* chunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
/**
 * This function returns the Russian abbreviated month name based on the provided index.
 * The function accepts an index ranging from 1 to 12, representing the months of the year.
 * If the provided index is out of range, the function will return null.
 *
 * @param {number} index - The index of the month, ranging from 1 to 12.
 * @return {string|null} - The Russian abbreviated month name or null if the index is out of range.
 */
export function getMonthName(index) {
  // expected index be 1 - 12
  const months = {
    1: "янв",
    2: "фев",
    3: "мар",
    4: "апр",
    5: "май",
    6: "июн",
    7: "июл",
    8: "авг",
    9: "сен",
    10: "окт",
    11: "ноя",
    12: "дек",
  };

  return months[index] || null;
}
