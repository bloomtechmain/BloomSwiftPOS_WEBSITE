import React from 'react';
import { Gift, TrendingUp, Target } from 'lucide-react';
import IndustryPage from '../Components/IndustryPage';

// Note: the hero "Get Started" button had no click handler on the original page; it is kept as-is.
const data = {
  breadcrumb: [{ label: 'Home', to: '/' }, { label: 'Integrations' }, { label: 'Loyalty Program' }],
  hero: {
    eyebrow: 'Membership system',
    title: 'Loyalty Program',
    text: 'Build lasting relationships and grow your bottom line with a fully customizable loyalty program that turns transactions into connections.',
    image: { src: '/images/cafe/thanks-cup.webp', alt: 'Loyalty Background' },
    actions: [{ label: 'Get Started' }],
    stat: { label: 'Retention Rate', value: '+45% Increase' },
  },
  quick: {
    items: [
      { icon: Gift, title: 'Reward Your Customers', desc: 'Foster long-term loyalty by awarding redeemable points for every purchase, giving customers a reason to choose you every time.' },
      { icon: TrendingUp, title: 'Maximize Revenue', desc: 'Substantially increase your store’s earnings by driving repeat business through strategic rewards and exclusive special offers.' },
      { icon: Target, title: 'Targeted Advertising', desc: 'Drive higher conversion rates with personalized ads tailored specifically to each customer’s unique purchase history.' },
    ],
  },
  sections: [
    {
      eyebrow: 'RETENTION',
      title: 'Cultivate Customer Loyalty',
      text: ['Turn casual visitors into brand advocates. With our loyalty tools, you can offer meaningful rewards that make repeat shopping a no-brainer, ensuring your most frequent shoppers feel truly valued.'],
      image: { src: '/images/general/waiter-tablet.webp', alt: 'Customer Loyalty' },
    },
    {
      eyebrow: 'CUSTOMIZATION',
      title: 'Complete Creative Control',
      text: ['Tailor every aspect of your loyalty program to match your unique business goals. You define the point values, set the earning rules, and decide exactly when your customers unlock their rewards.'],
      image: { src: '/images/general/team-laughing.webp', alt: 'Creative Control' },
    },
    {
      eyebrow: 'INSIGHTS',
      title: 'Improve customer analytics',
      text: ['Analyze shopper data on your Loyalty dashboard to understand what drives your customers. View how much shoppers spend, how many points they accrue, and how they like to redeem their rewards from a single POS system.'],
      image: { src: '/images/general/data-laptop.webp', alt: 'Customer Analytics' },
    },
    {
      eyebrow: 'SOCIAL PROOF',
      title: 'Scale Your Reputation',
      text: ['Automatically prompt customers for reviews to skyrocket your scores and showcase social proof. Turn feedback into fuel by analyzing customer sentiment to identify areas for improvement and growth.'],
      image: { src: '/images/general/pointing-laptop.webp', alt: 'Social Proof' },
    },
  ],
  band: { src: '/images/cafe/latte-cheers.webp', alt: 'Two regular customers sharing coffee at a cafe' },
};

const Loyalty = () => <IndustryPage data={data} />;

export default Loyalty;
