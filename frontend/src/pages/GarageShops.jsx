import React from 'react';
import { MessageCircle, Clock, Users, Settings, Activity, TrendingUp, Zap } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Garage Shops POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Garage Shops' }],
  hero: {
    title: 'Maximize Shop Output, Not Your Workload.',
    text: 'Stop juggling administrative paperwork and start focusing on the vehicles in your bays. Our integrated Garage POS automates your shop operations, bringing every work order, inventory check, and payment into one seamless platform so you can deliver expert-level service without the stress.',
    image: { src: '/images/garage/hands.webp', alt: 'Mechanic working on car engine' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: Clock, title: 'Rapid Service Turnaround', desc: 'Our POS and payment terminal integration can save you over 4 hours per month during invoice processing and customer checkout.' },
      { icon: Users, title: 'Customer Retention Program', desc: 'Keep your clients coming back by offering tailor-made maintenance promotions specific to their vehicle history.' },
      { icon: Settings, title: 'Easy Shop Automation', desc: 'Save up to 10 hours every month on parts management, work orders, and staff administrative tasks.' },
    ],
  },
  sections: [
    {
      eyebrow: 'EFFICIENCY',
      title: 'Engineered for the Modern Garage',
      text: ['Drive customer loyalty and peak performance with a POS engineered for the modern mechanics shop. From the service bay to the front desk, we provide the tools to keep your shop running smoothly and engines purring.'],
      points: [
        { title: 'Precision Inventory Tracking', desc: 'Monitor your stock in real-time, from high-value parts down to the milliliter of specialized fluids and oils.' },
        { title: 'Custom Service Programs', desc: 'Turn one-time repairs into "Lifetime Maintenance" regulars with automated service reminders and membership perks.' },
        { title: 'Seamless Ecosystem', desc: 'Connect effortlessly with your favorite diagnostic tools and thirdparty apps to centralize your entire shop workflow.' },
        { title: 'Cloud-Powered Freedom', desc: "Manage your garage, view diagnostic reports, and update labor rates from any device, whether you're under a hood or on the go." },
        { title: 'The Total Package', desc: 'Our comprehensive solution arrives ready for the shop floor, featuring professional-grade software, a high-speed terminal, an integrated receipt printer, and a secure payment interface.' },
      ],
      image: { src: '/images/garage/workshop.webp', alt: 'Modern Garage Engineering' },
    },
    {
      eyebrow: 'TRUST',
      title: 'Cultivate Lasting Client Trust',
      text: ['Today’s vehicle owners look for a frictionless, transparent, and personalized experience every time they book a service. Demonstrate your commitment to excellence by using a POS system designed to put the driver first.'],
      points: [
        { title: 'Launch Dynamic Loyalty Programs', desc: 'Drive repeat business by rewarding frequent clients with automated discounts on oil changes or complimentary vehicle inspections.' },
        { title: 'Actionable Customer Insights', desc: 'Build comprehensive vehicle profiles to track service history and preferences, allowing you to tailor every repair recommendation.' },
        { title: 'Precision Marketing', desc: 'Sync with email platforms to deliver service reminders at the right time (like 3,000-mile alerts), turning quiet days into busy ones.' },
        { title: 'Multi-Location Fluidity', desc: 'Provide a consistent brand experience by allowing customers to earn and redeem service rewards at any of your garage locations.' },
      ],
      image: { src: '/images/garage/mechanic.webp', alt: 'Client Trust' },
    },
    {
      eyebrow: 'ANALYTICS',
      title: 'Master Your Shop with Data-Driven Insights',
      text: ["In the automotive repair industry, the difference between growth and stagnation is found in the data. Leverage powerful reporting tools to transform raw numbers into a clear roadmap for your garage's future."],
      points: [
        { title: 'Instant Financial Clarity', desc: 'Generate comprehensive reports on parts margins, labor revenue, and overall profitability in seconds.' },
        { title: 'Real-Time Performance Dashboards', desc: 'Monitor high-level KPIs and shop trends through an intuitive interface designed for quick decision-making.' },
        { title: 'Identify Profit Drivers', desc: 'Pinpoint exactly which service packages and parts add-ons are fueling your growth to optimize your service menu for maximum ROI.' },
        { title: 'Optimize Your Workforce', desc: 'Use performance metrics to identify your most efficient technicians, allowing you to reward excellence and refine your shop training.' },
      ],
      image: { src: '/images/garage/wrench.webp', alt: 'Data Insights' },
    },
  ],
  band: { src: '/images/garage/engine.webp', alt: 'Garage workshop interior' },
  summary: {
    title: 'Shop Performance Summary',
    cols: 3,
    items: [
      { icon: Activity, title: 'Bay Throughput', desc: 'See exactly when the shop is busiest to optimize technician scheduling.' },
      { icon: Users, title: 'Retention Rates', desc: 'Track how many customers are returning for scheduled maintenance vs. one-off repairs.' },
      { icon: Settings, title: 'Consumables Integration', desc: 'Monitor your cost-per-repair by syncing POS data with fluid and parts usage.' },
      { icon: Zap, title: 'Offline Mode', desc: 'The shop keeps running and invoices can still be processed even if the internet goes down.' },
      { icon: MessageCircle, title: '24/7 Support', desc: 'Crucial for a business that handles emergency repairs and weekend pickups.' },
      { icon: TrendingUp, title: 'Success Metrics', desc: 'Increase recurring service appointments by 40% in the first 60 days.' },
    ],
  },
};

const GarageShops = () => <IndustryPage data={data} />;

export default GarageShops;
