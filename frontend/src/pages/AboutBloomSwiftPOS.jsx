import React from 'react';
import { CheckCircle, Target, BarChart3, Users } from 'lucide-react';
import { PageHero, Section, Heading, BlockGrid, PhotoBand, FeatureBand } from '../Components/kit';

const bring = [
  { icon: CheckCircle, title: 'Reliability First', desc: 'A system that works as hard as you do, ensuring your doors stay open and your sales keep moving.' },
  { icon: Target, title: 'Simplicity by Design', desc: 'Easy-to-use interfaces that reduce training time for your staff and minimize errors.' },
  { icon: Users, title: 'Comprehensive Management', desc: 'Total control over your inventory, employees, and customer loyalty programs from a single dashboard.' },
  { icon: BarChart3, title: 'Data-Driven Insights', desc: 'Modern analytics that help you understand your best-selling products and busiest hours.' },
];

const AboutBloomSwiftPOS = () => (
  <div className="bg-white">
    <PageHero
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      eyebrow="ABOUT US"
      title="Empowering Sri Lankan Businesses"
      text={<p>From our very first line of code to becoming a trusted partner for hundreds of merchants, we're committed to transforming how businesses operate across Sri Lanka.</p>}
      image={{ src: '/images/general/team-table.webp', alt: 'Team working together around a table' }}
    />

    <Section bg="white">
      <Heading
        eyebrow="Our Story"
        title="From Solving Challenges to Building Solutions"
        imageLeft
        image={{ src: '/images/general/pos-terminal.webp', alt: 'Bloom Swift POS in action' }}
      >
        <p>Bloom Swift POS was born out of a simple mission: to solve the everyday operational hurdles faced by small and growing businesses. From our very first line of code, we realized that merchants were spending too much time battling outdated technology and not enough time connecting with their customers.</p>
        <p>We set out to change that by building a reliable, intuitive, and efficient POS ecosystem. What began as a focused idea to simplify checkout has grown into a comprehensive platform designed for the modern Sri Lankan entrepreneur.</p>
        <p>Today, we empower businesses to manage sales, inventory, staff, and customer relationships seamlessly in one unified place.</p>
      </Heading>
    </Section>

    <Section bg="grey">
      <Heading
        eyebrow="Local Focus"
        title="Why Sri Lanka?"
        image={{ src: '/images/clothing/boutique.webp', alt: 'Sri Lankan retail business' }}
      >
        <p>At Bloom Swift POS, we understand the heartbeat of the local market—from the bustling streets of Colombo to the growing retail hubs across the island. We believe that Sri Lankan businesses deserve world-class technology tailored to their unique needs.</p>
        <p>Whether you are a local boutique, a growing restaurant chain, or a neighborhood pharmacy, our platform is built to handle the complexities of your daily operations while providing the data-driven insights you need to scale.</p>
      </Heading>
    </Section>

    <PhotoBand src="/images/general/tap-to-pay.webp" alt="Modern POS technology" />

    <Section bg="white">
      <Heading
        eyebrow="Our Platform"
        title="What We Bring to Your Business"
        className="mb-14"
      >
        <p>We don't just offer software; we provide a foundation for growth. Our platform is continuously evolving to bring modern tools to businesses of every size:</p>
      </Heading>
      <BlockGrid items={bring} cols={4} />
    </Section>

    <FeatureBand
      eyebrow="The Future"
      title="Our Vision for the Future"
      text={
        <>
          <p>As part of the Bloom Tech (PVT) LTD family, Bloom Swift POS is committed to leading the digital transformation of Sri Lanka's retail and hospitality sectors. We are more than a service provider—we are your partner in success.</p>
          <p>As your business grows, we evolve alongside you, ensuring you always have the best tools to serve your customers and build your legacy.</p>
          <div className="mt-8 rounded-xl bg-white/[0.05] p-6 border-l-2 border-brand-orange">
            <p className="text-xl font-bold text-white">Join the hundreds of merchants who are blooming with Swift POS.</p>
            <p className="mt-2 text-white/60">Ready to transform your business? Let's grow together.</p>
          </div>
        </>
      }
      image={{ src: '/images/general/touchscreen-till.webp', alt: 'Growing business success' }}
    />
  </div>
);

export default AboutBloomSwiftPOS;
