import React from 'react';
import { Zap, Globe, Smartphone, MessageSquare, FileText, Share2, Heart } from 'lucide-react';
import { PageHero, Section, Heading, BlockGrid, PhotoBand, FeatureBand } from '../Components/kit';
import { FeatureSection, HeroStat } from '../Components/IndustryPage';

const quick = [
  { icon: Smartphone, title: 'Seamless Customer Convenience', desc: 'Forget lost paper receipts and cluttered wallets. By delivering invoices directly to WhatsApp, you provide customers with a permanent, searchable digital record of their purchase that they can access anytime, anywhere, without needing to check their email.' },
  { icon: Globe, title: 'Modern Brand Engagement', desc: 'Turn a simple transaction into a lasting connection. Sending a digital invoice allows you to leave a professional, branded impression in your customer’s chat history, making it effortless for them to reach back out, reorder, or refer your business to others with a single tap.' },
  { icon: Zap, title: 'Operational Efficiency & Sustainability', desc: 'Streamline your checkout process while cutting costs. Digital invoicing eliminates the need for expensive thermal paper and printers, reducing both your overhead and your environmental impact while ensuring receipts are delivered instantly and accurately every time.' },
];

const rewards = {
  eyebrow: 'LOYALTY',
  title: 'Personalized Rewards, Delivered Instantly',
  text: ['Turn casual visitors into brand advocates by meeting them where they already are. Our loyalty tools integrate seamlessly with WhatsApp, ensuring your most frequent shoppers feel valued with meaningful rewards sent straight to their favorite app.'],
  image: { src: '/images/general/planner-desk.webp', alt: 'Personalized Rewards' },
};

const meet = [
  { icon: FileText, title: 'Instant Digital Records', desc: 'Eliminate the hassle of lost paper receipts and cluttered wallets by providing customers with a permanent, searchable digital record delivered straight to their phones.' },
  { icon: Smartphone, title: 'Frictionless Accessibility', desc: 'Give your customers the freedom to access their transaction history anytime and anywhere, without the need to dig through an overflowing email inbox.' },
  { icon: Heart, title: 'Personalized Loyalty', desc: 'Turn every transaction into a relationship by sending meaningful rewards and updates directly through WhatsApp, making repeat shopping an effortless choice.' },
];

const integration = [
  { icon: MessageSquare, title: 'Build Lasting Brand Recall', text: 'Move beyond paper receipts by leaving a high-quality, branded digital footprint in your customer’s most-used chat app.' },
  { icon: MessageSquare, title: 'Drive Frictionless Reorders', text: 'Empower customers to ask questions, request support, or reorder products instantly through their existing chat history.' },
  { icon: Share2, title: 'Simplify Word-of-Mouth', text: 'Make your business inherently "shareable" by allowing customers to forward your contact details and invoices to friends and family with a single click.' },
];

const WhatsApp = () => (
  <div className="bg-white">
    <PageHero
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Integrations' }, { label: 'WhatsApp' }]}
      eyebrow="WhatsApp Messaging"
      title="Receipts that meet your customers where they are."
      text={<p>Enhance the checkout experience by sending beautiful, detailed invoices straight to WhatsApp the moment a sale is finalized.</p>}
      image={{ src: '/images/general/handheld-card-reader.webp', alt: 'WhatsApp Integration' }}
    >
      <HeroStat label="Message Sent" value="Instant Delivery" />
    </PageHero>

    <Section bg="white">
      <BlockGrid items={quick} cols={3} />
    </Section>

    <FeatureSection s={rewards} i={0} total={2} />

    <PhotoBand src="/images/general/phone-laptop.webp" alt="Phone and laptop on a desk showing a sent receipt" />

    <Section bg="white">
      <Heading
        center
        title="Meet your customers where they already are."
        sub="By integrating your POS system with WhatsApp, you replace fragile paper receipts with a modern, eco-friendly experience. Our platform automatically sends professional, searchable invoices and personalized rewards directly to your customers' favorite messaging app."
        className="mb-14"
      />
      <BlockGrid items={meet} cols={3} />
    </Section>

    <FeatureBand
      eyebrow="INTEGRATION"
      title="Seamless WhatsApp POS Integration"
      text={<p>Transform your point-of-sale from a final transaction into an ongoing relationship. By delivering automated digital invoices directly to WhatsApp, you place your brand where your customers spend their time.</p>}
      points={integration}
      image={{ src: '/images/general/laptop-workspace.webp', alt: 'POS Integration' }}
    />
  </div>
);

export default WhatsApp;
