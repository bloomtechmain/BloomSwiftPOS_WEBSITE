import React from 'react';
import { Clock, Store, CreditCard } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Retail POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Retail' }],
  hero: {
    title: 'Bloom Swift POS: The Ultimate Retail Command Center',
    sub: 'Accelerate Your Growth',
    text: 'Experience a retail POS that works as fast as you do. Take full control of your storefront with professional inventory tools and comprehensive employee oversight—all integrated into one lightning-fast interface.',
    image: { src: '/images/retail/mall.webp', alt: 'Retail Background' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Contact Sales', to: '/support-centre' }],
  },
  quick: {
    title: 'Efficiency at a Glance',
    items: [
      { icon: Clock, title: 'Reclaim Your Time', desc: 'Save up to 10 hours every month by automating business management and staff administration tasks.' },
      { icon: Store, title: 'Modern Commerce', desc: 'With 81% of shoppers researching products online, our system helps you showcase your inventory digitally to stay ahead of the curve.' },
      { icon: CreditCard, title: 'Rapid Transactions', desc: 'Enhance your customer experience and save over 4 hours per month with seamless, integrated payment solutions.' },
    ],
  },
  sections: [
    {
      eyebrow: 'INVENTORY CONTROL',
      title: 'Intelligent Inventory Management',
      text: ["Real-time control for fast-moving retail environments. Managing a diverse product catalog shouldn't be a headache. Our intelligent system provides minute-by-minute updates so your team is always informed."],
      points: [
        { title: 'Never Miss a Sale', desc: 'Stay stocked with automated low-stock alerts and smart purchase orders.' },
        { title: 'Effortless Catalog Updates', desc: 'Modify stock levels across your entire store in just a few clicks.' },
        { title: 'Precision Labeling', desc: 'Generate custom barcodes for faster checkout scanning and improved data accuracy.' },
        { title: 'Remote Visibility', desc: 'Monitor live inventory levels from any device, anywhere, at any time.' },
      ],
      image: { src: '/images/retail/aisle.webp', alt: 'Intelligent Inventory Management' },
    },
    {
      eyebrow: 'SMART ANALYTICS',
      title: 'Data-Driven Decisions',
      text: ['Smart software designed to scale your business. Take the guesswork out of retail. Our advanced payment solution collects "smart data" to help you make informed, profitable decisions.'],
      points: [
        { title: 'Spot Winning Products', desc: 'Utilize advanced reporting to identify exactly which items are driving your revenue.' },
        { title: 'Instant Intelligence', desc: 'Get a complete pulse check on your daily operations at the tap of a button.' },
        { title: 'Forecast with Precision', desc: 'Use historical performance data to plan inventory and staffing for the months ahead.' },
      ],
      image: { src: '/images/general/data-laptop.webp', alt: 'Data-Driven Decisions' },
    },
    {
      eyebrow: 'SECURITY FIRST',
      title: 'Enterprise-Grade Security',
      text: ['Fortify your store and protect your bottom line. Our cloud-based system ensures every cent is accounted for, from advanced data encryption to granular staff controls.'],
      points: [
        { title: 'Custom Permissions', desc: 'Control sensitive actions like refunds, voids, and discounts by setting specific access levels for your staff.' },
        { title: 'Secure Authentication', desc: 'Maintain a clear audit trail with individual passcodes or swipe-card logins for every shift.' },
        { title: 'Encrypted Cloud Access', desc: 'Securely monitor your financial health from any device in the world.' },
      ],
      image: { src: '/images/general/tap-to-pay.webp', alt: 'Enterprise-Grade Security' },
    },
    {
      eyebrow: 'PROFIT OPTIMIZATION',
      title: 'Maximize Your Margins',
      text: ['Turn potential loss into pure profit. Eliminate the drain of shrinkage and inventory errors. Our sophisticated tracking tools help you minimize losses and maximize your bottom line.'],
      points: [
        { title: 'Total Visibility', desc: 'Know your exact stock levels in seconds.' },
        { title: 'Granular Precision', desc: 'Track every single item down to the smallest unit with advanced controls.' },
        { title: 'Real-Time Syncing', desc: 'Eliminate human error with stock levels that update automatically with every transaction.' },
      ],
      image: { src: '/images/general/touchscreen-till.webp', alt: 'Maximize Your Margins' },
    },
    {
      eyebrow: 'ALWAYS CONNECTED',
      title: 'Advanced Connectivity & Support',
      text: ['Stay operational and informed with enterprise-level features designed for modern retail.'],
      points: [
        { title: 'Offline Mode', desc: 'Keep the sales moving even if the internet goes down; our system continues to process orders without interruption.' },
        { title: 'Hourly Throughput', desc: 'Identify peak shopping hours to optimize your staffing and floor coverage.' },
        { title: '24/7 Expert Support', desc: 'Get help whenever you need it—essential for retail businesses that operate early mornings through late weekends.' },
      ],
      image: { src: '/images/general/pos-terminal.webp', alt: 'Advanced Connectivity & Support' },
    },
  ],
  band: { src: '/images/grocery/cart.webp', alt: 'Retail POS System' },
  cta: {
    title: 'Ready to transform your retail business?',
    text: 'Join thousands of retailers using Bloom Swift POS to accelerate their growth and maximize profits.',
    actions: [{ label: 'Contact Bloom Tech Today', request: true }, { label: 'Talk to Sales', to: '/support-centre' }],
  },
};

const RetailPOS = () => <IndustryPage data={data} />;

export default RetailPOS;
