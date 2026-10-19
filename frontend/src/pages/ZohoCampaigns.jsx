import React from 'react';
import { PageHero } from '../Components/kit';

const ZohoCampaigns = () => (
  <div className="bg-white">
    <PageHero
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Integrations' }, { label: 'Zoho Campaigns' }]}
      title="Zoho Campaigns Integration"
      text={<p>Connect your POS with Zoho Campaigns for powerful email marketing.</p>}
      image={{ src: '/images/email/workspace.webp', alt: 'Laptop on a desk set up for email marketing' }}
    />
  </div>
);

export default ZohoCampaigns;
