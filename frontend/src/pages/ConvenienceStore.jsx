import React from 'react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Convenience Store POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Convenience Store' }],
  hero: {
    title: 'Be your best with the convenience store POS system',
    text: 'Move quickly from customer to customer with one-tap processing on an easy-to-use till system you can master in just 15 minutes. Sell easier today.',
    image: { src: '/images/grocery/produce.webp', alt: 'Shopper in convenience store' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  band: { src: '/images/grocery/aisle.webp', alt: 'Shopping basket in aisle' },
};

const ConvenienceStore = () => <IndustryPage data={data} />;

export default ConvenienceStore;
