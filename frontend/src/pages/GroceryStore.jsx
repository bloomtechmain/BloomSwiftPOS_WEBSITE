import React from 'react';
import {
  MessageCircle, Mail, CheckCircle, Clock, TrendingUp, Zap, BarChart3, WifiOff, RefreshCw, Server, Star,
} from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Grocery Store POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Grocery Store' }],
  hero: {
    title: 'Accelerate your checkout.',
    text: 'Experience a convenience store POS that works as fast as you do. Take full control of your store with professional inventory tools and employee oversight—all in one lightning-fast interface.',
    image: { src: '/images/grocery/produce.webp', alt: 'Grocery Shopping' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Talk to sales', to: '/support-centre' }],
  },
  quick: {
    items: [
      { icon: Clock, title: 'Save time', desc: 'Save up to 10 hours every month on business management and staff admin.' },
      { icon: TrendingUp, title: 'Efficient business', desc: '81% of shoppers research products online. Showcase your inventory online with be ahead of the curve' },
      { icon: Zap, title: 'Quick transactions', desc: 'Put a gloss onto your day. Save over 4 hours per month with integrated payment solutions.' },
    ],
  },
  sections: [
    {
      title: 'Real-time inventory control for fast-moving grocery environments.',
      text: ["Managing a diverse catalog shouldn't be a headache. Our intelligent POS provides minute-by-minute updates so your team is always in the loop."],
      points: [
        { title: 'Never Miss a Sale', desc: 'Automated low-stock alerts and smart purchase orders keep your shelves full.' },
        { title: 'Effortless Updates', desc: 'Modify stock levels across your entire catalog in just a few clicks.' },
        { title: 'Precision Labeling', desc: 'Generate custom barcodes for faster scanning and improved data accuracy.' },
        { title: 'Remote Visibility', desc: 'Monitor your live inventory levels from anywhere, at any time.' },
      ],
      image: { src: '/images/grocery/forklift-aisle.webp', alt: 'Real-time inventory' },
    },
    {
      title: 'Smart POS software designed to scale your grocery business.',
      text: ['Take the guesswork out of retail. Our advanced payment solution doesn\'t just process sales—it collects the "smart data" you need to make informed, profitable decisions.'],
      points: [
        { title: 'Spot Winning Products', desc: 'Use advanced reporting to identify what’s driving your revenue.' },
        { title: 'Instant Intelligence', desc: 'Get a complete pulse check on your operations at the tap of a button.' },
        { title: 'Forecast with Precision', desc: 'Use past performance data to plan inventory and staffing for the months ahead.' },
      ],
      image: { src: '/images/general/card-terminal-desk.webp', alt: 'Smart POS Data' },
    },
    {
      title: 'Fortify your grocery store with enterprise-grade POS security.',
      text: ['Protect your bottom line with a cloud-based system that ensures every cent is accounted for. From data encryption to granular staff controls, we help you eliminate shrinkage and protect your sensitive information.'],
      points: [
        { title: 'Granular User Permissions', desc: 'Control who can perform refunds, voids, and discounts by setting custom access levels for trusted staff.' },
        { title: 'Secure Staff Authentication', desc: 'Maintain a clear audit trail with individual passcodes or swipe-card logins for every shift.' },
        { title: 'Encrypted Cloud Access', desc: 'Securely monitor your store’s financial health from any device, anywhere in the world.' },
      ],
      image: { src: '/images/general/card-online.webp', alt: 'POS Security' },
    },
    {
      title: 'Turn potential waste into pure profit.',
      text: ['Shrinkage and expired goods are a major drain on grocery margins. Our sophisticated pricing and tracking tools help you minimize losses and maximize your bottom line.'],
      points: [
        { title: 'Instant Visibility', desc: 'Know your exact stock levels in seconds with just a few clicks.' },
        { title: 'Granular Precision', desc: 'Track every single item—down to the smallest unit—with advanced inventory controls.' },
        { title: 'Real-Time Syncing', desc: 'Eliminate human error with stock levels that update automatically with every transaction.' },
      ],
      image: { src: '/images/grocery/flatlay.webp', alt: 'Fresh Produce Waste Reduction' },
    },
  ],
  band: { src: '/images/grocery/aisle.webp', alt: 'Grocery Checkout' },
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

const GroceryStore = () => <IndustryPage data={data} />;

export default GroceryStore;
