import React from 'react';
import { Target, BarChart3, Repeat } from 'lucide-react';
import { PageHero, Section, BlockGrid, PhotoBand, Heading } from '../Components/kit';
import { FeatureSection } from '../Components/IndustryPage';

const cards = [
  {
    icon: Target,
    title: 'Targeted Campaigns',
    desc: "Set up automated workflows based on your customers' purchasing behaviors, so you can engage specific customers with relevant content.",
    image: { src: '/images/general/laptop-mono.webp', alt: 'Targeted Campaigns' },
  },
  {
    icon: BarChart3,
    title: 'Detailed Analytics',
    desc: 'Quickly access detailed analytics on opens, clicks, and engagement rates so you can make informed business decisions.',
    image: { src: '/images/restaurant/host.webp', alt: 'Detailed Analytics' },
  },
  {
    icon: Repeat,
    title: 'Automation',
    desc: 'Build automated email campaigns that follow a set schedule to drive repeat business, collect feedback, and reward first‑time buyers.',
    image: { src: '/images/general/team-table.webp', alt: 'Automation' },
  },
];

const sections = [
  {
    title: 'Drag and drop email builder',
    text: ["With Mailchimp's easy-to-use email builder, there is no code required. Choose from dozens of templates to create professional messages for your customers and customize them with images, gifs, and products to help your business stand out."],
    image: { src: '/images/cafe/steam-cup.webp', alt: 'Bakery owner holding bread' },
  },
  {
    title: 'Create customised emails',
    text: ['By importing your Bloom Swift POS customer data, you can greet shoppers by name for more personal interactions. Mailchimp also lets you create custom messages based on demographics, interests, and location so every email feels relevant.'],
    image: { src: '/images/general/meeting-laptop.webp', alt: 'Team collaborating at computers' },
  },
  {
    title: 'Monitor email performance',
    text: ["Mailchimp's powerful analytics tracks key metrics like open and clickthrough rates so you can see how customers interact with your campaigns. For deeper insights, you can run A/B tests to understand which content performs best."],
    image: { src: '/images/general/laptop-mono.webp', alt: 'Team reviewing email analytics dashboard on computers' },
  },
];

const Mailchimp = () => (
  <div className="bg-white">
    <PageHero
      breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Integrations' }, { label: 'Mailchimp' }]}
      title="How Mailchimp helps"
      image={{ src: '/images/email/desk.webp', alt: 'Laptop on a desk ready to build an email campaign' }}
    />
    <Section bg="white">
      <BlockGrid items={cards} cols={3} />
    </Section>
    {sections.map((s, i) => (
      <React.Fragment key={s.title}>
        <FeatureSection s={s} i={i} total={sections.length} />
        {i === 0 && <PhotoBand src="/images/general/team-whiteboard.webp" alt="Team planning a campaign at a whiteboard" />}
      </React.Fragment>
    ))}
    <Section bg="navy">
      <Heading
        center
        dark
        title="Get started with Mailchimp"
        sub="Bloom Swift POS and Mailchimp make it easy to create powerful campaigns that boost customer engagement. Setup only takes a few minutes, so you can start using Mailchimp today."
      />
    </Section>
  </div>
);

export default Mailchimp;
