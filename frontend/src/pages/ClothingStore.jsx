import React from 'react';
import { MessageCircle, Mail, Lock, RotateCcw, Shirt } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Clothing Store POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Clothing Store' }],
  hero: {
    title: 'The perfect fit for your fashion business.',
    text: 'Bloom Swift POS automates your inventory and powers lightning-fast sales, making it easier than ever to manage your shop and impress your style-conscious clientele.',
    image: { src: '/images/clothing/shop.webp', alt: 'Woman shopping for clothes' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: Lock, title: 'Secure Permissions', desc: 'Automatically prompt staff for manager approval on refunds or discounts, so you can stay secure without slowing down service.' },
      { icon: RotateCcw, title: 'Seamless Returns', desc: 'Create customer profiles and let your guests enjoy service-first experiences by handling exchanges and returns instantly.' },
      { icon: Shirt, title: 'Smart Inventory', desc: 'Monitor stock levels down to the size and color to stay stocked on your most in-demand trends and seasonal favorites.' },
    ],
  },
  sections: [
    {
      title: 'Take the stress out of stock management',
      text: ['Keep your shelves stocked with seasonal favorites your customers love:'],
      points: [
        { title: 'Reclaim Your Time', desc: 'Spend less time counting boxes and more time selling with lightning-fast stocktakes.' },
        { title: 'Data-Driven Buying', desc: 'Use item-level tracking to know exactly what will sell next season.' },
        { title: 'Low-Stock Protection', desc: 'Stay one step ahead with instant notifications before you run out of bestsellers.' },
        { title: 'Continuous Selling', desc: 'Automatically generate purchase orders so you never have to say "out of stock" again.' },
      ],
      image: { src: '/images/clothing/checkout.webp', alt: 'Stock Management' },
    },
    {
      title: 'Leverage data to stay in style with your customers',
      text: ['Knowing what your customers love is the key to repeat business. Use dedicated retail insights to make loyalty feel effortless:'],
      points: [
        { title: 'Instant Profiling', desc: 'Seamlessly add new customers to your database during the sale.' },
        { title: 'Data-Driven Marketing', desc: 'Design high-impact campaigns based on real shopper behavior.' },
        { title: 'Strategic Incentives', desc: 'Build custom loyalty schemes and seasonal promotions in a few clicks.' },
        { title: 'Professional Branding', desc: "Boost your brand's image with reusable loyalty cards and easy-to-manage store credit." },
      ],
      image: { src: '/images/clothing/shopper.webp', alt: 'Fashion Loyalty' },
    },
    {
      title: 'Scale your style with real-time retail intelligence',
      text: ['Stay ahead of the trend cycle with powerful analytics that reveal exactly what your customers are craving.'],
      points: [
        { title: 'Live Trend Tracking', desc: 'Monitor sales and shopper behavior as it happens.' },
        { title: 'Cloud-Powered Freedom', desc: 'Access your business data securely from any device, anywhere in the world.' },
        { title: 'Remote Management', desc: "Stay connected to your shop’s performance via mobile or tablet while you're on the move." },
        { title: 'Stress-Free Accounting', desc: 'Sync seamlessly with Xero, Sage, or QuickBooks to automate your bookkeeping.' },
      ],
      image: { src: '/images/general/data-laptop.webp', alt: 'Retail Analytics' },
    },
  ],
  band: { src: '/images/clothing/rails.webp', alt: 'Clothing store interior' },
  summary: {
    title: 'Master your data with high-level retail analytics',
    text: 'Gain a competitive edge by turning raw data into actionable insights.',
    items: [
      { icon: MessageCircle, title: 'WhatsApp Integration', desc: "Send digital receipts and marketing updates directly to your customers' favorite app." },
      { icon: Mail, title: 'Email Notifications', desc: 'Automate purchase confirmations and low-stock alerts to keep everything running smoothly.' },
      { title: 'Peak Shopping Hours', desc: 'Identify your peak weekend rushes and lunch hour surges to optimize your floor staffing.' },
      { title: 'Loyalty Health', desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while." },
      { title: 'Profit Margin Tracking', desc: 'Master your margins by syncing POS sales data with purchase costs to monitor your exact profit-per-item.' },
      { title: 'Offline Reliability', desc: 'Keep the checkout moving; your store keeps taking payments and processing orders even if the internet goes down.' },
      { title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that stay open late and through the weekends.' },
      { title: 'Growth Targets', desc: 'Set and hit clear growth targets, such as increasing your monthly loyalty sign-ups by 40% within your first 60 days.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    text: 'Join thousands of retailers growing their business with Bloom Swift POS.',
    actions: [{ label: 'Get Started Now', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
};

const ClothingStore = () => <IndustryPage data={data} />;

export default ClothingStore;
