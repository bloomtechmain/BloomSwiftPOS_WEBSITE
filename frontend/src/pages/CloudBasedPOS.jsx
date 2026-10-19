import React from 'react';
import { MessageCircle, Mail, CheckCircle, Server, BarChart3, Lock, WifiOff, RefreshCw, Star } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';
import { CloudPlans } from '../Components/PricingBlocks';

const data = {
  service: 'Cloud Based POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Cloud Based POS' }],
  hero: {
    title: 'Break free from the counter with a powerful cloud-based system.',
    text: 'Manage sales, track inventory, and serve customers from any device, anywhere in the world. Our system goes wherever your business takes you.',
    image: { src: '/images/general/pos-stand.webp', alt: 'Cloud POS Tablet' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: RefreshCw, title: 'Real-Time Access', desc: 'Manage your entire business from any device with a live dashboard that syncs your sales and inventory instantly.' },
      { icon: Server, title: 'Seamless Scalability', desc: 'Easily add new locations, registers, or users as your business grows without the need for complex hardware installations.' },
      { icon: Lock, title: 'Secure Data Backups', desc: 'Protect your business information with automatic cloud encryption that ensures your records are always safe and recoverable.' },
    ],
  },
  sections: [
    {
      title: 'Freedom from traditional hardware barriers.',
      text: ['Our cloud-based POS system removes the traditional barriers of hardware, allowing you to manage every aspect of your business from any device, anywhere. By leveraging the power of the cloud, you gain a scalable solution that evolves alongside your storefront while keeping your data synchronized in real time.'],
      points: [
        { title: 'Work From Anywhere', desc: 'Access your management dashboard and sales reports from your phone, tablet, or laptop, whether you are at home or on the go.' },
        { title: 'Scale in Seconds', desc: 'Instantly add new branch locations or extra checkout terminals during peak seasons without the need for expensive on-site server setups.' },
        { title: 'Hardware Independence', desc: 'Run your business on the devices you already own, from iPads to desktop browsers, ensuring a setup that fits your specific space.' },
        { title: 'Automatic Updates', desc: 'Enjoy the latest features and security enhancements delivered through the cloud, ensuring your system never becomes outdated.' },
      ],
      image: { src: '/images/general/laptop-workspace.webp', alt: 'Work From Anywhere' },
    },
    {
      title: 'Designed to be hardware-agnostic.',
      text: ['Our platform gives you the freedom to choose the physical setup that best matches your budget and operational needs. Whether you want to leverage your current devices or upgrade to a professional suite, we provide the path that works for you.'],
      points: [
        { title: 'Bring Your Own Device', desc: 'Save on initial costs by running our software on the hardware you already own, including existing tablets, laptops, or smartphones.' },
        { title: 'Premium Hardware Purchases', desc: 'Invest in your future with high-performance, industry-standard equipment designed for durability and high-volume transactions.' },
        { title: 'Flexible Rental Plans', desc: 'Keep your capital liquid with affordable rental options that allow you to use professional-grade registers and scanners without a large upfront investment.' },
        { title: 'Plug-and-Play Integration', desc: 'Easily connect essential peripherals like receipt printers, barcode scanners, and card readers for a fully customized checkout experience.' },
      ],
      image: { src: '/images/general/handheld-card-reader.webp', alt: 'Hardware Options' },
    },
    {
      title: 'Maximize Profitability with Precision Stock Control.',
      text: ['Stop losing hours to manual spreadsheets. Our intelligent inventory software gives you total control over your margins in just minutes a day.'],
      points: [
        { title: 'Granular Ingredient Tracking', desc: 'Manage your stock at the ingredient level for hyper-accurate food costing and waste reduction.' },
        { title: 'Proactive Reordering', desc: 'Stay ahead of the rush with automated purchase orders and low-stock alerts that ensure you never 86 a best-seller.' },
        { title: 'Bottom-Line Protection', desc: 'Prevent shrinkage and over-portioning with airtight stock oversight that turns data into profit.' },
        { title: 'Multi-Site Oversight', desc: 'Effortlessly sync and monitor inventory levels across every location from a single, centralized dashboard.' },
      ],
      image: { src: '/images/general/warehouse.webp', alt: 'Stock Control' },
    },
    {
      title: 'Transform Data into Growth with Intelligent Insights.',
      text: ['Turn your sales history into a roadmap for profit. Use advanced analytics to refine your menu and master your margins.'],
      points: [
        { title: 'Custom Performance Dashboards', desc: 'Visualize your success with tailored reports that highlight key trends at a glance.' },
        { title: 'Menu Engineering', desc: 'Identify your "stars" and "dogs" by tracking exactly which dishes drive revenue and which are taking up space.' },
        { title: 'Margin Optimization', desc: 'Analyze individual dish performance to adjust pricing or ingredients for maximum profitability.' },
        { title: 'Waste & Variance Analysis', desc: 'Compare actual vs. expected stock levels to pinpoint discrepancies and plan for high-volume periods.' },
        { title: 'Seamless Accounting', desc: 'Bridge the gap between front-of-house and finance with instant sync for Sage, Xero, and QuickBooks.' },
      ],
      image: { src: '/images/general/data-laptop.webp', alt: 'Data Insights' },
    },
  ],
  band: { src: '/images/general/coworking-desk.webp', alt: 'Remote Management' },
  summary: {
    title: 'Everything you need in one package',
    items: [
      { icon: MessageCircle, title: 'WhatsApp Integration', desc: "Send digital receipts and marketing updates directly to your customers' favorite app." },
      { icon: Mail, title: 'Email Notifications', desc: 'Automate purchase confirmations and low-stock alerts to keep everything running smoothly.' },
      { icon: BarChart3, title: 'Hourly Throughput', desc: 'Identify your peak morning rushes and weekend surges to optimize your baking schedule and front-of-house staffing.' },
      { icon: RefreshCw, title: 'Churn Rates', desc: "Monitor your loyalty program health by tracking how many regulars are staying active versus those who haven't visited in a while." },
      { icon: Server, title: 'Inventory & Ingredient Integration', desc: 'Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pastry.' },
      { icon: WifiOff, title: 'Offline Mode', desc: 'Keep the oven-to-counter flow moving; your bakery keeps taking payments and processing orders even if the internet goes down.' },
      { icon: CheckCircle, title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that start pre-dawn and stay busy through the weekends.' },
      { icon: Star, title: 'Success Metrics', desc: 'Set and hit clear growth targets, such as increasing your monthly bread subscription members by 40% within your first 60 days.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    text: 'Join thousands of businesses growing with Bloom Swift POS.',
    actions: [{ label: 'Get Started Now', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
};

const CloudBasedPOS = () => (
  <IndustryPage data={data}>
    <CloudPlans />
  </IndustryPage>
);

export default CloudBasedPOS;
