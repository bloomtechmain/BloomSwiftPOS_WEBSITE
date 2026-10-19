import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout, Clock, Zap, Utensils, ChefHat, TrendingUp, MessageCircle, Smartphone, RefreshCw, Server, WifiOff,
} from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Restaurant POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Restaurant' }],
  hero: {
    title: 'Run a smoother floor with our intuitive restaurant POS.',
    text: 'Elevate your service and simplify your workflow. Our system integrates powerful guest management with effortless table service so you can focus on the food.',
    image: { src: '/images/restaurant/dining-room.webp', alt: 'Restaurant Interior' },
    actions: [{ label: 'Get Started', request: true }, { label: 'Contact Sales', to: '/contact' }],
  },
  quick: {
    items: [
      { icon: Layout, title: 'Full-Spectrum Visibility', desc: 'Design custom floorplans and track every table, order, and tab at a glance.' },
      { icon: ChefHat, title: 'Precision Service', desc: 'Eliminate kitchen chaos with course-firing tools that guarantee "table-perfect" timing for every guest.' },
      { icon: Zap, title: 'Increased Throughput', desc: 'Capture more bookings and turn tables faster with a POS built to keep your service in constant motion.' },
    ],
  },
  sections: [
    {
      eyebrow: 'HIGH-PERFORMANCE KDS',
      title: 'Unify Your Service with a High-Performance KDS.',
      text: ['Bridge the gap between front-of-house and the kitchen with a real-time display system designed for speed and precision.'],
      points: [
        { title: 'Real-Time Synchronization', desc: 'Receive in-house and online orders instantly, ensuring your kitchen starts prep the moment a guest hits "order."' },
        { title: 'Precision Timing', desc: 'Boost turnaround times and eliminate the lag of manual entry with automated order routing.' },
        { title: 'Paperless Accuracy', desc: 'Replace messy paper tickets with a digital "single source of truth" that updates instantly for last-minute changes.' },
        { title: 'Error-Free Operations', desc: 'Reduce costly mistakes with a clear, organized view of every modification and special request.' },
      ],
      image: { src: '/images/general/kitchen-cook.webp', alt: 'Kitchen Display System' },
    },
    {
      eyebrow: 'SMARTER POS',
      title: 'Maximize Throughput with a Smarter Restaurant POS.',
      text: ['Elevate your service standards and strip away the complexity of order management with a platform built for speed.'],
      points: [
        { title: 'Master the Floor', desc: 'Track table occupancy and manage layouts in real time to optimize seating and maximize turnover.' },
        { title: 'Guarantee Accuracy', desc: 'Eliminate manual mistakes with automated ordering that ensures the kitchen gets it right the first time.' },
        { title: 'Sync the Kitchen', desc: 'Unite your back-of-house with a comprehensive KDS that keeps every station in perfect rhythm.' },
        { title: 'Intelligent Prep', desc: 'Group tickets by course or order type to shave minutes off prep time and get food to guests faster.' },
      ],
      image: { src: '/images/cafe/garden.webp', alt: 'Restaurant Service' },
    },
    {
      eyebrow: 'INVENTORY CONTROL',
      title: 'Maximize Profitability with Precision Stock Control.',
      text: ['Stop losing hours to manual spreadsheets. Our intelligent inventory software gives you total control over your margins in just minutes a day.'],
      points: [
        { title: 'Granular Ingredient Tracking', desc: 'Manage your stock at the ingredient level for hyperaccurate food costing and waste reduction.' },
        { title: 'Proactive Reordering', desc: 'Stay ahead of the rush with automated purchase orders and lowstock alerts that ensure you never 86 a best-seller.' },
        { title: 'Bottom-Line Protection', desc: 'Prevent shrinkage and over-portioning with airtight stock oversight that turns data into profit.' },
        { title: 'Multi-Site Oversight', desc: 'Effortlessly sync and monitor inventory levels across every location from a single, centralized dashboard.' },
      ],
      image: { src: '/images/general/warehouse.webp', alt: 'Stock Control' },
    },
    {
      eyebrow: 'INTELLIGENT INSIGHTS',
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
  band: { src: '/images/restaurant/fine-dining.webp', alt: 'Guests sharing dinner at a restaurant table' },
  summary: {
    title: 'Everything you need to run a successful restaurant',
    text: 'From the kitchen to the customer, BloomSwift POS has you covered with powerful features designed for modern restaurants.',
    items: [
      { icon: MessageCircle, title: 'WhatsApp Integration', desc: 'Send automated order updates and receipts directly to customers.' },
      { icon: Smartphone, title: 'Email Notifications', desc: 'Keep customers informed about their booking status and special offers.' },
      { icon: Clock, title: 'Hourly Throughput', desc: 'Identify your peak dinner rushes and weekend surges to optimize your kitchen schedule and front-of-house staffing.' },
      { icon: RefreshCw, title: 'Churn Rates', desc: 'Monitor your loyalty program health by tracking regular customers vs. one-time visitors.' },
      { icon: Utensils, title: 'Ingredient Integration', desc: 'Master your margins by syncing POS sales data with ingredient usage to monitor your exact cost-per-dish.' },
      { icon: WifiOff, title: 'Offline Mode', desc: 'Keep the kitchen-to-table flow moving; your restaurant keeps taking payments even if the internet goes down.' },
      { icon: Server, title: '24/7 Support', desc: 'Get expert help whenever you need it—essential for businesses that stay open late.' },
      { icon: TrendingUp, title: 'Success Metrics', desc: 'Set and hit clear growth targets, such as increasing your monthly loyalty members by 40% within your first 60 days.' },
    ],
  },
};

const Restaurant = () => {
  const navigate = useNavigate();
  const cta = {
    title: 'Ready to get started?',
    text: 'Join thousands of restaurants using BloomSwift to grow their business.',
    actions: [{ label: 'Request Demo', request: true }, { label: 'Contact Sales', onClick: () => navigate('/contact') }],
  };
  return <IndustryPage data={{ ...data, cta }} />;
};

export default Restaurant;
