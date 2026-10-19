import React from 'react';
import { Hotel as HotelIcon, Clock, CreditCard } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

const data = {
  service: 'Hotel POS',
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Solutions' }, { label: 'Hotel' }],
  hero: {
    title: 'The Premier Hospitality Management Suite',
    sub: 'Elevate Your Guest Experience',
    text: 'Transform your hotel operations with a comprehensive POS system designed for modern hospitality. Streamline front desk operations, manage amenities effortlessly, and deliver exceptional guest experiences that drive loyalty and revenue.',
    image: { src: '/images/hotel/lobby.webp', alt: 'Hotel POS System' },
    actions: [{ label: 'Request for POS', request: true }, { label: 'Contact Sales', to: '/support-centre' }],
  },
  quick: {
    title: 'Operational Efficiency at a Glance',
    items: [
      { icon: Clock, title: 'Streamlined Operations', desc: 'Save up to 15 hours every month by automating check-in/check-out, housekeeping coordination, and guest service management.' },
      { icon: HotelIcon, title: 'Enhanced Guest Services', desc: 'Modern guests expect seamless digital experiences. Our system helps you manage bookings, amenities, and special requests in real-time.' },
      { icon: CreditCard, title: 'Integrated Payments', desc: 'Process room charges, minibar purchases, and amenity fees instantly with our unified payment system that saves hours in reconciliation.' },
    ],
  },
  sections: [
    {
      eyebrow: 'PROPERTY MANAGEMENT',
      title: 'Intelligent Property & Amenity Management',
      text: ["Complete control for dynamic hospitality environments. Managing rooms, amenities, and guest services shouldn't be complicated. Our intelligent system provides real-time updates across all departments."],
      points: [
        { title: 'Smart Room Management', desc: 'Track room status, housekeeping progress, and maintenance requests in real-time with automated notifications.' },
        { title: 'Amenity Inventory Control', desc: 'Monitor minibar stock, linens, toiletries, and supplies with automatic reordering alerts.' },
        { title: 'Guest Preference Tracking', desc: 'Store and recall guest preferences for personalized service that builds loyalty and drives repeat bookings.' },
        { title: 'Multi-Property Dashboard', desc: 'Manage multiple locations from a single interface with consolidated reporting and oversight.' },
      ],
      image: { src: '/images/hotel/gym.webp', alt: 'Intelligent Property & Amenity Management' },
    },
    {
      eyebrow: 'HOSPITALITY ANALYTICS',
      title: 'Data-Driven Hospitality Decisions',
      text: ['Intelligent insights designed to maximize occupancy and revenue. Take the guesswork out of hotel management with comprehensive analytics that reveal guest patterns, revenue opportunities, and operational efficiencies.'],
      points: [
        { title: 'Occupancy Intelligence', desc: 'Track room utilization patterns and identify peak seasons to optimize pricing strategies and staffing levels.' },
        { title: 'Revenue Performance', desc: 'Monitor ADR (Average Daily Rate), RevPAR, and ancillary revenue streams in real-time dashboards.' },
        { title: 'Guest Behavior Analytics', desc: 'Understand booking patterns, service preferences, and spending habits to create targeted upsell opportunities.' },
      ],
      image: { src: '/images/hotel/planning.webp', alt: 'Data-Driven Hospitality Decisions' },
    },
    {
      eyebrow: 'SECURITY & COMPLIANCE',
      title: 'Enterprise-Grade Hospitality Security',
      text: ['Protect your property and guest data with confidence. Our PCI-compliant system ensures every transaction is secure, guest information is protected, and your staff has appropriate access controls.'],
      points: [
        { title: 'Role-Based Access Control', desc: 'Set granular permissions for front desk, housekeeping, management, and accounting teams to protect sensitive operations.' },
        { title: 'Guest Data Protection', desc: 'Bank-level encryption safeguards payment information, personal details, and booking history in compliance with privacy regulations.' },
        { title: 'Audit Trail & Reporting', desc: 'Track every transaction, modification, and access point with detailed logs for complete operational transparency.' },
      ],
      image: { src: '/images/hotel/banquet.webp', alt: 'Enterprise-Grade Hospitality Security' },
    },
    {
      eyebrow: 'REVENUE OPTIMIZATION',
      title: 'Maximize Your RevPAR',
      text: ['Turn every guest interaction into revenue opportunity. Our system helps you optimize pricing, reduce no-shows, and increase ancillary revenue through intelligent upselling and cross-selling features.'],
      points: [
        { title: 'Dynamic Pricing Intelligence', desc: 'Adjust room rates based on demand, seasonality, and competitor analysis to maximize revenue per available room.' },
        { title: 'Ancillary Revenue Tracking', desc: 'Monitor spa bookings, restaurant charges, minibar sales, and other services to identify growth opportunities.' },
        { title: 'Automated Upselling', desc: 'Present room upgrades and amenity packages at optimal touchpoints throughout the guest journey.' },
      ],
      image: { src: '/images/hotel/luggage.webp', alt: 'Maximize Your RevPAR' },
    },
    {
      eyebrow: 'ALWAYS OPERATIONAL',
      title: 'Advanced Connectivity & Global Support',
      text: ['Keep your hotel running smoothly with enterprise-grade infrastructure and round-the-clock support designed for the hospitality industry.'],
      points: [
        { title: 'Offline Resilience', desc: 'Continue processing check-ins, checkouts, and guest charges even during internet outages with automatic sync when connection is restored.' },
        { title: '24/7/365 Support', desc: "Access expert hospitality support any time, day or night—because guest experiences can't wait for business hours." },
        { title: 'Global Accessibility', desc: 'Manage your property from anywhere in the world with secure cloud access and real-time synchronization across all devices.' },
      ],
      image: { src: '/images/hotel/router.webp', alt: 'Advanced Connectivity & Global Support' },
    },
  ],
  band: { src: '/images/restaurant/bar-room.webp', alt: 'Hotel Background' },
  cta: {
    title: 'Ready to transform your hotel business?',
    text: 'Join leading hotels using Bloom Swift POS to elevate guest experiences, streamline operations, and maximize revenue.',
    actions: [{ label: 'Contact Bloom Tech Today', request: true }, { label: 'Talk to Sales', to: '/support-centre' }],
  },
};

const Hotel = () => <IndustryPage data={data} />;

export default Hotel;
