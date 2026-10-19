import React from 'react';
import { Gauge, Repeat, Award } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Cafe POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Cafe' }],
  hero: {
    title: 'A cafe POS designed for speed, not stress.',
    text: 'Get new staff up to speed in just 15 minutes. Our intuitive system eliminates technical headaches and service delays, so you can focus on the perfect pour and smooth sales.',
    image: { src: '/images/cafe/interior.webp', alt: 'Cafe atmosphere' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: Gauge, title: 'Streamlined Operations', desc: 'Manage every promotion from a centralized payment system to attract and retain your coffee community.' },
      { icon: Repeat, title: 'One-Tap Service', desc: 'Instantly toggle between eat-in and takeaway pricing to ensure speed and order accuracy.' },
      { icon: Award, title: 'Automated Customer Loyalty', desc: 'Turn regulars into VIPs with our automated loyalty system—automatically tracking visits and purchases to boost your bottom line.' },
    ],
  },
  sections: [
    {
      title: 'Maximum Speed, Minimal Friction',
      text: ['Keep the morning rush moving with an intuitive interface designed for rapid order processing.'],
      points: [
        { title: 'One-Touch Precision', desc: 'Simplify complex orders and streamline every transaction with a single tap.' },
        { title: 'Visual Drink Guides', desc: 'Ensure consistency by storing high-res recipes and photos directly on the touchscreen for your baristas.' },
        { title: 'Synchronized Service', desc: 'Connect your front-of-house to the kitchen via a dedicated display screen to eliminate errors.' },
        { title: 'Queue-Busting Performance', desc: 'Slash wait times and keep sales flowing, even during your busiest peak hours.' },
      ],
      image: { src: '/images/cafe/pos-tablet.webp', alt: 'Cafe POS System' },
    },
    {
      title: 'Master Your Inventory with Total Precision',
      text: ['Take the guesswork out of your stockroom with a system designed for high-volume coffee shops.'],
      points: [
        { title: 'Real-Time Depletion', desc: 'Every latte or pastry sold is instantly deducted from your master stock levels for a perfect count.' },
        { title: 'Waste Reduction', desc: 'Protect your margins by identifying slow-moving items and avoiding unnecessary overspending.' },
        { title: 'Multi-Location Control', desc: 'Manage and monitor stock levels across all your cafe locations from a single, unified device.' },
        { title: 'Smart Replenishment', desc: 'Eliminate the risk of running out of essentials with automated reordering that keeps you fully stocked.' },
      ],
      image: { src: '/images/cafe/lattes.webp', alt: 'Cafe Inventory' },
    },
    {
      title: 'Complete Control, Anytime, Anywhere',
      text: ['Harness the power of the cloud to oversee your business operations without being tied to the counter.'],
      points: [
        { title: 'Remote Oversight', desc: 'Securely monitor your cafe’s performance from home, another branch, or while traveling.' },
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
        { title: 'Exclusive Member Perks', desc: 'Drive engagement with member-only happy hours and specialized cafe experiences.' },
        { title: 'Feedback Loops', desc: 'Enhance service quality and your online reputation by integrating digital receipts with automated customer surveys.' },
      ],
      image: { src: '/images/bar/brick-room.webp', alt: 'Happy Loyal Customers' },
    },
    {
      title: 'Unified Cafe Management',
      points: [
        { title: 'Centralized Marketing', desc: 'Manage every promotion through a single payment system to attract—and retain—your local coffee community.' },
        { title: 'Seamless Dynamic Pricing', desc: 'Instantly toggle between eat-in and takeaway rates to ensure speed and billing accuracy.' },
        { title: 'Automated Growth', desc: 'Turn regulars into VIPs with automated tracking of visits and purchases through integrated loyalty features.' },
      ],
      image: { src: '/images/cafe/garden.webp', alt: 'Unified Management' },
    },
  ],
  band: { src: '/images/cafe/latte-cheers.webp', alt: 'Two lattes raised together over a cafe table' },
  summary: {
    title: 'Master your data with high-level cafe analytics',
    text: 'Gain a competitive edge by turning raw data into actionable insights.',
    items: [
      { title: 'WhatsApp Integration', desc: 'Connect with customers directly.' },
      { title: 'Email Notifications', desc: 'Stay updated with automated alerts.' },
      { title: 'Hourly Throughput', desc: 'Identify your peak morning rushes and weekend surges to optimize your schedule and staffing.' },
      { title: 'Churn Rates', desc: 'Monitor your loyalty program health by tracking how many regulars are staying active.' },
      { title: 'Inventory & Ingredient Integration', desc: 'Master your margins by syncing POS sales data with ingredient usage to monitor your exact costs.' },
      { title: 'Offline Mode', desc: 'Keep the flow moving; your cafe keeps taking payments even if the internet goes down.' },
      { title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that start early.' },
      { title: 'Success Metrics', desc: 'Set and hit clear growth targets.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    actions: [{ label: 'Get in touch', request: true }],
  },
};

const Cafe = () => <IndustryPage data={data} />;

export default Cafe;
