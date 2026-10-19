import React from 'react';
import IndustryPage from '../Components/IndustryPage';

// Note: the "Request for POS" button had no click handler on the original page; it is kept as-is.
const data = {
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Software' }],
  hero: {
    title: 'Our award-winning POS system',
    text: 'Simple, secure, and powerful. Take control of your business with our award-winning POS systems.',
    image: { src: '/images/general/touchscreen-till.webp', alt: 'POS dashboard software on monitor' },
    actions: [{ label: 'Request for POS' }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  band: { src: '/images/general/pos-terminal.webp', alt: 'Mobile POS software' },
};

const Software = () => <IndustryPage data={data} />;

export default Software;
