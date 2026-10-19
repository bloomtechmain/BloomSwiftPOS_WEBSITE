import React from 'react';
import {
  MessageCircle, Smartphone, Clock, RefreshCw, Utensils, WifiOff, Server, TrendingUp, Package, BarChart3, ShieldCheck, CreditCard, Layers,
} from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Bakery POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Bakery' }],
  hero: {
    title: 'Bakery POS system for a smooth baking',
    text: "Sieve through your business data and bake the next batch better with Bloom Swift POS's advanced stock-control system, speedy checkout software, and real-time reports.",
    image: { src: '/images/bakery/bread-shelves.webp', alt: 'Bakery Display' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
  quick: {
    items: [
      { icon: ShieldCheck, title: 'Safer Sales', desc: 'Automatically prompt staff for allergen checks on specific items, so you can stay compliant without slowing down service.' },
      { icon: CreditCard, title: 'Customer Convenience', desc: 'Create customer profiles and let your guests enjoy service-first experiences by settling up later with house accounts.' },
      { icon: Layers, title: 'Efficient Trade', desc: 'Monitor ingredient usage down to the gram to stay stocked on your most in-demand pastries and breads.' },
    ],
  },
  sections: [
    {
      eyebrow: 'MARKET-LEADING POS',
      title: 'Maximize your bakery’s potential with a market-leading POS',
      text: [
        "Don't let outdated tech hold your bakery back. Whether you're a boutique shop or a high-volume wholesaler, Bloom Swift POS provides a scalable POS solution designed to grow with you.",
        'Harness powerful features like custom-branded loyalty programs and real-time analytics to track your top-selling treats and customer trends. From deep-dive sales reports to instant performance tracking, Bloom Swift POS simplifies the complexities of hospitality management.',
      ],
      image: { src: '/images/bakery/display-case.webp', alt: 'Bakery POS' },
    },
    {
      eyebrow: 'SCALABLE SOLUTION',
      title: 'The perfect ingredients for your Point of Sale',
      text: [
        "Don't let outdated tech hold your bakery back. Whether you're a boutique shop or a high-volume wholesaler, Bloom Swift POS provides a scalable POS solution designed to grow with you.",
        'Our core system includes everything you need to get started—a sleek terminal and high-speed printer—but our award-winning add-ons truly set us apart. From seamless payment processing to interactive customer displays, we give you the tools to craft the exact experience your bakery needs.',
      ],
      image: { src: '/images/bakery/cakes-shelf.webp', alt: 'Payment Solutions' },
    },
    {
      eyebrow: 'CUSTOMER LOYALTY',
      title: 'Drive repeat business with streamlined customer management',
      text: ['Loyalty is the key to a sustainable bakery. With integrated payment solution, you can manage customer relationships with ease and precision. Our complete solution empowers you to:'],
      points: [
        { title: 'Understand Buying Habits', desc: 'Track preferences to personalize the guest experience.' },
        { title: 'Reward Loyalty', desc: 'Design unique schemes that keep your brand top-of-mind.' },
        { title: 'Targeted Outreach', desc: 'Send time-sensitive marketing messages that drive foot traffic.' },
        { title: 'Build Profiles', desc: 'Store essential customer data in one centralized, easy-to-access location.' },
      ],
      image: { src: '/images/bakery/counter.webp', alt: 'Customer Loyalty' },
    },
  ],
  band: { src: '/images/cafe/steam-cup.webp', alt: 'Freshly poured coffee on a bakery counter' },
  summary: {
    title: 'Master your data with high-level bakery analytics',
    text: 'Gain a competitive edge by turning raw data into actionable insights. Our payment system automatically syncs analytics from every corner of your bakery, generating comprehensive reports that provide a crystal-clear view of your performance.',
    items: [
      { icon: BarChart3, title: 'Custom Dashboards', desc: 'Track personalized goals and KPIs at a glance.' },
      { icon: Package, title: 'Omnichannel Inventory', desc: 'Manage stock seamlessly across all sales channels.' },
      { icon: TrendingUp, title: 'Performance Metrics', desc: 'Evaluate employee productivity and identify your highest-margin products.' },
      { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Connect with customers on their preferred platform.' },
      { icon: Smartphone, title: 'Email Notifications', desc: 'Stay updated with automated alerts.' },
      { icon: Clock, title: 'Hourly Throughput', desc: 'Identify your peak morning rushes and weekend surges to optimize your baking schedule and front-of-house staffing.' },
      { icon: RefreshCw, title: 'Churn Rates', desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while." },
      { icon: Utensils, title: 'Inventory & Ingredient Integration', desc: 'Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pastry.' },
      { icon: WifiOff, title: 'Offline Mode', desc: "Keep the oven-to-counter flow moving; your bakery keeps taking payments and processing orders even if the internet goes down." },
      { icon: Server, title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that start pre-dawn and stay busy through the weekends.' },
      { icon: TrendingUp, title: 'Success Metrics', desc: 'Set and hit clear growth targets, such as increasing your monthly bread subscription members by 40% within your first 60 days.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    text: 'Join thousands of bakeries using BloomSwift to grow their business.',
    actions: [{ label: 'Get in touch', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
};

const Bakery = () => <IndustryPage data={data} />;

export default Bakery;
