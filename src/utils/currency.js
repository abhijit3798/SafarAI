/**
 * Formats a numeric value into Indian Rupees (INR) currency representation.
 * E.g. 25000 => ₹25,000
 * 
 * @param {number|string} value - The cost to format
 * @returns {string} Formatted currency string
 */
export const formatINR = (value) => {
  const numberValue = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(numberValue)) return '₹0';
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(numberValue);
};
