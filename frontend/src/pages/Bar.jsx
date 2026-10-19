import React from 'react';
import { ShieldCheck, CreditCard, Wine } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Bar POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Bar' }],
  hero: {
    title: 'Streamline your bar operations for peak performance',
    text: 'Eliminate friction during happy hour and busy weekends. Our comprehensive bar POS integrates multichannel sales and instant reporting, allowing your staff to focus on service rather than the screen.',
    image: { src: '/images/bar/counter.webp', alt: 'Bar atmosphere' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: ShieldCheck, title: 'Safer sales', desc: 'Automatically prompt staff for ID on alcohol sales, so you can stay compliant without slowing down service' },
      { icon: CreditCard, title: 'Customer convenience', desc: 'Create customer profiles and let your guests enjoy service-first experiences by settling up later with card pre-auths and bar tabs' },
      { icon: Wine, title: 'Efficient trade', desc: 'Monitor drink usage down to the keg or bottle to stay stocked on your most in-demand brands and mixers' },
    ],
  },
  sections: [
    {
      title: 'A High-Performance Bar POS Built for High-Demand Service',
      text: ['Your bartenders are the multi-tasking backbone of your business—give them the tools they deserve. Our POS is engineered for speed and reliability, ensuring your team stays ahead of the rush.'],
      points: [
        { title: 'Hardened for the Bar', desc: 'Durable, water-resistant touchscreens built to survive spills and splashes.' },
        { title: 'Effortless Onboarding', desc: 'An intuitive interface that gets new hires up to speed in minutes.' },
        { title: 'Dynamic Layouts', desc: 'Tailor your floor plan with custom seating charts for better flow.' },
        { title: 'Cultivate Regulars', desc: 'Boost retention with integrated loyalty programs and digital drink rewards.' },
      ],
      image: { src: '/images/general/card-terminal-desk.webp', alt: 'Bar POS System' },
    },
    {
      title: 'Total Menu Control that Moves at the Speed of Your Bar',
      text: ['From a tapped-out keg to a surprise kitchen special, your POS should stay in sync with your floor. We provide the agility you need to manage your offerings in real time without missing a beat.'],
      points: [
        { title: 'Smart Stock Alerts', desc: 'Never get caught off guard. Get instant notifications the moment inventory hits a critical level.' },
        { title: 'One-Tap Dynamic Pricing', desc: 'Launch happy hour specials or promotional pricing instantly while keeping a sharp eye on your margins.' },
        { title: 'Cloud-Based Management', desc: 'Update your menu from anywhere, on any device, ensuring your staff always knows exactly what’s in stock.' },
        { title: 'Transparent Payments', desc: 'Support every way your guests want to pay—no hidden fees, no frustrations.' },
      ],
      image: { src: '/images/bar/lit-bar.webp', alt: 'Bar Inventory' },
    },
    {
      title: 'Drive repeat business with streamlined customer management',
      text: ['Loyalty is the key to a sustainable bar business. With integrated payment solution, you can manage customer relationships with ease and precision. Our complete solution empowers you to:'],
      points: [
        { title: 'Understand Buying Habits', desc: 'Track preferences to personalize the guest experience.' },
        { title: 'Reward Loyalty', desc: 'Design unique schemes that keep your brand top-of-mind.' },
        { title: 'Targeted Outreach', desc: 'Send time-sensitive marketing messages that drive foot traffic.' },
        { title: 'Build Profiles', desc: 'Store essential customer data in one centralized, easy-to-access location.' },
      ],
      image: { src: '/images/general/waiter-tablet.webp', alt: 'Happy Customers' },
    },
  ],
  band: { src: '/images/bar/cocktails.webp', alt: 'Fresh cocktails' },
  summary: {
    title: 'Master your data with high-level bar analytics',
    text: 'Gain a competitive edge by turning raw data into actionable insights.',
    items: [
      { title: 'WhatsApp Integration', desc: 'Connect with customers directly.' },
      { title: 'Email Notifications', desc: 'Stay updated with automated alerts.' },
      { title: 'Hourly Throughput', desc: 'Identify your peak morning rushes and weekend surges to optimize your schedule and staffing.' },
      { title: 'Churn Rates', desc: 'Monitor your loyalty program health by tracking how many regulars are staying active.' },
      { title: 'Inventory & Ingredient Integration', desc: 'Master your margins by syncing POS sales data with ingredient usage to monitor your exact costs.' },
      { title: 'Offline Mode', desc: 'Keep the flow moving; your bar keeps taking payments even if the internet goes down.' },
      { title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that stay busy through the weekends.' },
      { title: 'Success Metrics', desc: 'Set and hit clear growth targets.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    actions: [{ label: 'Get in touch', request: true }],
  },
};

const Bar = () => <IndustryPage data={data} />;

export default Bar;
