/**
 * @function formatCurrency
 *
 * @param {number} currency
 * @return {string}
 *
 */

export function formatCurrency(currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(currency);
}
