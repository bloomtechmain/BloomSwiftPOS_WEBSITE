import React from 'react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Nail Salon POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Nail Salon' }],
  hero: {
    title: 'A nail salon POS system built for your business',
    text: (
      <>
        Put a shine on your nail salon business with a <a href="#" className="underline font-bold text-white">POS system</a> that speeds up sales, builds real-time reports, and helps increase client loyalty.
      </>
    ),
    image: { src: '/images/salon/manicure.webp', alt: 'Nail polish samples' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  band: { src: '/images/salon/nails-dark.webp', alt: 'Manicure session' },
};

const NailSalon = () => <IndustryPage data={data} />;

export default NailSalon;
