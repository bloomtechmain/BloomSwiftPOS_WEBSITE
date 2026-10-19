import React, { useState } from 'react';
import { Target, Users, Award, BarChart3, Quote } from 'lucide-react';
import ContactSalesModal from '../Components/ContactSalesModal';
import { PageHero, Section, Heading, BlockGrid, MediaFrame, Reveal, Eyebrow, H2, CtaBand } from '../Components/kit';

const Hi = ({ children }) => <span className="font-semibold text-navy">{children}</span>;

const stories = [
  {
    icon: Target,
    title: 'Scaling the Flavor',
    image: { src: '/images/restaurant/order-counter.webp', alt: 'Restaurant kitchen operations' },
    points: [
      { label: 'The Challenge:', text: 'As a fast-paced, multi-location food chain, needed a way to sync kitchen orders with front-of-house sales while maintaining speed during peak hours.' },
      { label: 'The Solution:', text: 'We implemented a comprehensive Restaurant Management System that bridged the gap between the grill and the register.' },
      { label: 'The Result:', text: <>Reduced wait times by <Hi>20%</Hi> and gained real-time inventory tracking across all branches, ensuring they never run out of the ingredients their customers love.</> },
    ],
  },
  {
    icon: BarChart3,
    title: 'Sarath Communications',
    sub: 'Beyond the Counter',
    image: { src: '/images/clothing/checkout.webp', alt: 'Retail electronics store' },
    points: [
      { label: 'The Challenge:', text: 'Managing a diverse inventory of electronics alongside complex payroll and financial reporting was becoming a manual bottleneck.' },
      { label: 'The Solution:', text: 'Bloom Swift deployed an Integrated Business Management System that combined sales, salary management, and deep financial reporting into one dashboard.' },
      { label: 'The Record:', text: <>Sarath Communications now saves over <Hi>10 hours a week</Hi> on administrative tasks, allowing the leadership to focus on expanding their product lines.</> },
    ],
  },
  {
    icon: Award,
    title: 'Premium Golf Club',
    sub: 'Modernizing Tradition',
    image: { src: '/images/general/touchscreen-till.webp', alt: 'Premium golf club facility' },
    points: [
      { label: 'The Challenge:', text: 'A prestigious institution required a sophisticated way to manage high-end memberships, facility bookings, and on-site pro-shop sales.' },
      { label: 'The Solution:', text: 'A custom Cloud-Based ERP System tailored for the unique needs of a sports club, integrating HR, Finance, and POS.' },
      { label: 'The Result:', text: 'A seamless experience for members and a "birds-eye view" for management, with all financial and member data accessible securely from anywhere in the world.' },
    ],
  },
];

const SuccessStories = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="bg-white">
      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Success Stories' }]}
        eyebrow="SUCCESS STORIES"
        title="Real Growth, Real Results"
        text={
          <>
            <p className="text-xl lg:text-2xl font-bold text-white">Empowering Sri Lankan Businesses to Bloom</p>
            <p>At Bloom Swift POS, our success is measured by the growth of the merchants we serve. From streamlining kitchen operations to managing complex memberships, see how businesses across the island are using our technology to scale.</p>
          </>
        }
        image={{ src: '/images/general/handshake.webp', alt: 'Sri Lankan business success' }}
      />

      <Section bg="white">
        <Heading center eyebrow="CASE STUDIES" title="Featured Stories" className="mb-14" />
        <BlockGrid items={stories} cols={3} />
      </Section>

      <Section bg="grey">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>Testimonials</Eyebrow>
              <H2>What Our Partners Are Saying</H2>
            </Reveal>
            <Reveal delay={0.1} as="figure" className="mt-10 rounded-2xl bg-white p-8 lg:p-10 shadow-[8px_8px_0_0_#101D36]">
              <Quote size={32} className="text-navy" aria-hidden="true" />
              <blockquote className="mt-5 text-lg text-gray-700 leading-relaxed">
                "Switching to Bloom Swift was the best decision for our expansion. The data-driven insights allowed us to see exactly where our waste was happening, and the local support team understands our business environment perfectly."
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-4">
                <span className="w-12 h-12 rounded-full bg-navy text-white inline-flex items-center justify-center font-bold">M</span>
                <span>
                  <span className="block font-extrabold text-navy">Merchant Partner</span>
                  <span className="block text-sm text-gray-500">Multi-location Business Owner</span>
                </span>
              </figcaption>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <MediaFrame src="/images/general/letterboard.webp" alt="Happy business owner" />
          </div>
        </div>
      </Section>

      <CtaBand
        eyebrow="Get Started"
        title="Ready to write your success story?"
        text={<p>Every business is unique, and we're here to help yours reach its full potential. Join the Bloom Swift family today.</p>}
        actions={[{ label: 'Contact Sales', onClick: () => setIsContactModalOpen(true) }]}
      />

      <ContactSalesModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
};

export default SuccessStories;
