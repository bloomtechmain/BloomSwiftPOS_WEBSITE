import React from 'react';
import {
  MessageCircle, Zap, Smartphone, Clock, RefreshCw, WifiOff, Server, TrendingUp, Package,
} from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Salon POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Salon' }],
  hero: {
    title: 'Streamline Your Salon, Scale Your Success',
    text: 'Manage your salon with precision using a POS built for speed and growth. From lightning-fast transactions to instant performance reporting and automated loyalty programs, we provide the tools you need to stay ahead of the competition.',
    image: { src: '/images/salon/interior.webp', alt: 'Salon Display' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
  quick: {
    items: [
      { icon: Clock, title: 'Save time', desc: 'Save up to 10 hours every month on business management and staff admin.' },
      { icon: TrendingUp, title: 'Efficient business', desc: '81% of shoppers research products online. Showcase your inventory online.' },
      { icon: Zap, title: 'Quick transactions', desc: 'Put a gloss onto your day. Save over 4 hours per month with integrated payment solutions.' },
    ],
  },
  sections: [
    {
      eyebrow: 'CLIENT CONNECTION',
      title: 'In a competitive industry, excellence is the baseline—connection is the differentiator',
      text: ['Treat every client like a VIP by tailoring your service to their unique needs and showing genuine appreciation for their loyalty.'],
      points: [
        { title: 'Curate Personal Profiles', desc: 'Maintain detailed records of preferences and style choices to provide a bespoke experience every time.' },
        { title: 'Reward Devotion', desc: 'Invite guests into an exclusive loyalty program that celebrates and incentivizes frequent visits.' },
        { title: 'Stay Connected', desc: 'Use a curated mailing list to share beauty insights and seasonal promotions directly with your community.' },
        { title: 'Amplify Your Reputation', desc: 'Encourage satisfied clients to share their experiences online, building a brand that speaks for itself.' },
      ],
      image: { src: '/images/salon/stylists.webp', alt: 'Salon POS' },
    },
    {
      eyebrow: 'FLEXIBLE HARDWARE',
      title: 'Invest Only in What You Need',
      text: ['Stop paying for bloated POS bundles designed for other industries. With Bloom Swift, you have the freedom to customize your setup—selecting only the hardware and software that actually serves your salon.'],
      points: [
        { title: 'Keep Your Gear', desc: 'No need for a total overhaul; we offer the flexibility to integrate with your existing hardware.' },
        { title: 'Hardware Agnostic', desc: 'Our software runs seamlessly across Apple, Windows, and Android devices.' },
        { title: 'Tablet or Desktop', desc: 'Choose between a sleek tablet setup for mobility or a traditional computer system.' },
        { title: 'Browser-Based Control', desc: 'Manage your Back Office instantly from any major web browser like Chrome.' },
      ],
      image: { src: '/images/salon/nails-pink.webp', alt: 'Flexible Hardware' },
    },
  ],
  band: { src: '/images/salon/manicure.webp', alt: 'Manicurist working on a client’s nails' },
  summary: {
    title: 'Master your data with high-level salon analytics',
    text: 'Gain a competitive edge by turning raw data into actionable insights. Our payment system automatically syncs analytics from every corner of your salon, generating comprehensive reports that provide a crystal-clear view of your performance.',
    items: [
      { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Connect with clients on their preferred platform.' },
      { icon: Smartphone, title: 'Email Notifications', desc: 'Stay updated with automated alerts.' },
      { icon: Clock, title: 'Hourly Throughput', desc: 'Identify your peak hours and weekend surges to optimize your staff scheduling.' },
      { icon: RefreshCw, title: 'Churn Rates', desc: 'Monitor your loyalty program health by tracking how many regulars are staying active.' },
      { icon: Package, title: 'Inventory Integration', desc: 'Master your margins by syncing POS sales data with product usage to monitor your exact costs.' },
      { icon: WifiOff, title: 'Offline Mode', desc: 'Keep the salon running; take payments and process bookings even if the internet goes down.' },
      { icon: Server, title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that stay busy through the weekends.' },
      { icon: TrendingUp, title: 'Success Metrics', desc: 'Set and hit clear growth targets, such as increasing your monthly memberships by 40% within your first 60 days.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    text: 'Join thousands of salons using BloomSwift to grow their business.',
    actions: [{ label: 'Get Started', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
};

const Salon = () => <IndustryPage data={data} />;

export default Salon;
