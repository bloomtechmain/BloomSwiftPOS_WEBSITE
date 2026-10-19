import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Ticket, MessageCircle } from 'lucide-react';
import TicketFormModal from '../Components/TicketFormModal';
import { PageHero, Section, Heading, Reveal, PrimaryButton, PhotoBand } from '../Components/kit';

const Mono = ({ children, className = '' }) => (
  <span className={`font-mono text-[11px] font-bold tracking-widest uppercase ${className}`}>{children}</span>
);

const SupportCentre = () => {
  const navigate = useNavigate();
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const handleLoginClick = () => {
    navigate('/support-centre?login=1');
  };

  const options = [
    {
      icon: Phone,
      title: 'Contact us directly',
      text: '+94 077 026 2675',
      action: <PrimaryButton href="https://wa.me/94770262675" target="_blank" rel="noopener noreferrer">Get in touch</PrimaryButton>,
    },
    {
      icon: Ticket,
      title: 'Submit your ticket',
      text: 'Connect to a live text chat with a support team member anytime between 9am-6pm.',
      action: <PrimaryButton onClick={() => setIsTicketModalOpen(true)}>Get in touch</PrimaryButton>,
    },
  ];

  return (
    <div className="bg-white">
      <TicketFormModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />

      <PageHero
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Support Centre' }]}
        eyebrow="Help and support"
        title="How can we help?"
        text={
          <p>
            Get in touch with the right people at Bloom Swift POS. Talk to a member of our sales team, get support with using our products, or message a member of our partnership team.
          </p>
        }
        image={{ src: '/images/general/waiter-tablet.webp', alt: 'Staff member helping a customer with a tablet POS' }}
      />

      {/* Contact strip */}
      <section className="bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-8 lg:px-12 grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <a href="tel:0770262675" className="group flex items-center gap-4 py-8 sm:pr-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy">
            <span className="w-12 h-12 rounded-lg bg-grey-light text-navy group-hover:bg-navy group-hover:text-white inline-flex items-center justify-center transition-colors">
              <Phone size={20} aria-hidden="true" />
            </span>
            <span>
              <Mono className="block text-gray-500">Need to speak with someone? Call our helpline:</Mono>
              <span className="block mt-1 text-xl font-extrabold text-navy">0770262675</span>
            </span>
          </a>
          <a href="https://wa.me/94770262675" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-8 sm:pl-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy">
            <span className="w-12 h-12 rounded-lg bg-grey-light text-navy group-hover:bg-navy group-hover:text-white inline-flex items-center justify-center transition-colors">
              <MessageCircle size={20} aria-hidden="true" />
            </span>
            <span>
              <Mono className="block text-gray-500">Contact us directly</Mono>
              <span className="block mt-1 text-xl font-extrabold text-navy">+94 077 026 2675</span>
            </span>
          </a>
        </div>
      </section>

      {/* Support options */}
      <Section bg="grey">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {options.map((o, i) => {
            const Icon = o.icon;
            return (
              <Reveal key={o.title} delay={i * 0.08} className="h-full">
                <div className="group h-full flex flex-col rounded-2xl bg-white p-8 lg:p-10 shadow-[5px_5px_0_0_#D5DAE3] hover:shadow-[8px_8px_0_0_#101D36] hover:-translate-x-1 hover:-translate-y-1 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-14 h-14 rounded-xl bg-navy text-white inline-flex items-center justify-center">
                      <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="ml-auto font-mono text-xs font-bold text-brand-orange">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold text-navy">{o.title}</h3>
                  <p className="mt-3 text-lg text-gray-600 flex-grow">{o.text}</p>
                  <div className="mt-8">{o.action}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <PhotoBand src="/images/general/meeting-laptop.webp" alt="Support team member working at a laptop" />

      {/* Login */}
      <Section bg="navy">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Heading dark eyebrow="Customers" title="Log in for the best support">
              <p>Already a customer? In need of support or advice? Login to Bloom Swift POS and select "support" to take advantage of our award-winning support team, who are always happy to help you with all your POS problems:</p>
            </Heading>
          </div>
          <Reveal delay={0.1} className="lg:col-span-4 lg:text-right">
            <PrimaryButton onClick={handleLoginClick}>Login to Bloom Swift POS</PrimaryButton>
          </Reveal>
        </div>
      </Section>
    </div>
  );
};

export default SupportCentre;
