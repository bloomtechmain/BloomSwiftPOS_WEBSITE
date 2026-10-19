import React from 'react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Hospitality POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Hospitality' }],
  hero: {
    title: 'Hospitality POS Complete Solution',
    text: 'Bloom Swift POS’s hospitality POS empowers restaurants, bars, cafés and hotels to streamline everything from tableside ordering to kitchen communication and real-time reporting.',
    image: { src: '/images/cafe/interior-2.webp', alt: 'Hospitality POS System' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  band: { src: '/images/bar/counter.webp', alt: 'Card Machine' },
};

const HospitalityPOS = () => <IndustryPage data={data} />;

export default HospitalityPOS;
