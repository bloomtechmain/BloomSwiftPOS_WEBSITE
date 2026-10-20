import API_URL from './api';

export const SHIPPING_FEE = 500;

export const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

export const formatLKR = (value) => lkrFormatter.format(Number(value) || 0);

export const CATEGORY_ORDER = [
  'Monitors',
  'Computers',
  'Keyboard and mouse',
  'Scanners',
  'Cash Drawers',
  'Thermal Printers',
  'Other'
];

// The shop API returns image paths relative to the backend
export const resolveImage = (src) => {
  if (!src) return null;
  return src.startsWith('/api/') ? `${API_URL}${src}` : src;
};
