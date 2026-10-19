import React from 'react';
import {
  MessageCircle, Clock, TrendingUp, Zap, WifiOff, Smartphone, RefreshCw, Server, Utensils,
} from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Pizza Shop POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Pizza Shop' }],
  hero: {
    title: 'Accelerate your service.',
    text: 'Experience a Pizza Shop POS that works as fast as you do. Take full control of your pizzeria with professional inventory tools and employee oversight—all in one lightning-fast interface.',
    image: { src: '/images/pizza/margherita.webp', alt: 'Pizza Shop POS' },
    actions: [{ label: 'Get Started', request: true }],
  },
  quick: {
    items: [
      { icon: Clock, title: 'Save time', desc: 'Save up to 10 hours every month on business management and staff admin.' },
      { icon: TrendingUp, title: 'Efficient business', desc: '81% of customers check menus online. Showcase your pizzas online and be ahead of the curve.' },
      { icon: Zap, title: 'Quick transactions', desc: 'Put a gloss onto your day. Save over 4 hours per month with integrated payment solutions.' },
    ],
  },
  sections: [
    {
      eyebrow: 'INVENTORY CONTROL',
      title: 'Real-time inventory control for fast-moving pizzerias.',
      text: ["Managing complex toppings and dough shouldn't be a headache. Our intelligent POS provides minute-by-minute updates so your kitchen is always in the loop."],
      points: [
        { title: 'Never Miss an Order', desc: 'Automated low-stock alerts for cheese, flour, and toppings keep your kitchen stocked.' },
        { title: 'Effortless Updates', desc: 'Modify menu availability across all platforms in just a few clicks.' },
        { title: 'Precision Tracking', desc: 'Track ingredient usage per pizza for improved cost accuracy.' },
        { title: 'Remote Visibility', desc: 'Monitor your live inventory levels from anywhere, at any time.' },
      ],
      image: { src: '/images/pizza/slices.webp', alt: 'Pizza Inventory' },
    },
    {
      eyebrow: 'SMART ANALYTICS',
      title: 'Smart POS software designed to scale your pizza business.',
      text: ['Take the guesswork out of food service. Our advanced payment solution doesn\'t just process sales—it collects the "smart data" you need to make informed, profitable decisions.'],
      points: [
        { title: 'Spot Winning Pizzas', desc: 'Use advanced reporting to identify your best-selling pies and combos.' },
        { title: 'Instant Intelligence', desc: 'Get a complete pulse check on your delivery and dine-in operations at the tap of a button.' },
        { title: 'Forecast with Precision', desc: 'Use past performance data to plan dough prep and staffing for the weekend rush.' },
      ],
      image: { src: '/images/restaurant/order-counter.webp', alt: 'Smart Pizza Analytics' },
    },
    {
      eyebrow: 'ENTERPRISE SECURITY',
      title: 'Fortify your pizza shop with enterprise-grade security.',
      text: ['Protect your bottom line with a cloud-based system that ensures every cent is accounted for. From data encryption to granular staff controls, we help you eliminate shrinkage and protect your sensitive information.'],
      points: [
        { title: 'Granular User Permissions', desc: 'Control who can perform voids, comps, and discounts by setting custom access levels.' },
        { title: 'Secure Staff Authentication', desc: 'Maintain a clear audit trail with individual passcodes for every shift.' },
        { title: 'Encrypted Cloud Access', desc: "Securely monitor your shop's financial health from any device, anywhere in the world." },
      ],
      image: { src: '/images/pizza/cashier.webp', alt: 'Secure POS' },
    },
    {
      eyebrow: 'WASTE MANAGEMENT',
      title: 'Turn potential waste into pure profit.',
      text: ['Food waste and mistakes are a major drain on pizzeria margins. Our sophisticated tracking tools help you minimize losses and maximize your bottom line.'],
      points: [
        { title: 'Instant Visibility', desc: 'Know your exact ingredient levels in seconds with just a few clicks.' },
        { title: 'Granular Precision', desc: 'Track every single item—from pepperoni slices to flour sacks—with advanced inventory controls.' },
        { title: 'Real-Time Syncing', desc: 'Eliminate human error with stock levels that update automatically with every order.' },
      ],
      image: { src: '/images/pizza/close-up.webp', alt: 'Waste Management' },
    },
  ],
  band: { src: '/images/general/kitchen-cook.webp', alt: 'Cook preparing food in a busy kitchen' },
  summary: {
    title: 'Everything you need to run a successful pizza shop',
    text: 'From the kitchen to the customer, BloomSwift POS has you covered with powerful features designed for modern pizzerias.',
    items: [
      { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Send automated order updates and receipts directly to customers.' },
      { icon: Smartphone, title: 'Email Notifications', desc: 'Keep customers informed about their delivery status and special offers.' },
      { icon: Clock, title: 'Hourly Throughput', desc: 'Identify your peak dinner rushes and weekend surges to optimize your oven schedule and staffing.' },
      { icon: RefreshCw, title: 'Churn Rates', desc: 'Monitor your loyalty program health by tracking regular customers vs. one-time visitors.' },
      { icon: Utensils, title: 'Ingredient Integration', desc: 'Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-pizza.' },
      { icon: WifiOff, title: 'Offline Mode', desc: 'Keep the oven-to-counter flow moving; your shop keeps taking payments even if the internet goes down.' },
      { icon: Server, title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that stay open late.' },
      { icon: TrendingUp, title: 'Success Metrics', desc: 'Set and hit clear growth targets, such as increasing your monthly pizza subscription members by 40%.' },
    ],
  },
  cta: {
    title: 'Ready to get started?',
    text: 'Join thousands of pizzerias using BloomSwift to grow their business.',
    actions: [{ label: 'Request Demo', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
};

const PizzaShop = () => <IndustryPage data={data} />;

export default PizzaShop;
