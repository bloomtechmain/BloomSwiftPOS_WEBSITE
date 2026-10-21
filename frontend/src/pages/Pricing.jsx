import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { PageHero, PhotoBand, CtaBand } from '../Components/kit';
import { OfflinePlans, OfflineComparison, CloudPlans } from '../Components/PricingBlocks';
import { offline, cloud, PRICING_PHONE, PRICING_PHONE_HREF } from '../data/pricing';
import useRequestPos from '../hooks/useRequestPos';

const Pricing = () => {
  const requestPos = useRequestPos();
  return (
    <div className="bg-white">
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]}
        eyebrow="Cloud · Offline"
        title={<>Cloud POS from Rs. {cloud.plans[0].price} a month, <span className="text-brand-orange">or own it outright.</span></>}
        text={<p>Start on a monthly cloud plan with no setup fees and cancel anytime, or pay once for the offline desktop edition that runs on your own PC. Either way, we set it up and train your staff.</p>}
        actions={[
          { label: PRICING_PHONE, href: PRICING_PHONE_HREF },
          { label: 'Offline plans', href: '#offline' },
        ]}
        image={{ src: '/images/general/pos-counter.webp', alt: 'Point of sale terminal on a shop counter' }}
      />
      <CloudPlans />
      <PhotoBand src="/images/general/touchscreen-till.webp" alt="Cashier using a touchscreen till" />
      <OfflinePlans compact />
      <OfflineComparison />
      <CtaBand
        eyebrow="Get started"
        title={offline.cta}
        text={<p>{offline.smallPrint}</p>}
        actions={[{ label: 'Get Started', onClick: () => requestPos() }, { label: 'Contact Sales', to: '/contact' }]}
        rows={[
          { icon: Phone, label: 'Phone', value: PRICING_PHONE, href: PRICING_PHONE_HREF },
          { icon: Mail, label: 'Email', value: 'info@bloomswiftpos.com', href: 'mailto:info@bloomswiftpos.com' },
          { icon: Globe, label: 'Web', value: 'www.bloomswiftPOS.com', href: 'https://bloomswiftpos.com' },
        ]}
      />
    </div>
  );
};

export default Pricing;
