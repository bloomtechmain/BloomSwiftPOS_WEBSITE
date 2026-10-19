import React from 'react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Quick Service Restaurant POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Quick Service' }],
  hero: {
    title: 'Quick service restaurant POS system to keep up with demand',
    text: 'The Bloom Swift POS quick service restaurant management system lets you serve customers quickly and accurately. That sounds delicious!',
    image: { src: '/images/general/pos-stand.webp', alt: 'Customers ordering at counter' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  band: { src: '/images/restaurant/order-counter.webp', alt: 'Serving food in quick service restaurant' },
};

const QuickService = () => <IndustryPage data={data} />;

export default QuickService;
