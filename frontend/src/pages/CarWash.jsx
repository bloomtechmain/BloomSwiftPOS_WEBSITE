import React from 'react';
import { Gauge, Repeat, Award } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Car Wash POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Car Wash' }],
  hero: {
    title: 'A car wash POS designed for speed, not stress.',
    text: 'Get new staff up to speed in just 15 minutes. Our intuitive system eliminates technical headaches and service delays, so you can focus on the perfect shine and smooth sales.',
    image: { src: '/images/carwash/clean-car.webp', alt: 'Man washing car manually' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: Gauge, title: 'Streamlined Operations', desc: 'Manage every promotion from a centralized payment system to attract and retain your local community.' },
      { icon: Repeat, title: 'One-Tap Service', desc: 'Instantly toggle between basic and premium packages to ensure speed and order accuracy.' },
      { icon: Award, title: 'Automated Customer Loyalty', desc: 'Turn regulars into VIPs with our automated loyalty system—automatically tracking visits and purchases to boost your bottom line.' },
    ],
  },
  sections: [
    {
      title: 'Maximum Speed, Minimal Friction',
      text: ['Keep the weekend rush moving with an intuitive interface designed for rapid order processing.'],
      points: [
        { title: 'One-Touch Precision', desc: 'Simplify complex orders and streamline every transaction with a single tap.' },
        { title: 'Visual Service Guides', desc: 'Ensure consistency by storing service checklists and photos directly on the touchscreen for your team.' },
        { title: 'Synchronized Service', desc: 'Connect your front-of-house to the wash bay via a dedicated display screen to eliminate errors.' },
        { title: 'Queue-Busting Performance', desc: 'Slash wait times and keep sales flowing, even during your busiest peak hours.' },
      ],
      image: { src: '/images/garage/service-sign.webp', alt: 'Car Wash POS System' },
    },
    {
      title: 'Master Your Inventory with Total Precision',
      text: ['Take the guesswork out of your stockroom with a system designed for high-volume car washes.'],
      points: [
        { title: 'Real-Time Depletion', desc: 'Every wash or wax sold is instantly deducted from your master stock levels for a perfect count.' },
        { title: 'Waste Reduction', desc: 'Protect your margins by identifying slow-moving products and avoiding unnecessary overspending.' },
        { title: 'Multi-Location Control', desc: 'Manage and monitor stock levels across all your car wash locations from a single, unified device.' },
        { title: 'Smart Replenishment', desc: 'Eliminate the risk of running out of essentials with automated reordering that keeps you fully stocked.' },
      ],
      image: { src: '/images/general/warehouse.webp', alt: 'Car Wash Inventory' },
    },
    {
      title: 'Complete Control, Anytime, Anywhere',
      text: ['Harness the power of the cloud to oversee your business operations without being tied to the counter.'],
      points: [
        { title: 'Remote Oversight', desc: 'Securely monitor your car wash’s performance from home, another branch, or while traveling.' },
        { title: 'Advanced Security', desc: 'Maintain strict access control by assigning unique PINs for every team member.' },
        { title: 'Performance Tracking', desc: 'Gain full visibility into customer service by tracking which staff members handle specific transactions.' },
        { title: 'Integrated Time-Tracking', desc: 'Ensure payroll precision with a built-in clock-in/out system for all employees.' },
        { title: 'Instant Menu Agility', desc: 'Refresh your offerings or adjust pricing across your system with just a few taps.' },
      ],
      image: { src: '/images/general/office-presentation.webp', alt: 'Business Control' },
    },
    {
      title: 'Cultivate Loyalty and Drive Repeat Business',
      text: ['Retaining a guest is five times more cost-effective than acquiring a new one. Prioritize satisfaction and value to turn first-time visitors into lifelong regulars.'],
      points: [
        { title: 'Custom Reward Programs', desc: 'Build a tailored loyalty scheme that incentivizes frequent visits and rewards your best customers.' },
        { title: 'Multi-Channel Outreach', desc: 'Reach your audience instantly with targeted discounts and time-sensitive offers via SMS, email, and push notifications.' },
        { title: 'Exclusive Member Perks', desc: 'Drive engagement with member-only wash clubs and specialized experiences.' },
        { title: 'Feedback Loops', desc: 'Enhance service quality and your online reputation by integrating digital receipts with automated customer surveys.' },
      ],
      image: { src: '/images/carwash/red-car.webp', alt: 'Happy Loyal Customers' },
    },
    {
      title: 'Unified Car Wash Management',
      points: [
        { title: 'Centralized Marketing', desc: 'Manage every promotion through a single payment system to attract—and retain—your local community.' },
        { title: 'Seamless Dynamic Pricing', desc: 'Instantly toggle between service rates to ensure speed and billing accuracy.' },
        { title: 'Automated Growth', desc: 'Turn regulars into VIPs with automated tracking of visits and purchases through integrated loyalty features.' },
      ],
      image: { src: '/images/general/paperwork.webp', alt: 'Unified Management' },
    },
  ],
  band: { src: '/images/carwash/washing.webp', alt: 'Automatic car wash brushes' },
  summary: {
    title: 'Master your data with high-level car wash analytics',
    text: 'Gain a competitive edge by turning raw data into actionable insights.',
    items: [
      { title: 'WhatsApp Integration', desc: 'Connect with customers directly.' },
      { title: 'Email Notifications', desc: 'Stay updated with automated alerts.' },
      { title: 'Hourly Throughput', desc: 'Identify your peak morning rushes and weekend surges to optimize your wash schedule and staffing.' },
      { title: 'Churn Rates', desc: 'Monitor your loyalty program health by tracking how many regulars are staying active.' },
      { title: 'Inventory & Ingredient Integration', desc: 'Master your margins by syncing POS sales data with chemical usage to monitor your exact cost-per-wash.' },
      { title: 'Offline Mode', desc: 'Keep the flow moving; your car wash keeps taking payments even if the internet goes down.' },
      { title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that start early.' },
      { title: 'Success Metrics', desc: 'Set and hit clear growth targets.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    actions: [{ label: 'Get in touch', request: true }],
  },
};

const CarWash = () => <IndustryPage data={data} />;

export default CarWash;
