// Pricing transcribed from the BloomSwiftPOS flyers (offline desktop edition + cloud plans).

export const PRICING_PHONE = '+94 76 2252901';
export const PRICING_PHONE_HREF = 'tel:+94762252901';

export const offline = {
  sectors: 'Retail · Restaurant · Pharmacy · Wholesale',
  edition: 'Offline desktop edition — runs on your own Windows PC',
  tagline: 'Billing · Inventory · Staff · Reports',
  headline: ['Own your POS outright', 'from Rs. 34,999.'],
  intro: 'One payment, no monthly bill. Billing, stock, staff and reports run entirely on your own PC — no internet needed, ever. We install it and train your staff.',
  plans: [
    { name: 'Basic', price: '34,999', unit: 'one-time', text: 'A single till, keep it simple.', bold: '1 staff login.' },
    { name: 'Standard', price: '44,999', unit: 'one-time', text: 'Growing shop, more than one cashier. Full reporting suite built in.', bold: '5 logins.' },
    { name: 'Professional', price: '54,999', unit: 'one-time', text: 'Credit customers, restaurant tables, VAT invoices & up to 5 LAN tills.', bold: '15 logins.', popular: true },
    { name: 'Custom', quote: 'Call for a quote', text: 'Unlimited staff logins, bespoke features and integrations — built to your business.' },
  ],
  // Columns: Basic, Standard, Professional, Custom. true = included, false = not included, string = value.
  features: [
    ['Staff logins', '1', '5', '15', 'Unlimited'],
    ['Billing till — barcode scan, holds, split payment, returns', true, true, true, true],
    ['Products & catalogue — barcodes, units, tax rates', true, true, true, true],
    ['Inventory & stock audit trail', true, true, true, true],
    ['GRN — goods received, suppliers, returns', true, true, true, true],
    ['Cashier shifts — cash float, over/short reconciliation', true, true, true, true],
    ['Daily sales report — today’s takings at a glance', true, true, true, true],
    ['Full reporting suite — sales, products, inventory, cashiers, credit, stock movements & promotions', false, true, true, true],
    ['Multi-currency', false, true, true, true],
    ['Multiple staff logins with roles & permissions', false, true, true, true],
    ['Promotions & discounts', false, true, true, true],
    ['Coupon codes (bulk-generate up to 500)', false, true, true, true],
    ['Credit customers & pay-later accounts', false, false, true, true],
    ['Batch / FIFO costing with expiry tracking', false, false, true, true],
    ['English / Sinhala interface & receipts', false, false, true, true],
    ['Restaurant Mode — tables, dine-in / takeaway / delivery', false, false, true, true],
    ['Kitchen ticket (KOT) printing per station', false, false, true, true],
    ['VAT tax invoices', false, false, true, true],
    ['Multi-terminal LAN mode — up to 5 tills on one licence', false, false, true, true],
  ],
  notes: [
    { title: 'Pay once, own it', text: 'No monthly fee and no subscription — one licence, yours to keep.' },
    { title: 'Your data stays on your PC', text: 'Local database with scheduled backups to your own folder.' },
    { title: 'Need a feature from a higher plan?', text: 'We can add any single feature to your package — just ask.' },
  ],
  cta: 'Call, SMS or WhatsApp — we’ll set it up and train your staff.',
  smallPrint: 'Individual features can be added to a lower package on request. All prices in LKR, one-time licence fee, subject to change; packages are cumulative.',
};

export const cloud = {
  badge: 'Locally built for Sri Lankan businesses',
  headline: ['Run your business smarter.', 'Grow faster.'],
  intro: 'A simple, powerful and affordable POS system for every business.',
  plans: [
    { name: 'Basic Cloud', price: '6,999', unit: 'LKR / month' },
    { name: 'Standard Cloud', price: '8,999', unit: 'LKR / month' },
    { name: 'Professional Cloud', price: '12,000', unit: 'LKR / month' },
  ],
  perks: ['No setup fees', 'Cancel anytime'],
  addOn: { tag: 'New', title: 'VAT Tax Form', text: 'Add-on available' },
  features: [
    'Easy Sales & Checkout',
    'Inventory Management',
    'Purchase & Supplier Management',
    'Cash Shifts',
    'Business Setup',
    'Simple. Secure. Reliable.',
  ],
  cta: 'Ready to grow your business? Message us today to get started!',
};
