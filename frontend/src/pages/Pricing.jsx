import React from 'react';
import { Phone, Mail, Globe } from 'lucide-react';
import { PageHero, PhotoBand, CtaBand } from '../Components/kit';
import { OfflinePlans, OfflineComparison, CloudPlans } from '../Components/PricingBlocks';
import { offline, PRICING_PHONE, PRICING_PHONE_HREF } from '../data/pricing';
import useRequestPos from '../hooks/useRequestPos';

const Pricing = () => {
  const requestPos = useRequestPos();
  return (
    <div className="bg-white">
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Pricing' }]}
        eyebrow={offline.tagline}
        title={<>{offline.headline[0]} <span className="text-brand-orange">{offline.headline[1]}</span></>}
        text={<p>{offline.intro}</p>}
        actions={[
          { label: PRICING_PHONE, href: PRICING_PHONE_HREF },
          { label: 'Cloud plans', href: '#cloud' },
        ]}
        image={{ src: '/images/general/pos-counter.webp', alt: 'Point of sale terminal on a shop counter' }}
      />
      <OfflinePlans compact />
      <OfflineComparison />
      <PhotoBand src="/images/general/touchscreen-till.webp" alt="Cashier using a touchscreen till" />
      <CloudPlans bg="white" />
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
